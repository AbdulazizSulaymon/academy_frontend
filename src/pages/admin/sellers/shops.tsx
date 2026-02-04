import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Tag, Tooltip } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEye } from 'react-icons/ai';

import { Api, useApi } from '@src/api';
import { defaultUserSelects } from '@src/data';
import { NextPageWithLayout } from '@/types';
import { shopsQueryKey, useDeleteShop, useShop, useShopsWithPagination, useUpdateShop } from '@src/queries/models/shop';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { SpinLoading } from '@components/loading';
import { PrintObject } from '@components/print-object';
import { Avatar, defaultShopLogo, numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';

import {
  defaultDateFormat,
  getDeleteSecondaryOptions,
  getImagePath,
  getUpdateSecondaryOptions,
  getUserFullName,
} from '@utils/util';

const Page: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push, query } = useLocationParams();
  const api = useApi();
  const { updateShop } = useUpdateShop({}, getUpdateSecondaryOptions([shopsQueryKey]));
  const { notifySuccess, notifyError } = useNotification();

  const currentDate = useMemo(() => new Date(), []);
  const searchTerm = query.search as string | undefined;

  const whereClause = useMemo(() => {
    if (!searchTerm) return {};
    return {
      name: { contains: searchTerm, mode: 'insensitive' },
    };
  }, [searchTerm]);

  const { data, isLoading, isError } = useShopsWithPagination({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      owner: { select: defaultUserSelects },
      Subscription: {
        where: {
          status: 'ACTIVE',
          startDate: { lte: currentDate },
          endDate: { gte: currentDate },
        },
        select: {
          id: true,
          startDate: true,
          endDate: true,
          status: true,
          subscriptionPlan: { select: { id: true, name: true } },
        },
      },
    },
  });
  const { deleteShopFromTable } = useDeleteShop({}, getDeleteSecondaryOptions([shopsQueryKey]));
  const view = useCallback((data: Record<string, any>) => push({ id: data.id }, { update: true }), [push]);
  const queryClient = useQueryClient();
  const { mutate: stopBot, isLoading: isLoadingStopBot } = useMutation(
    (shopId: number) => api.instance.post('/api/subscription/stop-bot', { shopId }),
    {
      onSuccess: (data) => {
        notifySuccess(`Muvaffaqiyatli o'chirildi!`);
        queryClient.invalidateQueries({ queryKey: [shopsQueryKey] });
        queryClient.invalidateQueries({ queryKey: ['is-active-bots'] });
      },
      onError: (error: Error) => {
        notifyError(error);
      },
    },
  );
  const { mutate: startBot, isLoading: isLoadingStartBot } = useMutation(
    (shopId: number) => api.instance.post('/api/subscription/start-bot', { shopId }),
    {
      onSuccess: (data) => {
        notifySuccess(`Muvaffaqiyatli ishga tushirildi!`);
        queryClient.invalidateQueries({ queryKey: [shopsQueryKey] });
        queryClient.invalidateQueries({ queryKey: ['is-active-bots'] });
      },
      onError: (error: Error) => {
        notifyError(error);
      },
    },
  );

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Logo`) || '',
        dataIndex: 'logo',
        key: 'logo',
        render: (value?: string) => <Avatar src={getImagePath(value, defaultShopLogo)} />,
        width: 60,
      },
      {
        title: t(`Nom`) || '',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: t(`Telefon`) || '',
        dataIndex: 'phone',
        key: 'phone',
        render: (value: string[]) => value?.join(', '),
        width: 130,
      },
      {
        title: t(`Manzil`) || '',
        dataIndex: 'address',
        key: 'address',
        width: 120,
      },
      {
        title: t(`Obuna vaqti`) || '',
        dataIndex: ['Subscription'],
        key: 'Subscription',
        width: 100,
        render: (item: Record<string, any>[0]) =>
          item[0] ? (
            <div>
              <Tag>{defaultDateFormat(item[0].startDate)}</Tag>
              <Tag>{defaultDateFormat(item[0].endDate)}</Tag>
            </div>
          ) : (
            ''
          ),
      },
      {
        title: t(`Foydalanuvchi`) || '',
        dataIndex: 'owner',
        key: 'owner',
        render: (value: Record<string, any>) => getUserFullName(value),
        width: 130,
      },
      {
        title: t(`Active By Shop`) || '',
        dataIndex: 'disableByOwner',
        key: 'disableByOwner',
        render: (value: boolean) => <Tag color={value ? 'error' : 'success'}>{!value ? 'Aktiv' : 'Noaktiv'}</Tag>,
        width: 130,
      },
      {
        title: t(`Active By SuperAdmin`) || '',
        dataIndex: 'disableByAdmin',
        key: 'disableByAdmin',
        render: (value: boolean, item: Record<string, any>) => (
          <Tooltip title={value ? t('Yoqish') || '' : t("O'chirish") || ''}>
            <Button
              type={'primary'}
              danger={value}
              onClick={() => updateShop({ where: { id: item.id }, data: { disableByAdmin: !value } })}
            >
              {!value ? 'Active' : 'Disabled'}
            </Button>
          </Tooltip>
        ),
        width: 150,
      },
      {
        title: t(`Status`) || '',
        dataIndex: 'id',
        key: 'id',
        render: (value: number, item: Record<string, any>) => (
          <Tag color={item.disableByAdmin || item.disableByOwner ? 'error' : 'success'}>
            {!(item.disableByAdmin || item.disableByOwner) ? t('Aktiv') || '' : t('Faol emas') || ''}
          </Tag>
        ),
        width: 100,
      },
    ],
    [updateShop, t],
  );

  const { data: isActiveBots } = useQuery(
    ['is-active-bots'],
    () =>
      api.instance.post('/api/subscription/is-active-bots', {
        shopIds: data?.data.data.map((d: Record<string, any>) => d.id),
      }),
    { enabled: !!data?.data?.data },
  );

  return (
    <Box>
      <ViewModal />
      <Table
        name={'AdminShops'}
        queryKey={[shopsQueryKey]}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        error={isError}
        total={get(data, 'data.totalCount', 0)}
        add={false}
        editButton={false}
        removeCallback={deleteShopFromTable}
        search={true}
        searchPlaceholder={t("Nomi bo'yicha qidirish") || 'Search by name'}
        operations={[
          (data) => (
            <Button
              onClick={() => {
                view(data.record);
              }}
              type={'text'}
              size={'small'}
            >
              <AiOutlineEye />
            </Button>
          ),
          (data) => {
            const bot = isActiveBots?.data?.find((d: Record<string, any>) => d.shopId === data.record.id);
            // console.log(bot);
            return !bot?.isActive && bot?.hasToken ? (
              <Tooltip title={t('Ishga tushirish') || ''}>
                <Button
                  onClick={() => {
                    startBot(data.record.id);
                  }}
                  type={'text'}
                  className={'flex items-center justify-center w-[34px] rounded-full'}
                >
                  <img src="/icons/powerOn.png" className={'block dark:opacity-90'} width={30} height={30} alt="" />
                </Button>
              </Tooltip>
            ) : (
              <></>
            );
          },
          (data) => {
            const bot = isActiveBots?.data?.find((d: Record<string, any>) => d.shopId === data.record.id);
            return bot?.isActive ? (
              <Tooltip title={t("O'chirish") || ''}>
                <Button
                  onClick={() => {
                    stopBot(data.record.id);
                  }}
                  type={'text'}
                  className={'flex items-center justify-center w-[34px] rounded-full'}
                >
                  <img src="/icons/powerOff.png" className={'block dark:opacity-90'} width={30} height={30} alt="" />
                </Button>
              </Tooltip>
            ) : (
              <></>
            );
          },
        ]}
      />
    </Box>
  );
});

const ViewModal = observer(() => {
  const { t } = useTranslation();
  const { query, push } = useLocationParams();
  const { data, isLoading } = useShop({ where: { id: query.id } }, { enabled: !!query.id });

  return (
    <Modal
      title={t(`Do'kon ma'lumotlari`) || ''}
      open={query.id}
      onCancel={() => push({ id: undefined }, { update: true })}
      footer={[]}
      width={900}
    >
      {isLoading && <SpinLoading />}
      <PrintObject obj={data?.data} />
      <pre className={'mt-4 border border-solid border-gray-200 dark:border-gray-700 p-3 mb-2 rounded'}>
        {JSON.stringify(data?.data, undefined, 4)}
      </pre>
    </Modal>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
