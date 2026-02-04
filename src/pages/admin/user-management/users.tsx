import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Form, Tag } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { usePositions } from '@src/queries/models/position';
import { useRoles } from '@src/queries/models/role';
import { usersQueryKey } from '@src/queries/models/user';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm, FormField } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';

import { datesToDayjs, defaultDateFormat, makeOptions } from '@utils/util';

const Page: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Firstname`) || '',
        dataIndex: 'firstName',
        key: 'firstName',
        width: 120,
      },
      {
        title: t(`Lastname`) || '',
        dataIndex: 'lastName',
        key: 'lastName',
        width: 140,
      },
      {
        title: t(`Username`) || '',
        dataIndex: 'userName',
        key: 'userName',
        width: 120,
      },
      {
        title: t(`Email`) || '',
        dataIndex: 'email',
        key: 'email',
        width: 200,
      },
      {
        title: t(`Phone`) || '',
        dataIndex: 'phone',
        key: 'phone',
        width: 140,
      },
      {
        title: t(`Address`) || '',
        dataIndex: 'address',
        key: 'address',
        width: 100,
      },
      {
        title: t(`Birthdate`) || '',
        dataIndex: 'birthdate',
        key: 'birthdate',
        render: (value: string) => defaultDateFormat(value),
        width: 100,
      },
      {
        title: t(`Gender`) || '',
        dataIndex: 'gender',
        key: 'gender',
        hide: true,
        width: 100,
      },
      {
        title: t(`Role`) || '',
        dataIndex: 'roles',
        key: 'roles',
        render: (value: Record<string, any>[]) => (
          <Flex gap={'small'} wrap={'wrap'}>
            {value?.map((item: Record<string, any>) => (
              <Tag key={item.id} color={'green'}>
                {item.name}
              </Tag>
            ))}
          </Flex>
        ),
        width: 150,
      },
      {
        title: t(`Positions`) || '',
        dataIndex: 'position',
        key: 'position',
        render: (value: Record<string, any>) => value?.name,
        width: 100,
      },

      {
        title: t(`Created At`) || '',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('DD.MM.YY HH:mm'),
        width: 150,
      },
    ],
    [t],
  );

  const tableFetchProps = useTableFetchProps();
  const { data, isLoading, isError } = useQuery(
    ['users', tableFetchProps],
    () => api.apis.User.findMany({ ...tableFetchProps, include: { roles: true, Position: true } }),
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    ['delete-user'],
    (data: Record<string, any>) => api.apis.User.deleteOne({ where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: () => notifySuccess('An error occurred!'),
    },
  );

  return (
    <Box>
      <ItemModal />
      <Table
        name={'Users'}
        queryKey={[usersQueryKey]}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        total={get(data, 'data.totalCount', 0)}
        // add={add}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={remove}
        error={isError}
        // operations={operations}
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
    name: 'users',
    model: api.apis.User,
    getOne: () => api.apis.User.findOne({ where: { id: query.id }, include: { roles: true } }),
  });

  const { data: roles } = useRoles({});
  const { data: positions, isLoading, isError } = usePositions({ include: { department: true } });

  useEffect(() => {
    if (query.edit && dataById?.data)
      form.setFieldsValue({
        ...datesToDayjs(dataById?.data, ['birthdate']),
        roles: dataById?.data?.roles?.map((item: Record<string, any>) => item.id) || [],
      });
  }, [dataById?.data]);

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      await post({
        data: {
          ...values,
          roles: {
            connect: values.roles.map((id: number) => ({ id })),
          },
        },
      });
    } else if (query.edit) {
      await update({
        data: {
          ...values,
          roles: {
            connect: values.roles
              .filter((item: number) => !dataById?.data.roles.find((p: Record<string, any>) => p.id === item))
              .map((id: number) => ({ id })),
            disconnect: dataById?.data.roles
              .filter((item: Record<string, any>) => !values.roles.find((v: number) => v === item.id))
              .map((item: Record<string, any>) => ({ id: item.id })),
          },
        },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  const fields: FormField[] = useMemo(
    () => [
      { label: t('Phone') || '', name: 'phone', rules: [{ required: true }] },
      { label: t('Password') || '', name: 'password', rules: [{ required: true }] },
      { label: t('Username') || '', name: 'userName' },
      { label: t('FirstName') || '', name: 'firstName' },
      { label: t('LastName') || '', name: 'lastName' },
      { label: t('Email') || '', name: 'email' },
      { label: t('Address') || '', name: 'address' },
      { label: t('Birthdate') || '', name: 'birthdate', type: 'datepicker' },
      {
        label: t('Gender') || '',
        name: 'gender',
        options: [
          { label: t('Male') || '', value: 'MALE' },
          { label: t('Female') || '', value: 'FEMALE' },
        ],
      },
      {
        label: t('Role') || '',
        name: 'roles',
        options: makeOptions(roles?.data?.data, 'name'),
        mode: 'multiple',
      },
      {
        label: t('Positions') || '',
        name: 'positionId',
        options: makeOptions(positions?.data?.data, 'name'),
      },
    ],
    [roles, positions, t],
  );

  return (
    <MyDrawer
      title={`${query.add ? t('add') || '' : t('Edit') || ''}`}
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
        columnSize={2}
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
