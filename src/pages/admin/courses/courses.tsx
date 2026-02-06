import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useCourses, coursesQueryKey } from '@/queries/models/course';
import { useCourseCategories } from '@/queries/models/course-category';
import { useMentors } from '@/queries/models/mentor';
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

const CoursesPage: NextPageWithLayout = observer(function Home() {
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
        title: t('Price') || 'Price',
        dataIndex: 'price',
        key: 'price',
        width: 100,
        render: (value: number) => `${value.toLocaleString()} UZS`,
      },
      {
        title: t('Duration') || 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        width: 100,
        render: (value: number) => `${value} min`,
      },
      {
        title: t('Level') || 'Level',
        dataIndex: 'level',
        key: 'level',
        width: 100,
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
        title: t('Category') || 'Category',
        dataIndex: ['category', 'nameUz'],
        key: 'category',
        width: 150,
      },
      {
        title: t('Mentor') || 'Mentor',
        dataIndex: ['mentor', 'firstName'],
        key: 'mentor',
        width: 150,
        render: (_: any, record: any) => (record.mentor ? `${record.mentor.firstName} ${record.mentor.lastName}` : '-'),
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
  const { data, isLoading, isError } = useCourses(
    { ...tableFetchProps, include: { category: true, mentor: true } },
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [coursesQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Course.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [coursesQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Courses"
        queryKey={[coursesQueryKey]}
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

  const { data: categoriesResponse } = useCourseCategories(
    {
      where: { isActive: true },
      orderBy: { order: 'asc' },
    },
    { enabled: true },
  );

  const { data: mentorsResponse } = useMentors({}, { enabled: true });

  const categoryOptions = makeOptions(categoriesResponse?.data?.data || [], 'nameUz');
  const mentorOptions = makeOptions(
    mentorsResponse?.data?.data || [],
    (item) => `${item.firstName} ${item.lastName}`,
    'id',
  );

  const {
    isLoadingOne,
    data,
    post: create,
    update,
    isLoadingPost,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'courses',
    model: api.apis.Course,
    form: form,
    getOne: () =>
      api.apis.Course.findOne({
        where: { id: query.id },
        include: { category: true, mentor: true },
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
          coverImage: values.coverImage,
          duration: values.duration || 0,
          level: values.level || 'beginner',
          price: values.price || 0,
          isPublished: values.isPublished !== undefined ? values.isPublished : false,
          categoryId: values.categoryId,
          mentorId: values.mentorId,
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
          coverImage: values.coverImage,
          duration: values.duration,
          level: values.level,
          price: values.price,
          isPublished: values.isPublished,
          categoryId: values.categoryId,
          mentorId: values.mentorId,
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
      label: t('Cover Image') || 'Cover Image',
      name: 'coverImage',
      type: 'file',
      accept: 'image/*',
      listType: 'picture-card',
    },
    {
      label: t('Duration (minutes)') || 'Duration (minutes)',
      name: 'duration',
      type: 'number',
    },
    {
      label: t('Level') || 'Level',
      name: 'level',
      type: 'select',
      options: [
        { label: t('Beginner') || 'Beginner', value: 'beginner' },
        { label: t('Intermediate') || 'Intermediate', value: 'intermediate' },
        { label: t('Advanced') || 'Advanced', value: 'advanced' },
      ],
    },
    {
      label: t('Price (UZS)') || 'Price (UZS)',
      name: 'price',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Is Published') || 'Is Published',
      name: 'isPublished',
      type: 'switch',
    },
    {
      label: t('Category') || 'Category',
      name: 'categoryId',
      type: 'select',
      options: categoryOptions,
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Mentor') || 'Mentor',
      name: 'mentorId',
      type: 'select',
      options: mentorOptions,
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${query.add ? t('Course') || 'Course' : ''}`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
          {t('Save') || 'Save'}
        </Button>,
      ]}
      width={650}
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

CoursesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Courses">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default CoursesPage;
