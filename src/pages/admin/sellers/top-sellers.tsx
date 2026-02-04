import { Button } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsChatLeftText } from 'react-icons/bs';

import { NextPageWithLayout } from '@/types';
import { clientsQueryKey, useClients } from '@src/queries/models/client';
import { AdminLayout, SellersLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { Link } from '@components/link';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useShopId } from '@hooks/use-shop-id';
import { useLocationParams } from '@hooks/use-location-params';

import { getImagePath, getUserFullName } from '@utils/util';
import Admin from '@src/pages/admin';

const Page: NextPageWithLayout = observer(function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const { shopId } = useShopId();
  const { query } = useLocationParams();

  const searchTerm = query.search as string | undefined;

  const whereClause = useMemo(() => {
    const baseConditions = {
      shopId,
      OrderGroup: {
        some: {
          totalPrice: { gte: 0 },
        },
      },
    };

    if (searchTerm) {
      return {
        AND: [
          baseConditions,
          {
            OR: [
              { firstName: { contains: searchTerm, mode: 'insensitive' } },
              { lastName: { contains: searchTerm, mode: 'insensitive' } },
              { userName: { contains: searchTerm, mode: 'insensitive' } },
            ],
          },
        ],
      };
    }

    return baseConditions;
  }, [shopId, searchTerm]);

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('Rasm') || '',
        dataIndex: ['photo'],
        key: 'photo',
        render: (src: string, item: any) => (
          <div className={'flex items-center justify-center'}>
            <img
              src={getImagePath(
                src,
                'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
              )}
              className={'h-10 object-cover rounded shadow rounded-full'}
            />
          </div>
        ),
        width: 50,
      },
      {
        title: t(`Ism`) || '',
        dataIndex: '',
        key: 'User',
        render: (value: Record<string, any>, record: Record<string, any>) => {
          return (
            <div className={'flex items-center'}>
              <Link href={`/shop/chat/${record?.chatId}`}>
                <Button size={'small'} className={'mr-2 border-0'}>
                  <BsChatLeftText />
                </Button>
              </Link>
              {getUserFullName(record)}
            </div>
          );
        },
        width: 160,
      },
      {
        title: t(`Username`) || '',
        dataIndex: ['userName'],
        key: 'userName',
        // editable: true,
        width: 160,
      },
      {
        title: t(`Telefon`) || '',
        dataIndex: ['phone'],
        key: 'phone',
        // editable: true,
        width: 140,
      },
      {
        title: t(`Buyurtmalar soni`) || '',
        dataIndex: ['_count'],
        key: 'User',
        render: (_count: Record<string, any>) => _count?.OrderGroup,
        width: 130,
      },
      {
        title: t(`Qo'shilgan sana`) || '',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('DD.MM.YY'),
        width: 80,
      },
    ],
    [router, t],
  );

  const { data, isLoading, isError } = useClients({
    where: whereClause,
    orderBy: [
      {
        OrderGroup: {
          _count: 'desc',
        },
      },
    ],
    include: {
      _count: { select: { OrderGroup: true } },
      User: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
          userName: true,
        },
      },
    },
  });

  return (
    <Box>
      <Table
        queryKey={[clientsQueryKey]}
        name={'TopClients'}
        columns={columns}
        add={false}
        editButton={false}
        loading={isLoading}
        error={isError}
        dataSource={data?.data?.data}
        size={'small'}
        total={get(data, 'data.totalCount', 0)}
        hideOperationColumn
        search={true}
        searchPlaceholder={t("Nomi bo'yicha qidirish") || 'Search by name'}
      />
    </Box>
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
