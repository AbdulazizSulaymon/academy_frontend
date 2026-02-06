import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useLessons, lessonsQueryKey } from '@/queries/models/lesson';
import { useModules } from '@/queries/models/module';
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

import { LessonType } from '@api/academy-types';
import { makeOptions } from '@utils/util';

const LessonsPage: NextPageWithLayout = observer(function Home() {
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
        title: t('Type') || 'Type',
        dataIndex: 'lessonType',
        key: 'lessonType',
        width: 120,
      },
      {
        title: t('Duration') || 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        width: 100,
        render: (value: number) => (value ? `${value} min` : '-'),
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
        title: t('Is Free') || 'Is Free',
        dataIndex: 'isFree',
        key: 'isFree',
        render: (value: boolean) => (
          <span style={{ color: value ? 'blue' : 'gray' }}>{value ? t('Yes') || 'Yes' : t('No') || 'No'}</span>
        ),
        width: 100,
      },
      {
        title: t('Module') || 'Module',
        dataIndex: ['module', 'titleUz'],
        key: 'module',
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
  const { data, isLoading, isError } = useLessons(
    { ...tableFetchProps, include: { module: true } },
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [lessonsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Lesson.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [lessonsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Lessons"
        queryKey={[lessonsQueryKey]}
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

  const { data: modulesResponse } = useModules(
    {
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    },
    { enabled: true },
  );

  const moduleOptions = makeOptions(modulesResponse?.data?.data || [], 'titleUz');

  const {
    isLoadingOne,
    data,
    post: create,
    update,
    isLoadingPost,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'lessons',
    model: api.apis.Lesson,
    form: form,
    getOne: () =>
      api.apis.Lesson.findOne({
        where: { id: query.id },
        include: { module: true },
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
          moduleId: values.moduleId,
          order: values.order || 0,
          duration: values.duration || 0,
          isPublished: values.isPublished !== undefined ? values.isPublished : false,
          isFree: values.isFree || false,
          videoUrl: values.videoUrl,
          videoThumbnail: values.videoThumbnail,
          videoDuration: values.videoDuration,
          lessonType: values.lessonType || LessonType.VIDEO,
          content: values.content,
          testId: values.testId,
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
          moduleId: values.moduleId,
          order: values.order,
          duration: values.duration,
          isPublished: values.isPublished,
          isFree: values.isFree,
          videoUrl: values.videoUrl,
          videoThumbnail: values.videoThumbnail,
          videoDuration: values.videoDuration,
          lessonType: values.lessonType,
          content: values.content,
          testId: values.testId,
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
      label: t('Module') || 'Module',
      name: 'moduleId',
      type: 'select',
      options: moduleOptions,
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Order') || 'Order',
      name: 'order',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Duration (minutes)') || 'Duration (minutes)',
      name: 'duration',
      type: 'number',
    },
    {
      label: t('Lesson Type') || 'Lesson Type',
      name: 'lessonType',
      type: 'select',
      options: [
        { label: 'Video', value: LessonType.VIDEO },
        { label: 'Text', value: LessonType.TEXT },
        { label: 'Mixed', value: LessonType.MIXED },
      ],
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Is Published') || 'Is Published',
      name: 'isPublished',
      type: 'switch',
    },
    {
      label: t('Is Free') || 'Is Free',
      name: 'isFree',
      type: 'switch',
    },
    {
      label: t('Video URL') || 'Video URL',
      name: 'videoUrl',
    },
    {
      label: t('Video Thumbnail') || 'Video Thumbnail',
      name: 'videoThumbnail',
    },
    {
      label: t('Video Duration') || 'Video Duration',
      name: 'videoDuration',
      type: 'number',
    },
    {
      label: t('Content (MDX)') || 'Content (MDX)',
      name: 'content',
      type: 'textarea',
    },
    {
      label: t('Test ID') || 'Test ID',
      name: 'testId',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${query.add ? t('Lesson') || 'Lesson' : ''}`}
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

LessonsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Lessons">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default LessonsPage;
