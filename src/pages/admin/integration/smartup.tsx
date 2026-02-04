import { Button, Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { Box } from '@src/components/box';
import { numericColumn } from '@src/components/table/components';
import Table from '@src/components/table/table';
import { useCrudModal } from '@src/hooks/use-crud-modal';
import { NextPageWithLayout } from '@/types';
import { useShops } from '@src/queries/models/shop';
import { smartupConfigsQueryKey, useSmartupConfig, useSmartupConfigs } from '@src/queries/models/smartup-config';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { AutoForm, FormField } from '@components/form/auto-form';
import { SpinLoading } from '@components/loading';
import { MyDrawer } from '@components/my-drawer';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useLocationParams } from '@hooks/use-location-params';
import { useTableFunctions } from '@hooks/use-table-functions';

import { generateSingleConnectDisconnect, getTotalCount } from '@utils/util';

const Page: NextPageWithLayout = observer(function Page() {
  const api = useApi();
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('Shop') || '',
        dataIndex: 'shop',
        key: 'shop',
        render: (shop: Record<string, any>) => shop.name,
      },
      {
        title: t('Filial Id') || '',
        dataIndex: 'filial_id',
        key: 'filial_id',
      },
      {
        title: t('Project Code') || '',
        dataIndex: 'project_code',
        key: 'project_code',
      },
      {
        title: t('Username') || '',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: t('Password') || '',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: t('Room Code') || '',
        dataIndex: 'room_code',
        key: 'room_code',
      },
      {
        title: t('Robot Code') || '',
        dataIndex: 'robot_code',
        key: 'robot_code',
      },
      {
        title: t('Status') || '',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: t('Sales Manager Code') || '',
        dataIndex: 'sales_manager_code',
        key: 'sales_manager_code',
      },
      {
        title: t('Person Code') || '',
        dataIndex: 'person_code',
        key: 'person_code',
      },
      {
        title: t('Currency Code') || '',
        dataIndex: 'currency_code',
        key: 'currency_code',
      },
      {
        title: t('Owner Person Code') || '',
        dataIndex: 'owner_person_code',
        key: 'owner_person_code',
      },
      {
        title: t('Note') || '',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: t('Price Type Code') || '',
        dataIndex: 'price_type_code',
        key: 'price_type_code',
      },
      {
        title: t('Created At') || '',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('DD.MM.YY'),
      },
    ],
    [t],
  );

  const { data, isLoading, isError } = useSmartupConfigs({
    orderBy: [{ createdAt: 'desc' }],
    include: { shop: true },
  });

  const { addCallback, editCallback, removeCallback } = useTableFunctions(
    api.apis.SmartupConfig,
    smartupConfigsQueryKey,
  );

  return (
    <Box>
      <ItemModal />

      <Table
        name={'smartup'}
        queryKey={[smartupConfigsQueryKey]}
        columns={columns}
        total={getTotalCount(data)}
        loading={isLoading}
        error={isError}
        dataSource={data?.data?.data}
        hidePagination
        titleText={'smartup'}
        editCallback={editCallback}
        addCallback={addCallback}
        removeCallback={removeCallback}
      />
    </Box>
  );
});

const ItemModal = observer(() => {
  const { t } = useTranslation();
  const { query } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const { data: shops, isLoading: isShopsLoading } = useShops({
    include: { smartupConfig: true },
  });
  const { data, isLoading: isSmartUpLoading } = useSmartupConfig({
    where: { id: query.id },
    include: { shop: true },
  });

  const { onCancel, isLoadingPost, isLoadingUpdate, isLoadingOne, post, update } = useCrudModal({
    form,
    name: smartupConfigsQueryKey,
    model: api.apis.SmartupConfig,
  });

  const onFinish = async (values: Record<string, any>) => {
    if (query.edit) {
      update({
        where: { id: query.id },
        data: {
          ...values,
          shop: generateSingleConnectDisconnect(data?.data?.shopId, values.shopId),
          shopId: undefined,
        },
      });
    } else {
      post({
        data: {
          ...values,
          shop: { connect: { id: values.shopId } },
        },
      });
    }
  };

  useEffect(() => {
    if (query.edit && data?.data) form.setFieldsValue({ ...data?.data });
  }, [data]);

  const fields = useMemo(
    () =>
      [
        {
          label: t('Shop') || '',
          name: 'shopId',
          type: 'select',
          options: shops?.data?.data?.map((item: Record<string, any>) => ({
            label: item.name as string,
            value: item.id as string,
          })),
          rules: [{ required: true }],
        },
        {
          label: t('Filial Id') || '',
          name: 'filial_id',
          type: 'number',
          rules: [{ required: true }],
        },
        {
          label: t('Project Code') || '',
          name: 'project_code',
          rules: [{ required: true }],
        },
        { label: t('Username') || '', name: 'username', rules: [{ required: true }] },
        { label: t('Password') || '', name: 'password', rules: [{ required: true }] },
        { label: t('Room Code') || '', name: 'room_code', rules: [{ required: true }] },
        { label: t('Robot Code') || '', name: 'robot_code', rules: [{ required: true }] },
        { label: t('Status') || '', name: 'status', rules: [{ required: true }] },
        {
          label: t('Sales Manager Code') || '',
          name: 'sales_manager_code',
          rules: [{ required: true }],
        },
        {
          label: t('Person Code') || '',
          name: 'person_code',
          rules: [{ required: true }],
        },
        {
          label: t('Currency Code') || '',
          name: 'currency_code',
          rules: [{ required: true }],
        },
        {
          label: t('Owner Person Code') || '',
          name: 'owner_person_code',
          rules: [{ required: true }],
        },
        { label: t('Price Type Code') || '', name: 'price_type_code', rules: [{ required: false }] },
        { label: t('Note') || '', name: 'note', rules: [{ required: false }] },
      ] as FormField[],
    [shops?.data?.data, t],
  );

  return (
    <MyDrawer
      title={`${query.add ? t('add') || '' : t('Edit') || ''} ${t('Smartup')}`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="submit" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={form.submit}>
          {t('Saqlash')}
        </Button>,
      ]}
      width={550}
    >
      {(isLoadingOne || isShopsLoading || isSmartUpLoading) && <SpinLoading />}
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingPost || isLoadingUpdate}
        hideButtons={true}
      />
    </MyDrawer>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  const { t } = useTranslation();

  return (
    <DynamicProviders>
      <AdminLayout title={t('Smartup') || ''}>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
