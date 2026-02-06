import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useUserAssignments, userAssignmentsQueryKey } from '@/queries/models/user-assignment';
import { useAssignments } from '@/queries/models/assignment';
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

import { AssignmentStatus } from '@api/academy-types';
import { makeOptions } from '@utils/util';

const UserAssignmentsPage: NextPageWithLayout = observer(function Home() {
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
        title: t('Assignment') || 'Assignment',
        dataIndex: ['assignment', 'titleUz'],
        key: 'assignment',
        width: 200,
        ellipsis: true,
      },
      {
        title: t('Course') || 'Course',
        dataIndex: ['assignment', 'course', 'titleUz'],
        key: 'course',
        width: 150,
        ellipsis: true,
      },
      {
        title: t('Status') || 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 130,
        render: (status: AssignmentStatus) => {
          const statusColors: Record<AssignmentStatus, string> = {
            [AssignmentStatus.Available]: 'green',
            [AssignmentStatus.NotSubmitted]: 'orange',
            [AssignmentStatus.Submitted]: 'blue',
            [AssignmentStatus.Graded]: 'purple',
          };
          return <span style={{ color: statusColors[status] || 'gray', fontWeight: 500 }}>{status}</span>;
        },
      },
      {
        title: t('Score') || 'Score',
        dataIndex: 'score',
        key: 'score',
        width: 100,
        render: (score: number, record: any) => {
          const maxScore = record.assignment?.maxScore || 100;
          return score !== null && score !== undefined ? `${score}/${maxScore}` : '-';
        },
      },
      {
        title: t('Submitted At') || 'Submitted At',
        dataIndex: 'submittedAt',
        key: 'submittedAt',
        render: (date: string) => (date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '-'),
        width: 150,
      },
      {
        title: t('Graded At') || 'Graded At',
        dataIndex: 'gradedAt',
        key: 'gradedAt',
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
  const { data, isLoading, isError } = useUserAssignments(
    { ...tableFetchProps, include: { user: true, assignment: { include: { course: true } } } },
    { enabled: !!tableFetchProps.take },
  );

  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove } = useMutation({
    mutationKey: [userAssignmentsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.UserAssignment.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [userAssignmentsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="User Assignments"
        queryKey={[userAssignmentsQueryKey]}
        dataSource={data?.data?.data || []}
        columns={columns}
        size="small"
        loading={isLoading}
        total={get(data, 'data.totalCount', 0)}
        addCallback={undefined}
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
    update,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'user-assignments',
    model: api.apis.UserAssignment,
    form: form,
    getOne: () =>
      api.apis.UserAssignment.findOne({
        where: { id: query.id },
        include: { user: true, assignment: { include: { course: true } } },
      }),
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.edit) {
      await update({
        data: {
          status: values.status,
          score: values.score,
          feedback: values.feedback,
          gradedAt: values.status === AssignmentStatus.Graded ? new Date().toISOString() : undefined,
        },
        where: {
          id: data?.id,
        },
      });
    }
  };

  const fields: FormField[] = [
    {
      label: t('Status') || 'Status',
      name: 'status',
      type: 'select',
      options: [
        { label: t('Available') || 'Available', value: AssignmentStatus.Available },
        { label: t('Not Submitted') || 'Not Submitted', value: AssignmentStatus.NotSubmitted },
        { label: t('Submitted') || 'Submitted', value: AssignmentStatus.Submitted },
        { label: t('Graded') || 'Graded', value: AssignmentStatus.Graded },
      ],
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Score') || 'Score',
      name: 'score',
      type: 'number',
    },
    {
      label: t('Feedback') || 'Feedback',
      name: 'feedback',
      type: 'textarea',
    },
  ];

  return (
    <MyDrawer
      title={`${t('Grade') || 'Grade'} ${t('Assignment') || 'Assignment'}`}
      open={query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingUpdate} onClick={() => form.submit()}>
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
        isSaveLoading={isLoadingUpdate}
        columnSize={1}
        hideButtons
        loading={isLoadingOne}
      />
    </MyDrawer>
  );
});

UserAssignmentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="User Assignments">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default UserAssignmentsPage;
