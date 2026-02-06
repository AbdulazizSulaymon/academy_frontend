import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useOrders, ordersQueryKey } from '@/queries/models/order';
import { AdminLayout } from '@/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm, FormField } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';

import { OrderStatus } from '@api/academy-types';

const OrdersPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('Order Number') || 'Order Number',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        width: 150,
      },
      {
        title: t('User') || 'User',
        dataIndex: ['user', 'firstName'],
        key: 'user',
        width: 150,
        render: (_: any, record: any) => (record.user ? `${record.user.firstName} ${record.user.lastName}` : '-'),
      },
      {
        title: t('Total Coins') || 'Total Coins',
        dataIndex: 'totalCoins',
        key: 'totalCoins',
        width: 120,
      },
      {
        title: t('Status') || 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (status: OrderStatus) => {
          const statusColors: Record<OrderStatus, string> = {
            [OrderStatus.Pending]: 'orange',
            [OrderStatus.Processing]: 'blue',
            [OrderStatus.Completed]: 'green',
            [OrderStatus.Canceled]: 'red',
          };
          return <span style={{ color: statusColors[status] || 'gray' }}>{status}</span>;
        },
      },
      {
        title: t('Delivery Address') || 'Delivery Address',
        dataIndex: 'deliveryAddress',
        key: 'deliveryAddress',
        width: 200,
        ellipsis: true,
      },
      {
        title: t('Delivery Phone') || 'Delivery Phone',
        dataIndex: 'deliveryPhone',
        key: 'deliveryPhone',
        width: 130,
      },
      {
        title: t('Completed At') || 'Completed At',
        dataIndex: 'completedAt',
        key: 'completedAt',
        render: (date: string) => (date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '-'),
        width: 150,
      },
      {
        title: t('Created At') || 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
        width: 150,
      },
    ],
    [t],
  );

  const tableFetchProps = useTableFetchProps();
  const { data, isLoading, isError } = useOrders(
    { ...tableFetchProps, include: { user: true, items: true } },
    { enabled: !!tableFetchProps.take },
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [ordersQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Order.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [ordersQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Orders"
        queryKey={[ordersQueryKey]}
        dataSource={data?.data?.data || []}
        columns={columns}
        size="small"
        loading={isLoading}
        total={get(data, 'data.totalCount', 0)}
        addCallback={undefined}
        editCallback={undefined}
        removeCallback={remove}
        error={isError}
      />
    </Box>
  );
});

const ItemModal = observer(() => {
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const { t } = useTranslation();

  const {
    isLoadingOne,
    data,
    update,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'orders',
    model: api.apis.Order,
    form: form,
    getOne: () =>
      api.apis.Order.findOne({
        where: { id: query.id },
        include: { user: true, items: { include: { product: true } } },
      }),
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.edit) {
      await update({
        data: {
          status: values.status,
          deliveryAddress: values.deliveryAddress,
          deliveryPhone: values.deliveryPhone,
          deliveryNote: values.deliveryNote,
          completedAt: values.completedAt,
        },
        where: {
          id: data?.id,
        },
      });
    }
  };

  const fields: FormField[] = [
    {
      label: t('Status') || 'Status',
      name: 'status',
      type: 'select',
      options: [
        { label: t('Pending') || 'Pending', value: OrderStatus.Pending },
        { label: t('Processing') || 'Processing', value: OrderStatus.Processing },
        { label: t('Completed') || 'Completed', value: OrderStatus.Completed },
        { label: t('Cancelled') || 'Cancelled', value: OrderStatus.Canceled },
      ],
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Delivery Address') || 'Delivery Address',
      name: 'deliveryAddress',
    },
    {
      label: t('Delivery Phone') || 'Delivery Phone',
      name: 'deliveryPhone',
    },
    {
      label: t('Delivery Note') || 'Delivery Note',
      name: 'deliveryNote',
      type: 'textarea',
    },
    {
      label: t('Completed At') || 'Completed At',
      name: 'completedAt',
      type: 'datepicker',
    },
  ];

  return (
    <MyDrawer
      title={`${t('Edit') || 'Edit'} ${t('Order') || 'Order'}`}
      open={query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingUpdate} onClick={() => form.submit()}>
          {t('Save') || 'Save'}
        </Button>,
      ]}
      width={550}
    >
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingUpdate}
        columnSize={1}
        hideButtons
        loading={isLoadingOne}
      />
    </MyDrawer>
  );
});

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Orders">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default OrdersPage;
