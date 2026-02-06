import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useProducts, productsQueryKey } from '@/queries/models/product';
import { useShopCategories } from '@/queries/models/shop-category';
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

import { ProductLevel } from '@api/academy-types';
import { makeOptions } from '@utils/util';

const ProductsPage: NextPageWithLayout = observer(function Home() {
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
        width: 180,
      },
      {
        title: t('Name Ru') || 'Name Ru',
        dataIndex: 'nameRu',
        key: 'nameRu',
        width: 180,
      },
      {
        title: t('Name En') || 'Name En',
        dataIndex: 'nameEn',
        key: 'nameEn',
        width: 180,
      },
      {
        title: t('Price') || 'Price',
        dataIndex: 'price',
        key: 'price',
        width: 100,
        render: (value: number) => `${value} coins`,
      },
      {
        title: t('Level') || 'Level',
        dataIndex: 'level',
        key: 'level',
        width: 100,
      },
      {
        title: t('Stock') || 'Stock',
        dataIndex: 'stock',
        key: 'stock',
        width: 80,
      },
      {
        title: t('Is Available') || 'Is Available',
        dataIndex: 'isAvailable',
        key: 'isAvailable',
        render: (value: boolean) => (
          <span style={{ color: value ? 'green' : 'red' }}>{value ? t('Yes') || 'Yes' : t('No') || 'No'}</span>
        ),
        width: 100,
      },
      {
        title: t('Category') || 'Category',
        dataIndex: ['category', 'nameUz'],
        key: 'category',
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
  const { data, isLoading, isError } = useProducts(
    { ...tableFetchProps, include: { category: true } },
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [productsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Product.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [productsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Products"
        queryKey={[productsQueryKey]}
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

  const { data: categoriesResponse } = useShopCategories(
    {
      where: { isActive: true },
      orderBy: { order: 'asc' },
    },
    { enabled: true },
  );

  const categoryOptions = makeOptions(categoriesResponse?.data?.data || [], 'nameUz');

  const {
    isLoadingOne,
    data,
    post: create,
    update,
    isLoadingPost,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'products',
    model: api.apis.Product,
    form: form,
    getOne: () =>
      api.apis.Product.findOne({
        where: { id: query.id },
        include: { category: true },
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
          image: values.image,
          images: values.images || [],
          price: values.price || 0,
          level: values.level || ProductLevel.Level1,
          minCoinsRequired: values.minCoinsRequired || 0,
          stock: values.stock || 0,
          isAvailable: values.isAvailable !== undefined ? values.isAvailable : true,
          categoryId: values.categoryId,
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
          image: values.image,
          images: values.images || [],
          price: values.price,
          level: values.level,
          minCoinsRequired: values.minCoinsRequired,
          stock: values.stock,
          isAvailable: values.isAvailable,
          categoryId: values.categoryId,
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
      label: t('Image') || 'Image',
      name: 'image',
      type: 'file',
      accept: 'image/*',
      listType: 'picture-card',
    },
    {
      label: t('Price (coins)') || 'Price (coins)',
      name: 'price',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Level') || 'Level',
      name: 'level',
      type: 'select',
      options: [
        { label: 'Level 1 (Bronze)', value: ProductLevel.Level1 },
        { label: 'Level 2 (Silver)', value: ProductLevel.Level2 },
        { label: 'Level 3 (Gold)', value: ProductLevel.Level3 },
      ],
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Min Coins Required') || 'Min Coins Required',
      name: 'minCoinsRequired',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Stock') || 'Stock',
      name: 'stock',
      type: 'number',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Is Available') || 'Is Available',
      name: 'isAvailable',
      type: 'switch',
    },
    {
      label: t('Category') || 'Category',
      name: 'categoryId',
      type: 'select',
      options: categoryOptions,
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${query.add ? t('Product') || 'Product' : ''}`}
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

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Products">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default ProductsPage;
