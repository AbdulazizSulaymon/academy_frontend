import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input, Modal, Spin } from 'antd';
import { ColumnGroupType, ColumnType } from 'antd/es/table';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { useRoles } from '@src/queries/models/role';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { SpinLoading } from '@components/loading';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table, { AntTableStyled } from '@components/table/table';

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

  const { data, isLoading, isError } = useRoles({});

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`name`) || '',
        dataIndex: 'name',
        key: 'name',
        type: 'string',
        width: 200,
      },
    ],
    [t],
  );

  const addCallback = useCallback(() => push({ add: true }), []);
  const editCallback = useCallback((data: Record<string, any>) => push({ edit: true, id: data.id }), []);

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    ['delete-role'],
    (data: Record<string, any>) => api.apis.Role.deleteOne({ where: data.id }),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['roles'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );

  return (
    <Box>
      <Table
        name={'Roles'}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        error={isError}
        // total={get(data, 'data.totalCount', 0)}
        total={data?.data.data?.length}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={remove}
      />
      <RoleModal />
    </Box>
  );
});

const RoleModal = observer(() => {
  const { t } = useTranslation();
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const queryClient = useQueryClient();
  const [checkeds, setCheckeds] = useState<Record<string, Record<string, any>>>({});
  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: 'roles',
    model: api.apis.Role,
    getOne: () => api.apis.Role.findOne({ where: { id: query.id }, include: { permission: true } }),
  });

  const onCancel = () => {
    form.resetFields();
    queryClient.invalidateQueries({ queryKey: ['roles', query.id] });
    push({});
    setCheckeds({});
  };

  const onFinish = (values: any) => {
    const permissions = Object.values(checkeds)
      .filter((value) => !!value?.id)
      .map((value) => ({ id: value?.id }));

    if (query.add)
      post({
        data: {
          ...values,
          permission: {
            connect: permissions,
          },
        },
      });
    else if (query.edit) {
      update({
        data: {
          ...values,
          permission: {
            connect: permissions.filter(
              (item) => !dataById?.data.permission.find((p: Record<string, any>) => p.id === item.id),
            ),
            disconnect: dataById?.data.permission
              .filter((item: Record<string, any>) => !permissions.find((p) => p.id === item.id))
              .map((item: Record<string, any>) => ({ id: item.id })),
          },
        },
        where: { id: dataById?.data.id },
      });
    }
  };

  useEffect(() => {
    if (query.edit && dataById?.data) {
      form.setFieldsValue(dataById?.data);
      const pers = dataById?.data?.permission.reduce(
        (obj: Record<string, string>, value: Record<string, string>) => ({ ...obj, [value.id]: { id: value.id } }),
        {},
      );
      setCheckeds(pers);
    } else setCheckeds({});
  }, [dataById?.data]);

  const { data, isLoading, isError } = useQuery(['permissions'], () => api.apis.Permission.findMany(), {});

  const columns: (ColumnGroupType<unknown> | ColumnType<unknown>)[] = useMemo(
    () => [
      numericColumn(),
      {
        title: `Name`,
        dataIndex: 'name',
        key: 'name',
        type: 'string',
      },
      {
        title: `check`,
        dataIndex: 'id',
        key: 'id',
        type: 'string',
        align: 'center',
        render: (id: string, row: unknown) => {
          return <Checkbox checked={!!checkeds[id]}></Checkbox>;
        },
      },
    ],
    [checkeds],
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
      {isLoadingOne && <SpinLoading />}
      <Form
        form={form}
        name="basic"
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t('name') || ''}
          name="name"
          rules={[{ required: true, message: 'Please input name!' }]}
          className={'my-4'}
        >
          <Input />
        </Form.Item>

        <AntTableStyled
          dataSource={data?.data?.data}
          columns={columns}
          size={'small'}
          loading={false}
          pagination={false}
          css={css`
            tbody tr {
              cursor: pointer;
            }
          `}
          onRow={(row, rowIndex) => {
            return {
              onClick: (event) => {
                // @ts-ignore
                setCheckeds({ ...checkeds, [row?.id]: !checkeds[row?.id] ? row : undefined });
              },
            };
          }}
        />

        <Form.Item className={'mt-5 mb-0 text-right'}>
          <Button className={'mr-4'} onClick={onCancel}>
            {t('Cancel') || ''}
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoadingPost || isLoadingUpdate}>
            {t('Save') || ''}
          </Button>
        </Form.Item>
      </Form>
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
