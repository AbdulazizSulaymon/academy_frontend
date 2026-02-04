import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { departmentsQueryKey, useDepartments } from '@src/queries/models/department';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';

const Page: NextPageWithLayout = observer(function Home() {
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`name`) || '',
        dataIndex: 'name',
        key: 'name',
        type: 'string',
        width: 140,
      },
      {
        title: t(`Description`) || '',
        dataIndex: 'description',
        key: 'description',
        type: 'string',
        width: 200,
      },
    ],
    [t],
  );

  const { data, isLoading, isError } = useDepartments({});

  const addCallback = useCallback(() => push({ add: true }), []);
  const editCallback = useCallback((data: Record<string, any>) => push({ edit: true, id: data.id }), []);

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    ['delete-department'],
    (data: Record<string, any>) => api.apis.Department.deleteOne({ where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['departments'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );
  return (
    <Box>
      <DepartmentModal />
      <Table
        name={'Departments'}
        queryKey={[departmentsQueryKey]}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        error={isError}
        total={get(data, 'data.totalCount', 0)}
        // total={data?.data.length}
        // add={add}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={remove}
      />
    </Box>
  );
});

const DepartmentModal = observer(() => {
  const { t } = useTranslation();
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const queryClient = useQueryClient();

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: 'departments',
    model: api.apis.Department,
  });

  const onCancel = () => {
    form.resetFields();
    push({});
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      await post({ data: values });
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
      { label: t('name') || '', name: 'name', rules: [{ required: true, message: 'Please input name!' }] },
      { label: t('Description') || '', name: 'description' },
    ],
    [],
  );

  return (
    <MyDrawer
      title={`${query.add ? t('add') || '' : t('Edit') || ''} ${t('Department') || ''}`}
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
