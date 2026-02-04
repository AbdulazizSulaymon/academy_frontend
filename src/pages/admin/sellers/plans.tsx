import { Button, Form, Modal } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import {
  subscriptionPlansQueryKey,
  useDeleteSubscriptionPlan,
  useSubscriptionPlansWithPagination,
} from '@src/queries/models/subscription-plan';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';

import { getDeleteSecondaryOptions, priceFormatter } from '@utils/util';

const Page: NextPageWithLayout = observer(function Home() {
  const { push, query } = useLocationParams();
  const { t } = useTranslation();

  const searchTerm = query.search as string | undefined;

  const whereClause = useMemo(() => {
    if (!searchTerm) return {};
    return {
      name: { contains: searchTerm, mode: 'insensitive' },
    };
  }, [searchTerm]);

  const { data, isLoading, isError } = useSubscriptionPlansWithPagination({
    where: whereClause,
    include: { _count: { select: { subscriptions: true } } },
  });
  const { deleteSubscriptionPlanFromTable } = useDeleteSubscriptionPlan(
    {},
    getDeleteSecondaryOptions([subscriptionPlansQueryKey]),
  );
  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Nom`) || '',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: t(`Narxi`) || '',
        dataIndex: 'price',
        key: 'price',
        render: (value: number) => priceFormatter(value),
        width: 100,
      },
      {
        title: t(`Oylar soni`) || '',
        dataIndex: 'durationMonths',
        key: 'durationMonths',
        width: 100,
      },
      {
        title: t(`Aktiv obunalar soni`) || '',
        dataIndex: ['_count', 'subscriptions'],
        key: '_count.subscriptions',
        render: (value: number) => priceFormatter(value),
        width: 200,
      },
    ],
    [t],
  );

  return (
    <Box>
      <ItemModal />
      <Table
        name={'AdminSubscriptionPlans'}
        queryKey={[subscriptionPlansQueryKey]}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        error={isError}
        total={get(data, 'data.totalCount', 0)}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={deleteSubscriptionPlanFromTable}
        search={true}
        searchPlaceholder={t("Nomi bo'yicha qidirish") || 'Search by name'}
      />
    </Box>
  );
});

const ItemModal = observer(() => {
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const { t } = useTranslation();

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: subscriptionPlansQueryKey,
    model: api.apis.SubscriptionPlan,
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      await post({ data: { ...values } });
    } else if (query.edit) {
      await update({
        data: { ...values },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  // set data to form
  useEffect(() => {
    if (query.edit && dataById?.data) form.setFieldsValue(dataById?.data);
  }, [dataById?.data]);

  const fields = useMemo(
    () => [
      { label: t('Name') || '', name: 'name', rules: [{ required: true }] },
      { label: t('Price') || '', name: 'price', rules: [{ required: true }], type: 'number' },
      { label: t('Duration Months') || '', name: 'durationMonths', rules: [{ required: true }], type: 'number' },
    ],
    [],
  );

  return (
    <MyDrawer
      title={`${query.add ? t('add') || '' : t('Edit') || ''} ${t('Subscription Plan') || ''}`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
          {t('Saqlash')}
        </Button>,
      ]}
      width={550}
    >
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingPost || isLoadingUpdate}
        hideButtons={true}
        loading={isLoadingOne}
      />
    </MyDrawer>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};
export default Page;
