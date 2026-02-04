import { NextPageWithLayout } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';

import { useApi } from '@src/api';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm, FormField } from '@components/form/auto-form';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { useCrudModal } from '@hooks/use-crud-modal';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';

import { getImagePath } from '@utils/util';
import { useNotification } from '@hooks/use-notification';
import { useLocationParams } from '@hooks/use-location-params';
import { notificationsQueryKey } from '@src/queries/models/notifications';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(function Home() {
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: `Image`,
        dataIndex: 'img',
        key: 'img',
        type: 'string',
        render: (src: string, item: any) => (
          <div className={'flex items-center'}>
            <img src={getImagePath(src)} className={'h-10 object-cover rounded shadow'} />
          </div>
        ),
        width: 130,
      },
      {
        title: `Title`,
        dataIndex: 'title',
        key: 'title',
        type: 'string',
        width: 180,
      },
      {
        title: `Content`,
        dataIndex: 'content',
        key: 'content',
        type: 'string',
        width: 220,
      },
      {
        title: `Link`,
        dataIndex: 'link',
        key: 'link',
        type: 'string',
        width: 200,
      },
      // {
      //   title: `Is Offer`,
      //   dataIndex: 'isOffer',
      //   key: 'isOffer',
      //   render: (value: boolean) => <Tag color={value ? 'green' : 'yellow'}>{value ? 'Taklif' : 'Shikoyat'}</Tag>,
      // },
    ],
    [],
  );

  const tableFetchProps = useTableFetchProps();
  const { data, isLoading, isError } = useQuery(
    ['notifications', tableFetchProps],
    () => api.apis.Notifications.findMany({ ...tableFetchProps }),
    { enabled: !!tableFetchProps.take },
  );
  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    (data: Record<string, any>) => api.apis.Notifications.deleteOne({ where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );

  return (
    <Box>
      <ItemModal />
      <Table
        name={'Notifications'}
        queryKey={[notificationsQueryKey]}
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

const ItemModal = observer(() => {
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const queryClient = useQueryClient();

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: 'notifications',
    model: api.apis.Notifications,
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
    () =>
      [
        { label: 'Title', name: 'title', rules: [{ required: true }] },
        { label: 'Content', name: 'content', rules: [{ required: true }] },
        { label: 'Link', name: 'link' },
        { label: 'Image', name: 'img', type: 'file', rules: [{ required: true }] },
      ] as FormField[],
    [],
  );

  return (
    <Modal
      title={`${query.add ? 'Add' : 'Edit'} notification`}
      open={!!query.add || !!query.edit}
      onCancel={onCancel}
      footer={[]}
    >
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingPost || isLoadingUpdate}
        loading={isLoadingOne}
      />
    </Modal>
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
