import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Tag } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useQuestions, questionsQueryKey } from '@/queries/models/question';
import { useTests } from '@/queries/models/test';
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

import { QuestionType } from '@api/academy-types';
import { makeOptions } from '@utils/util';

const QuestionsPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('Content Uz') || 'Content Uz',
        dataIndex: 'contentUz',
        key: 'contentUz',
        width: 250,
        ellipsis: true,
      },
      {
        title: t('Question Type') || 'Question Type',
        dataIndex: 'questionType',
        key: 'questionType',
        width: 180,
        render: (type: QuestionType) => {
          const typeConfig: Record<QuestionType, { label: string; color: string }> = {
            [QuestionType.SINGLE_CHOICE]: { label: 'Single Choice', color: 'blue' },
            [QuestionType.MULTIPLE_CHOICE]: { label: 'Multiple Choice', color: 'green' },
            [QuestionType.TRUE_FALSE]: { label: 'True/False', color: 'orange' },
            [QuestionType.SHORT_ANSWER]: { label: 'Short Answer', color: 'purple' },
            [QuestionType.ESSAY]: { label: 'Essay', color: 'cyan' },
          };
          const config = typeConfig[type] || { label: type, color: 'default' };
          return <Tag color={config.color}>{config.label}</Tag>;
        },
      },
      {
        title: t('Points') || 'Points',
        dataIndex: 'points',
        key: 'points',
        width: 80,
      },
      {
        title: t('Order') || 'Order',
        dataIndex: 'order',
        key: 'order',
        width: 80,
      },
      {
        title: t('Test') || 'Test',
        dataIndex: ['test', 'titleUz'],
        key: 'test',
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
  const { data, isLoading, isError } = useQuestions(
    { ...tableFetchProps, include: { test: true } },
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [questionsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Question.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [questionsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Questions"
        queryKey={[questionsQueryKey]}
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

  const { data: testsResponse } = useTests(
    {
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    },
    { enabled: true },
  );

  const testOptions = makeOptions(testsResponse?.data?.data || [], 'titleUz');

  const {
    isLoadingOne,
    data,
    post: create,
    update,
    isLoadingPost,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'questions',
    model: api.apis.Question,
    form: form,
    getOne: () =>
      api.apis.Question.findOne({
        where: { id: query.id },
        include: { test: true, options: true },
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
          contentUz: values.contentUz,
          contentRu: values.contentRu,
          contentEn: values.contentEn,
          testId: values.testId,
          questionType: values.questionType || QuestionType.SINGLE_CHOICE,
          order: values.order || 0,
          points: values.points || 1,
          image: values.image,
          explanationUz: values.explanationUz,
          explanationRu: values.explanationRu,
          explanationEn: values.explanationEn,
          options: values.options
            ? values.options.map((opt: any, index: number) => ({
                contentUz: opt.contentUz,
                contentRu: opt.contentRu,
                contentEn: opt.contentEn,
                isCorrect: opt.isCorrect || false,
                order: index + 1,
              }))
            : [],
        },
      });
    } else if (query.edit) {
      await update({
        data: {
          contentUz: values.contentUz,
          contentRu: values.contentRu,
          contentEn: values.contentEn,
          testId: values.testId,
          questionType: values.questionType,
          order: values.order,
          points: values.points,
          image: values.image,
          explanationUz: values.explanationUz,
          explanationRu: values.explanationRu,
          explanationEn: values.explanationEn,
        },
        where: {
          id: data?.id,
        },
      });
    }
  };

  const fields: FormField[] = [
    {
      label: t('Test') || 'Test',
      name: 'testId',
      type: 'select',
      options: testOptions,
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Content Uz') || 'Content Uz',
      name: 'contentUz',
      type: 'textarea',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Content Ru') || 'Content Ru',
      name: 'contentRu',
      type: 'textarea',
    },
    {
      label: t('Content En') || 'Content En',
      name: 'contentEn',
      type: 'textarea',
    },
    {
      label: t('Question Type') || 'Question Type',
      name: 'questionType',
      type: 'select',
      options: [
        { label: 'Single Choice', value: QuestionType.SINGLE_CHOICE },
        { label: 'Multiple Choice', value: QuestionType.MULTIPLE_CHOICE },
        { label: 'True/False', value: QuestionType.TRUE_FALSE },
        { label: 'Short Answer', value: QuestionType.SHORT_ANSWER },
        { label: 'Essay', value: QuestionType.ESSAY },
      ],
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Order') || 'Order',
      name: 'order',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Points') || 'Points',
      name: 'points',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Image') || 'Image',
      name: 'image',
      type: 'file',
      accept: 'image/*',
      listType: 'picture-card',
    },
    {
      label: t('Explanation Uz') || 'Explanation Uz',
      name: 'explanationUz',
      type: 'textarea',
    },
    {
      label: t('Explanation Ru') || 'Explanation Ru',
      name: 'explanationRu',
      type: 'textarea',
    },
    {
      label: t('Explanation En') || 'Explanation En',
      name: 'explanationEn',
      type: 'textarea',
    },
    {
      label: t('Options (JSON)') || 'Options (JSON)',
      name: 'options',
      type: 'textarea',
      placeholder:
        'Format: [{"contentUz":"Option 1","contentRu":"Вариант 1","contentEn":"Option 1","isCorrect":true},...]',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${query.add ? t('Question') || 'Question' : ''}`}
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

QuestionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Questions">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default QuestionsPage;
