import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { useDepartments } from '@src/queries/models/department';
import { positionsQueryKey, usePositions } from '@src/queries/models/position';
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

import { makeOptions } from '@utils/util';

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
        title: t(`Name`) || '',
        dataIndex: 'name',
        key: 'name',
        type: 'string',
        width: 140,
      },
      {
        title: t(`Department`) || '',
        dataIndex: ['department', 'name'],
        key: 'department',
        type: 'object',
        width: 130,
        // render: (value: Record<string, any>) => value.name,
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

  const { data, isLoading, isError } = usePositions({ include: { department: true } });

  const addCallback = useCallback(() => push({ add: true }), []);
  const editCallback = useCallback((data: Record<string, any>) => push({ edit: true, id: data.id }), []);

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    ['delete-position'],
    (data: Record<string, any>) => api.apis.Position.deleteOne({ where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['positions'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );

  return (
    <Box>
      <ItemModal />
      <Table
        name={'Positions'}
        queryKey={[positionsQueryKey]}
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

const ItemModal = observer(() => {
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const { t } = useTranslation();

  const { onCancel, onFinish, isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: 'positions',
    model: api.apis.Position,
    form,
  });

  const { data: departments, isLoading, isError } = useDepartments({});

  useEffect(() => {
    if (query.edit && dataById?.data) form.setFieldsValue(dataById?.data);
  }, [dataById?.data]);

  const fields = useMemo(
    () => [
      { label: t('Name') || '', name: 'name', rules: [{ required: true, message: 'Please input name!' }] },
      {
        label: t('Department') || '',
        name: 'departmentId',
        // options: departments?.data?.data?.map((item: Record<string, any>) => ({ label: item.name, value: item.id })),
        options: makeOptions(departments?.data?.data, 'name'),
        // rules: [{ required: true }],
      },
      { label: t('Description') || '', name: 'description' },
    ],
    [departments?.data?.data, t],
  );

  return (
    <MyDrawer
      title={`${query.add ? t('add') || '' : t('Edit') || ''} ${t('position') || ''}`}
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
