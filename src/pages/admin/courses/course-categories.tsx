import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useCourseCategories, courseCategoriesQueryKey } from '@/queries/models/course-category';
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

const CourseCategoriesPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('Name Uz') || 'Name Uz',
        dataIndex: 'nameUz',
        key: 'nameUz',
        width: 200,
      },
      {
        title: t('Name Ru') || 'Name Ru',
        dataIndex: 'nameRu',
        key: 'nameRu',
        width: 200,
      },
      {
        title: t('Name En') || 'Name En',
        dataIndex: 'nameEn',
        key: 'nameEn',
        width: 200,
      },
      {
        title: t('Description Uz') || 'Description Uz',
        dataIndex: 'descriptionUz',
        key: 'descriptionUz',
        width: 250,
      },
      {
        title: t('Description Ru') || 'Description Ru',
        dataIndex: 'descriptionRu',
        key: 'descriptionRu',
        width: 250,
      },
      {
        title: t('Description En') || 'Description En',
        dataIndex: 'descriptionEn',
        key: 'descriptionEn',
        width: 250,
      },
      {
        title: t('Order') || 'Order',
        dataIndex: 'order',
        key: 'order',
        width: 100,
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
  const { data, isLoading, isError } = useCourseCategories({ ...tableFetchProps }, { enabled: !!tableFetchProps.take });

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [courseCategoriesQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.CourseCategory.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [courseCategoriesQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Course Categories"
        queryKey={[courseCategoriesQueryKey]}
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
    name: 'course-categories',
    model: api.apis.CourseCategory,
    form: form,
    getOne: () =>
      api.apis.CourseCategory.findOne({
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
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          descriptionUz: values.descriptionUz,
          descriptionRu: values.descriptionRu,
          descriptionEn: values.descriptionEn,
          order: values.order || 0,
          isActive: values.isActive !== undefined ? values.isActive : true,
        },
      });
    } else if (query.edit) {
      await update({
        data: {
          nameUz: values.nameUz,
          nameRu: values.nameRu,
          nameEn: values.nameEn,
          descriptionUz: values.descriptionUz,
          descriptionRu: values.descriptionRu,
          descriptionEn: values.descriptionEn,
          order: values.order,
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
      label: t('Name Uz') || 'Name Uz',
      name: 'nameUz',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Name Ru') || 'Name Ru',
      name: 'nameRu',
    },
    {
      label: t('Name En') || 'Name En',
      name: 'nameEn',
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
      label: t('Order') || 'Order',
      name: 'order',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Is Active') || 'Is Active',
      name: 'isActive',
      type: 'switch',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${
        query.add ? t('Course Category') || 'Course Category' : ''
      }`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
          {t('Save') || 'Save'}
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
        columnSize={1}
        hideButtons
        loading={isLoadingOne}
      />
    </MyDrawer>
  );
});

CourseCategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Course Categories">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default CourseCategoriesPage;
