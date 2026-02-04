import { NextPageWithLayout } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Table, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';

import { useApi } from '@src/api';
import { numericColumn } from '@components/table/components';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useStore } from '@src/stores/stores';
import { PartnersLayout } from '@src/widgets/dashboard-layout/layouts';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { useTranslation } from 'react-i18next';

const Page: NextPageWithLayout = observer(() => {
  const { t } = useTranslation();

  const api = useApi();
  const { user } = useStore().layoutStore;

  const { data, isLoading, isError } = useQuery(['partner-codes'], () => {
    return api.apis.PromoCode.findMany({});
  });

  const userPromoCode = data?.data?.data.filter((code: Record<string, any>) => code.userId == user?.id);

  console.log(userPromoCode);

  const colums = [
    numericColumn(),
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Limit count',
      dataIndex: 'limitCount',
      key: 'limitCount',
    },
    {
      title: 'Limit date',
      dataIndex: 'limitDate',
      key: 'limitDate',
    },
  ];

  return (
    <>
      <Typography className="text-[20px] font-bold">{t('Sizning Promo Codlaringiz')}</Typography>

      <div className="mt-10">
        <Table columns={colums} dataSource={userPromoCode} loading={isLoading} />
      </div>
    </>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <PartnersLayout>{page}</PartnersLayout>
    </DynamicProviders>
  );
};

export default Page;
