import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useCourseEnrollments, courseEnrollmentsQueryKey } from '@/queries/models/course-enrollment';
import { useCourses } from '@/queries/models/course';
import { useUsers } from '@/queries/models/user';
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

const CourseEnrollmentsPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('User') || 'User',
        dataIndex: ['user', 'firstName'],
        key: 'user',
        width: 150,
        render: (_: any, record: any) => (record.user ? `${record.user.firstName} ${record.user.lastName}` : '-'),
      },
      {
        title: t('Course') || 'Course',
        dataIndex: ['course', 'titleUz'],
        key: 'course',
        width: 200,
        ellipsis: true,
      },
      {
        title: t('Progress') || 'Progress',
        dataIndex: 'progress',
        key: 'progress',
        width: 100,
        render: (value: number) => `${value}%`,
      },
      {
        title: t('Is Completed') || 'Is Completed',
        dataIndex: 'isCompleted',
        key: 'isCompleted',
        width: 120,
        render: (value: boolean) => (
          <span style={{ color: value ? 'green' : 'orange' }}>
            {value ? t('Completed') || 'Completed' : t('In Progress') || 'In Progress'}
          </span>
        ),
      },
      {
        title: t('Enrolled At') || 'Enrolled At',
        dataIndex: 'enrolledAt',
        key: 'enrolledAt',
        render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
        width: 150,
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
  const { data, isLoading, isError } = useCourseEnrollments(
    { ...tableFetchProps, include: { user: true, course: true } },
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [courseEnrollmentsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.CourseEnrollment.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [courseEnrollmentsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Course Enrollments"
        queryKey={[courseEnrollmentsQueryKey]}
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

  const { data: usersResponse } = useUsers(
    {
      orderBy: { firstName: 'asc' },
    },
    { enabled: true },
  );

  const { data: coursesResponse } = useCourses(
    {
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    },
    { enabled: true },
  );

  const userOptions = makeOptions(
    usersResponse?.data?.data || [],
    (item) => `${item.firstName} ${item.lastName}`,
    'id',
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
    name: 'course-enrollments',
    model: api.apis.CourseEnrollment,
    form: form,
    getOne: () =>
      api.apis.CourseEnrollment.findOne({
        where: { id: query.id },
        include: { user: true, course: true },
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
          userId: values.userId,
          courseId: values.courseId,
          progress: values.progress || 0,
          isCompleted: values.isCompleted || false,
        },
      });
    } else if (query.edit) {
      await update({
        data: {
          progress: values.progress,
          isCompleted: values.isCompleted,
          completedAt: values.isCompleted ? new Date().toISOString() : undefined,
        },
        where: {
          id: data?.id,
        },
      });
    }
  };

  const fields: FormField[] = [
    {
      label: t('User') || 'User',
      name: 'userId',
      type: 'select',
      options: userOptions,
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Course') || 'Course',
      name: 'courseId',
      type: 'select',
      options: courseOptions,
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Progress (%)') || 'Progress (%)',
      name: 'progress',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Is Completed') || 'Is Completed',
      name: 'isCompleted',
      type: 'switch',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${
        query.add ? t('Course Enrollment') || 'Course Enrollment' : ''
      }`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
          {t('Save') || 'Save'}
        </Button>,
      ]}
      width={500}
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

CourseEnrollmentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Course Enrollments">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default CourseEnrollmentsPage;
