import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
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

const testsQueryKey = 'tests';

const TestsPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('Title Uz') || 'Title Uz',
        dataIndex: 'titleUz',
        key: 'titleUz',
        width: 200,
      },
      {
        title: t('Title Ru') || 'Title Ru',
        dataIndex: 'titleRu',
        key: 'titleRu',
        width: 200,
      },
      {
        title: t('Title En') || 'Title En',
        dataIndex: 'titleEn',
        key: 'titleEn',
        width: 200,
      },
      {
        title: t('Duration (min)') || 'Duration (min)',
        dataIndex: 'duration',
        key: 'duration',
        width: 120,
        render: (value: number) => value || '-',
      },
      {
        title: t('Passing Score') || 'Passing Score',
        dataIndex: 'passingScore',
        key: 'passingScore',
        width: 120,
        render: (value: number) => `${value}%`,
      },
      {
        title: t('Max Attempts') || 'Max Attempts',
        dataIndex: 'maxAttempts',
        key: 'maxAttempts',
        width: 120,
      },
      {
        title: t('Is Active') || 'Is Active',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (value: boolean) => (
          <span style={{ color: value ? 'green' : 'red' }}>
            {value ? t('Active') || 'Active' : t('Inactive') || 'Inactive'}
          </span>
        ),
        width: 100,
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

  const { data, isLoading, isError } = useQuery({
    queryKey: [testsQueryKey, tableFetchProps],
    queryFn: () =>
      api.apis.Test.findMany({
        ...tableFetchProps,
      }),
    enabled: !!tableFetchProps.take,
  });

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [testsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Test.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [testsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Tests"
        queryKey={[testsQueryKey]}
        dataSource={data?.data?.data || []}
        columns={columns}
        size="small"
        loading={isLoading}
        total={get(data, 'data.totalCount', 0)}
        addCallback={addCallback}
        editCallback={editCallback}
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
    post: create,
    update,
    isLoadingPost,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'tests',
    model: api.apis.Test,
    form: form,
    getOne: () =>
      api.apis.Test.findOne({
        where: { id: query.id },
      }),
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      await create({
        data: {
          titleUz: values.titleUz,
          titleRu: values.titleRu,
          titleEn: values.titleEn,
          descriptionUz: values.descriptionUz,
          descriptionRu: values.descriptionRu,
          descriptionEn: values.descriptionEn,
          duration: values.duration || 0,
          passingScore: values.passingScore || 70,
          maxAttempts: values.maxAttempts || 3,
          shuffleQuestions: values.shuffleQuestions || false,
          shuffleOptions: values.shuffleOptions || false,
          showCorrectAnswers: values.showCorrectAnswers || false,
          isActive: values.isActive !== undefined ? values.isActive : true,
        },
      });
    } else if (query.edit) {
      await update({
        data: {
          titleUz: values.titleUz,
          titleRu: values.titleRu,
          titleEn: values.titleEn,
          descriptionUz: values.descriptionUz,
          descriptionRu: values.descriptionRu,
          descriptionEn: values.descriptionEn,
          duration: values.duration,
          passingScore: values.passingScore,
          maxAttempts: values.maxAttempts,
          shuffleQuestions: values.shuffleQuestions,
          shuffleOptions: values.shuffleOptions,
          showCorrectAnswers: values.showCorrectAnswers,
          isActive: values.isActive,
        },
        where: {
          id: data?.id,
        },
      });
    }
  };

  const fields: FormField[] = [
    {
      label: t('Title Uz') || 'Title Uz',
      name: 'titleUz',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Title Ru') || 'Title Ru',
      name: 'titleRu',
    },
    {
      label: t('Title En') || 'Title En',
      name: 'titleEn',
    },
    {
      label: t('Description Uz') || 'Description Uz',
      name: 'descriptionUz',
      type: 'textarea',
    },
    {
      label: t('Description Ru') || 'Description Ru',
      name: 'descriptionRu',
      type: 'textarea',
    },
    {
      label: t('Description En') || 'Description En',
      name: 'descriptionEn',
      type: 'textarea',
    },
    {
      label: t('Duration (minutes)') || 'Duration (minutes)',
      name: 'duration',
      type: 'number',
    },
    {
      label: t('Passing Score (%)') || 'Passing Score (%)',
      name: 'passingScore',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Max Attempts') || 'Max Attempts',
      name: 'maxAttempts',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Shuffle Questions') || 'Shuffle Questions',
      name: 'shuffleQuestions',
      type: 'switch',
    },
    {
      label: t('Shuffle Options') || 'Shuffle Options',
      name: 'shuffleOptions',
      type: 'switch',
    },
    {
      label: t('Show Correct Answers') || 'Show Correct Answers',
      name: 'showCorrectAnswers',
      type: 'switch',
    },
    {
      label: t('Is Active') || 'Is Active',
      name: 'isActive',
      type: 'switch',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${query.add ? t('Test') || 'Test' : ''}`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
          {t('Save') || 'Save'}
        </Button>,
      ]}
      width={600}
    >
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingPost || isLoadingUpdate}
        columnSize={1}
        hideButtons
        loading={isLoadingOne}
      />
    </MyDrawer>
  );
});

TestsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Tests">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default TestsPage;
