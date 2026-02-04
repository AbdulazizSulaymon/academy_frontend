import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Tag } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { suggestionsQueryKey } from '@src/queries/models/suggestions';
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
import { useTableFetchProps } from '@hooks/use-table-fetch-props';

const Page: NextPageWithLayout = observer(function Home() {
  const { push } = useLocationParams();
  const api = useApi();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Title`) || '',
        dataIndex: 'title',
        key: 'title',
        type: 'string',
        width: 140,
      },
      {
        title: t(`Content`) || '',
        dataIndex: 'content',
        key: 'content',
        type: 'string',
        width: 200,
      },
      {
        title: t(`Is Offer`) || '',
        dataIndex: 'isOffer',
        key: 'isOffer',
        render: (value: boolean) => <Tag color={value ? 'green' : 'yellow'}>{value ? 'Taklif' : 'Shikoyat'}</Tag>,
        width: 100,
      },
    ],
    [t],
  );

  const tableFetchProps = useTableFetchProps();
  const { data, isLoading, isError } = useQuery(
    ['suggestions', tableFetchProps],
    () => api.apis.Suggestions.findMany({ ...tableFetchProps }),
    { enabled: !!tableFetchProps.take },
  );
  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    (data: Record<string, any>) => api.apis.Suggestions.deleteOne({ where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['suggestions'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );

  return (
    <Box>
      <SuggestionModal />
      <Table
        name={'Suggestions'}
        queryKey={[suggestionsQueryKey]}
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

const SuggestionModal = observer(() => {
  const { t } = useTranslation();
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const queryClient = useQueryClient();

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: 'suggestions',
    model: api.apis.Suggestions,
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      await post({ data: { ...values, userId: 1 } });
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
      { label: t('Title') || '', name: 'title', rules: [{ required: true }] },
      { label: t('Content') || '', name: 'content', rules: [{ required: true }] },
      {
        label: t('Is Offer') || '',
        name: 'isOffer',
        type: 'radio',
        rules: [{ required: true }],
        options: [
          { label: t('Shikoyat') || '', value: false },
          { label: t('Taklif') || '', value: true },
        ],
      },
    ],
    [t],
  );

  return (
    <MyDrawer
      title={`${query.add ? 'Add' : 'Edit'} suggestion`}
      open={!!query.add || !!query.edit}
      onClose={onCancel}
      extra={[
        <Button key="submit" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={form.submit}>
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
