import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useAssignments, assignmentsQueryKey } from '@/queries/models/assignment';
import { useCourses } from '@/queries/models/course';
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

import { makeOptions } from '@utils/util';

const AssignmentsPage: NextPageWithLayout = observer(function Home() {
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
        title: t('Due Date') || 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
        render: (date: string) => (date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '-'),
        width: 150,
      },
      {
        title: t('Max Score') || 'Max Score',
        dataIndex: 'maxScore',
        key: 'maxScore',
        width: 100,
      },
      {
        title: t('Coin Reward') || 'Coin Reward',
        dataIndex: 'coinReward',
        key: 'coinReward',
        width: 120,
      },
      {
        title: t('Order') || 'Order',
        dataIndex: 'order',
        key: 'order',
        width: 80,
      },
      {
        title: t('Is Published') || 'Is Published',
        dataIndex: 'isPublished',
        key: 'isPublished',
        render: (value: boolean) => (
          <span style={{ color: value ? 'green' : 'red' }}>{value ? t('Yes') || 'Yes' : t('No') || 'No'}</span>
        ),
        width: 120,
      },
      {
        title: t('Course') || 'Course',
        dataIndex: ['course', 'titleUz'],
        key: 'course',
        width: 200,
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
  const { data, isLoading, isError } = useAssignments(
    { ...tableFetchProps, include: { course: true } },
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [assignmentsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Assignment.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [assignmentsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Assignments"
        queryKey={[assignmentsQueryKey]}
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

  const { data: coursesResponse } = useCourses(
    {
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    },
    { enabled: true },
  );

  const courseOptions = makeOptions(coursesResponse?.data?.data || [], 'titleUz');

  const {
    isLoadingOne,
    data,
    post: create,
    update,
    isLoadingPost,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'assignments',
    model: api.apis.Assignment,
    form: form,
    getOne: () =>
      api.apis.Assignment.findOne({
        where: { id: query.id },
        include: { course: true },
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
          courseId: values.courseId,
          dueDate: values.dueDate,
          maxScore: values.maxScore || 100,
          coinReward: values.coinReward || 0,
          order: values.order || 0,
          isPublished: values.isPublished !== undefined ? values.isPublished : false,
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
          courseId: values.courseId,
          dueDate: values.dueDate,
          maxScore: values.maxScore,
          coinReward: values.coinReward,
          order: values.order,
          isPublished: values.isPublished,
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
      label: t('Course') || 'Course',
      name: 'courseId',
      type: 'select',
      options: courseOptions,
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Due Date') || 'Due Date',
      name: 'dueDate',
      type: 'datepicker',
    },
    {
      label: t('Max Score') || 'Max Score',
      name: 'maxScore',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Coin Reward') || 'Coin Reward',
      name: 'coinReward',
      type: 'number',
    },
    {
      label: t('Order') || 'Order',
      name: 'order',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Is Published') || 'Is Published',
      name: 'isPublished',
      type: 'switch',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${
        query.add ? t('Assignment') || 'Assignment' : ''
      }`}
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

AssignmentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Assignments">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default AssignmentsPage;
