import { Button, Form, Tag } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { useSubscriptions } from '@src/queries/models/subscription';
import {
  subscriptionTransactionsQueryKey,
  useDeleteSubscriptionTransaction,
  useSubscriptionTransactionsWithPagination,
} from '@src/queries/models/subscription-transaction';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { Avatar, defaultShopLogo, numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { transactionStatuses } from '@data/enums';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';

import {
  datesToDayjs,
  defaultDateTimeFormat,
  generateSingleConnectDisconnect,
  getDeleteSecondaryOptions,
  getImagePath,
  priceFormatter,
} from '@utils/util';

const Page: NextPageWithLayout = observer(function SubscriptionTransactions() {
  const { push, query } = useLocationParams();
  const { t } = useTranslation();

  const searchTerm = query.search as string | undefined;

  const whereClause = useMemo(() => {
    if (!searchTerm) return {};
    return {
      subscription: {
        shop: {
          name: { contains: searchTerm, mode: 'insensitive' },
        },
      },
    };
  }, [searchTerm]);

  const { data, isLoading, isError } = useSubscriptionTransactionsWithPagination({
    where: whereClause,
    include: { subscription: { include: { shop: true, subscriptionPlan: true } } },
  });
  const { deleteSubscriptionTransactionFromTable } = useDeleteSubscriptionTransaction(
    {},
    getDeleteSecondaryOptions([subscriptionTransactionsQueryKey]),
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
        title: t(`Logo`) || '',
        dataIndex: ['subscription', 'shop', 'logo'],
        key: 'subscription',
        render: (value?: string) => <Avatar src={getImagePath(value, defaultShopLogo)} />,
        width: 60,
      },
      {
        title: t(`Shop name`) || '',
        dataIndex: ['subscription', 'shop', 'name'],
        key: 'subscription',
        // render: (value?: Record<string, any>) => value?.name ?? 'N/A',
        width: 120,
      },
      {
        title: t(`Subscriptions`) || '',
        dataIndex: ['subscription', 'subscriptionPlan', 'name'],
        key: 'subscription',
        // render: (value?: Record<string, any>) => value?.id,
        width: 120,
      },
      {
        title: t(`Months`) || '',
        dataIndex: 'durationMonths',
        key: 'durationMonths',
        width: 80,
      },
      {
        title: t(`Amount`) || '',
        dataIndex: 'amount',
        key: 'amount',
        render: (value: number) => priceFormatter(value),
        width: 120,
      },
      {
        title: t(`Transaction Date`) || '',
        dataIndex: 'transactionDate',
        key: 'transactionDate',
        render: (date: string) => defaultDateTimeFormat(date),
        width: 200,
      },
      {
        title: t(`Payment Method`) || '',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
        width: 180,
      },
      {
        title: t(`Status`) || '',
        dataIndex: 'status',
        key: 'status',
        render: (value: string) => {
          const color = value === 'SUCCESS' ? 'green' : value === 'FAILED' ? 'red' : 'blue';
          return <Tag color={color}>{value}</Tag>;
        },
        width: 120,
      },
      {
        title: t(`Created At`) || '',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => {
          if (!dayjs(value).isValid()) {
            return 'Invalid Date';
          }
          return dayjs(value).format('DD-MM-YYYY HH:mm:ss');
        },
        width: 120,
      },
    ],
    [t],
  );

  return (
    <Box>
      <ItemModal />
      <Table
        name={'AdminSubscriptionTransactions'}
        queryKey={[subscriptionTransactionsQueryKey]}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        error={isError}
        total={get(data, 'data.totalCount', 0)}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={deleteSubscriptionTransactionFromTable}
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

  const { subscriptionsData } = useSubscriptions({
    orderBy: { createdAt: 'desc' },
    include: { subscriptionPlan: { select: { name: true } }, shop: { select: { name: true } } },
  });

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: subscriptionTransactionsQueryKey,
    model: api.apis.SubscriptionTransaction,
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      post({ data: { ...values, subscription: { connect: { id: values.subscription } } } });
    } else if (query.edit) {
      update({
        data: {
          ...values,
          subscription: generateSingleConnectDisconnect(dataById?.data.subscription, values.subscription),
        },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  useEffect(() => {
    if (query.edit && dataById?.data)
      form.setFieldsValue(
        datesToDayjs({ ...dataById?.data, subscription: dataById?.data.subscriptionId }, ['transactionDate']),
      );
  }, [dataById?.data]);

  const fields = useMemo(
    () => [
      {
        label: t('Subscriptions') || '',
        name: 'subscription',
        rules: [{ required: true }],
        options: subscriptionsData?.data?.data?.map((item: Record<string, any>) => ({
          label: `${item.shop.name} - ${item.subscriptionPlan.name}`,
          value: item.id,
        })),
        readOnly: query.edit,
      },
      {
        label: t('Months') || '',
        name: 'durationMonths',
        rules: [{ required: true }],
        type: 'number',
        readOnly: query.edit,
      },
      { label: t('Amount') || '', name: 'amount', rules: [{ required: true }], type: 'number' },
      {
        label: t('Transaction Date') || '',
        name: 'transactionDate',
        rules: [{ required: true }],
        type: 'datepicker',
        defaultValue: dayjs(),
      },
      { label: t('Payment Method') || '', name: 'paymentMethod' },
      {
        label: t('Status'),
        name: 'status',
        options: transactionStatuses,
        rules: [{ required: true }],
        defaultValue: transactionStatuses[0].value,
      },
    ],
    [subscriptionsData?.data, t],
  );

  return (
    <MyDrawer
      title={`${query.add ? t('add') || '' : t('Edit') || ''} ${t('Subscription Transaction')}`}
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
