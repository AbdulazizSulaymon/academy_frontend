import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useMentors, mentorsQueryKey } from '@/queries/models/mentor';
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

const MentorsPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('First Name') || 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: 150,
      },
      {
        title: t('Last Name') || 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        width: 150,
      },
      {
        title: t('Specialization') || 'Specialization',
        dataIndex: 'specialization',
        key: 'specialization',
        width: 200,
      },
      {
        title: t('Experience') || 'Experience',
        dataIndex: 'experience',
        key: 'experience',
        width: 100,
        render: (value: number) => `${value} years`,
      },
      {
        title: t('Rating') || 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        width: 100,
        render: (value: number) => value?.toFixed(1) || '-',
      },
      {
        title: t('Total Students') || 'Total Students',
        dataIndex: 'totalStudents',
        key: 'totalStudents',
        width: 120,
      },
      {
        title: t('Total Courses') || 'Total Courses',
        dataIndex: 'totalCourses',
        key: 'totalCourses',
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
  const { data, isLoading, isError } = useMentors({ ...tableFetchProps }, { enabled: !!tableFetchProps.take });

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [mentorsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Mentor.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [mentorsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Mentors"
        queryKey={[mentorsQueryKey]}
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
    name: 'mentors',
    model: api.apis.Mentor,
    form: form,
    getOne: () =>
      api.apis.Mentor.findOne({
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
          firstName: values.firstName,
          lastName: values.lastName,
          bio: values.bio,
          bioUz: values.bioUz,
          bioRu: values.bioRu,
          bioEn: values.bioEn,
          photo: values.photo,
          specialization: values.specialization,
          experience: values.experience || 0,
          rating: values.rating || 0,
          totalStudents: values.totalStudents || 0,
          totalCourses: values.totalCourses || 0,
          email: values.email,
          phone: values.phone,
          socialLinks: values.socialLinks,
          isActive: values.isActive !== undefined ? values.isActive : true,
        },
      });
    } else if (query.edit) {
      await update({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          bio: values.bio,
          bioUz: values.bioUz,
          bioRu: values.bioRu,
          bioEn: values.bioEn,
          photo: values.photo,
          specialization: values.specialization,
          experience: values.experience,
          rating: values.rating,
          totalStudents: values.totalStudents,
          totalCourses: values.totalCourses,
          email: values.email,
          phone: values.phone,
          socialLinks: values.socialLinks,
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
      label: t('First Name') || 'First Name',
      name: 'firstName',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Last Name') || 'Last Name',
      name: 'lastName',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Bio') || 'Bio',
      name: 'bio',
      type: 'textarea',
    },
    {
      label: t('Bio Uz') || 'Bio Uz',
      name: 'bioUz',
      type: 'textarea',
    },
    {
      label: t('Bio Ru') || 'Bio Ru',
      name: 'bioRu',
      type: 'textarea',
    },
    {
      label: t('Bio En') || 'Bio En',
      name: 'bioEn',
      type: 'textarea',
    },
    {
      label: t('Photo') || 'Photo',
      name: 'photo',
      type: 'file',
      accept: 'image/*',
      listType: 'picture-card',
    },
    {
      label: t('Specialization') || 'Specialization',
      name: 'specialization',
    },
    {
      label: t('Experience (years)') || 'Experience (years)',
      name: 'experience',
      type: 'number',
    },
    {
      label: t('Rating') || 'Rating',
      name: 'rating',
      type: 'number',
    },
    {
      label: t('Total Students') || 'Total Students',
      name: 'totalStudents',
      type: 'number',
    },
    {
      label: t('Total Courses') || 'Total Courses',
      name: 'totalCourses',
      type: 'number',
    },
    {
      label: t('Email') || 'Email',
      name: 'email',
      type: 'email',
    },
    {
      label: t('Phone') || 'Phone',
      name: 'phone',
    },
    {
      label: t('Is Active') || 'Is Active',
      name: 'isActive',
      type: 'switch',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${query.add ? t('Mentor') || 'Mentor' : ''}`}
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

MentorsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Mentors">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default MentorsPage;
