import { Button, Form, Modal, Tag } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { defaultShopSelects } from '@src/data';
import { NextPageWithLayout } from '@/types';
import { useShops } from '@src/queries/models/shop';
import {
  subscriptionsQueryKey,
  useDeleteSubscription,
  useSubscriptionsWithPagination,
} from '@src/queries/models/subscription';
import { useSubscriptionPlans } from '@src/queries/models/subscription-plan';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { subscriptionStatuses } from '@data/enums';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';

import { datesToDayjs, defaultDateFormat, getDeleteSecondaryOptions, priceFormatter } from '@utils/util';

const Page: NextPageWithLayout = observer(function Subscriptions() {
  const { push, query } = useLocationParams();
  const { t } = useTranslation();

  const searchTerm = query.search as string | undefined;

  const whereClause = useMemo(() => {
    if (!searchTerm) return {};
    return {
      OR: [
        { shop: { name: { contains: searchTerm, mode: 'insensitive' } } },
        { subscriptionPlan: { name: { contains: searchTerm, mode: 'insensitive' } } },
      ],
    };
  }, [searchTerm]);

  const { data, isLoading, isError } = useSubscriptionsWithPagination({
    where: whereClause,
    include: {
      subscriptionPlan: { select: { id: true, name: true } },
      shop: { select: { id: true, name: true } },
      _count: { select: { SubscriptionTransaction: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  const { deleteSubscriptionFromTable } = useDeleteSubscription({}, getDeleteSecondaryOptions([subscriptionsQueryKey]));
  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Subscriptions`) || '',
        dataIndex: 'id',
        key: 'id',
        render: (id: number, value: Record<string, any>) => `${value.shop.name} - ${value.subscriptionPlan.name}`,
        width: 200,
      },
      {
        title: t(`Transactions Count`) || '',
        dataIndex: ['_count', 'SubscriptionTransaction'],
        key: '_count',
        render: (value: number) => priceFormatter(value),
        width: 100,
      },
      {
        title: t(`Period`) || '',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (startDate: string, item: Record<string, any>) => (
          <div>
            <Tag>{defaultDateFormat(startDate)}</Tag>
            <Tag>{defaultDateFormat(item.endDate)}</Tag>
          </div>
        ),
        width: 130,
      },
      {
        title: t(`Status`) || '',
        dataIndex: 'status',
        key: 'status',
        render: (value: string) => {
          const color = value === 'ACTIVE' ? 'green' : value === 'PENDING' ? 'yellow' : 'red';
          return <Tag color={color}>{value}</Tag>;
        },
        width: 100,
      },
      {
        title: t(`Created At`) || '',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => dayjs(value).format('DD-MM-YYYY HH:mm:ss'),
        width: 140,
      },
    ],
    [t],
  );

  return (
    <Box>
      <ItemModal />
      <Table
        name={'AdminSubscriptions'}
        queryKey={[subscriptionsQueryKey]}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        error={isError}
        total={get(data, 'data.totalCount', 0)}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={deleteSubscriptionFromTable}
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

  const { shopsData } = useShops({
    orderBy: { createdAt: 'desc' },
    select: defaultShopSelects,
  });

  const { subscriptionPlansData: plansData } = useSubscriptionPlans({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, durationMonths: true },
  });

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: subscriptionsQueryKey,
    model: api.apis.Subscription,
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      const months =
        plansData?.data?.data?.find((plan: Record<string, any>) => plan.id === values.planId)?.durationMonths || 1;

      await post({
        data: {
          ...values,
          startDate: values.startDate.startOf('day').toDate(),
          endDate: values.startDate.add(months, 'month').startOf('day').toDate(),
        },
      });
    } else if (query.edit) {
      await update({
        data: { ...values },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  useEffect(() => {
    if (query.edit && dataById?.data) form.setFieldsValue(datesToDayjs(dataById?.data, ['startDate']));
  }, [dataById?.data]);

  const fields = useMemo(
    () => [
      {
        label: t('Shop') || '',
        name: 'shopId',
        options: shopsData?.data?.data?.map((item: Record<string, any>) => ({
          label: item.name,
          value: item.id,
        })),
      },
      {
        label: t('Subscription Plans') || '',
        name: 'planId',
        options: plansData?.data?.data?.map((item: Record<string, any>) => ({
          label: item.name,
          value: item.id,
        })),
        readOnly: query.edit,
      },
      {
        label: t('Start Date') || '',
        name: 'startDate',
        rules: [{ required: true }],
        type: 'datepicker',
        defaultValue: dayjs(new Date()),
        readOnly: dayjs(new Date()).startOf('day').isAfter(dayjs(dataById?.data?.startDate)),
      },
      {
        label: t('Status') || '',
        name: 'status',
        options: subscriptionStatuses,
        rules: [{ required: true }],
        defaultValue: subscriptionStatuses[0].value,
        readOnly: query.edit,
      },
    ],
    [plansData?.data, shopsData?.data, dataById?.data, t],
  );

  return (
    <MyDrawer
      title={`${query.add ? t('add') || '' : t('Edit') || ''} ${t('Subscription') || ''}`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="submit" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
          {t('Saqlash') || ''}
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
        hideButtons
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
