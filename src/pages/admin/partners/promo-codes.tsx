import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';

import { datesToDayjs, getUserFullName, makeOptions } from '@utils/util';

const Page: NextPageWithLayout = observer(() => {
  const api = useApi();
  const queryClient = useQueryClient();
  const { push } = useLocationParams();
  const { notifySuccess, notifyError } = useNotification();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery(['promo-codes'], () => {
    return api.apis.PromoCode.findMany({});
  });

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    (data: Record<string, any>) => api.apis.PromoCode.deleteOne({ where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Promo Code`) || '',
        dataIndex: '',
        key: 'title',
        render: (item: Record<string, any>) => {
          return <Typography className={'flex items-center'}>{item?.title !== null ? item?.title : ''}</Typography>;
        },
        width: 140,
      },
      {
        title: t(`Limit count`) || '',
        dataIndex: '',
        key: 'isActive',
        width: 140,
        render: (item: Record<string, any>, isActive: boolean) => {
          return <Typography>{item?.limitCount !== null ? item?.limitCount + 'ta' : ''}</Typography>;
        },
      },
      {
        title: t(`Limit data`) || '',
        dataIndex: '',
        key: 'limitDate',
        width: 140,
        render: (item: Record<string, any>, isActive: boolean) => {
          return <Typography>{item?.limitDate !== null ? dayjs(item?.limitDate).format('DD-MM-YYYY') : ''}</Typography>;
        },
      },
    ],
    [t],
  );

  return (
    <>
      <Box>
        <ItemModal />
        <Table
          name={'PromoCodes'}
          dataSource={data?.data?.data}
          columns={columns}
          size={'small'}
          loading={isLoading}
          error={isError}
          total={get(data, 'data.totalCount', 0)}
          addCallback={addCallback}
          editCallback={editCallback}
          removeCallback={remove}
        />
      </Box>
    </>
  );
});

const ItemModal = () => {
  const [form] = Form.useForm();
  const { query, push } = useLocationParams();
  const api = useApi();
  const { t } = useTranslation();

  const isDate = Form.useWatch('isDate', form);

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: 'promo-codes',
    model: api.apis.PromoCode,
  });

  const { data: partners } = useQuery(['partner'], () => {
    return api.apis.Partner.findMany({ include: { user: true } });
  });

  const onFinish = async (values: Record<string, any>) => {
    console.log(values);

    if (isDate) {
      values.limitCount = null;
      values.isDate = undefined;
    } else {
      values.limitDate = null;
      values.isDate = undefined;
    }

    if (query.add) {
      values.isDate = undefined;
      await post({ data: { ...values } });
    } else if (query.edit) {
      await update({
        data: { ...values },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  const fields = useMemo(
    () => [
      {
        label: t('Partners') || '',
        name: 'partnerId',
        options: makeOptions(partners?.data?.data, (partner: Record<string, any>) => getUserFullName(partner?.user)),
      },
      { label: t('Promo Code') || '', name: 'title', disabled: query?.edit },
      { label: t('Limit date is active') || '', type: 'checkbox', name: 'isDate' },
      !isDate
        ? { label: t('Limit count') || '', name: 'limitCount', type: 'number', rules: [{ required: true }] }
        : {
            label: t('Limit date') || '',
            name: 'limitDate',
            type: 'datepicker',
            rules: [{ required: true }],
          },
    ],
    [isDate, partners?.data?.data, t],
  );

  useEffect(() => {
    if (dataById?.data) form.setFieldsValue(datesToDayjs(dataById?.data, ['limitDate']));
    form.setFieldValue('isDate', !!dataById?.data?.limitDate);
  }, [dataById?.data]);

  return (
    <>
      <MyDrawer
        title={`${query.add ? 'Add' : 'Edit'} Promo Code`}
        open={query.add || query.edit}
        onClose={onCancel}
        extra={[
          <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
            {t('Saqlash')}
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
          hideButtons={true}
          loading={isLoadingOne}
        />
      </MyDrawer>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
