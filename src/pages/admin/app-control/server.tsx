import { NextPageWithLayout } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Col, Row, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import { Api, useApi } from '@src/api';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { SpinLoading } from '@components/loading';
// import ReactJson from 'react-json-view';
import { useMyTheme } from '@hooks/use-my-theme';
import dynamic from 'next/dynamic';
import { useNotification } from '@hooks/use-notification';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { useTranslation } from 'react-i18next';

const ReactJson = dynamic(() => import('react-json-view'), {
  loading: () => <SpinLoading />,
  ssr: false,
});

const Page: NextPageWithLayout = observer(function Page() {
  const api: Api = useApi();
  const { t } = useTranslation();
  const { isDarkMode } = useMyTheme();
  const { notifySuccess, notifyError } = useNotification();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => api.instance.post('api/app/restart-prisma', {}),
    onSuccess: () => {
      notifySuccess('Restarted');
    },
    onError: () => {
      notifyError('An error occurred!');
    },
  });

  const { mutate: stopPrisma, isPending: isLoadingStop } = useMutation({
    mutationFn: () => api.instance.post('api/app/stop-prisma', {}),
    onSuccess: () => {
      notifySuccess('Restarted');
    },
    onError: () => {
      notifyError('An error occurred!');
    },
  });

  const {
    data,
    isLoading: isLoadingSystemInfo,
    isError: isErrorSystemInfo,
  } = useQuery({
    queryKey: ['system-info'],
    queryFn: () => api.instance.get('api/system-info/all'),
    refetchInterval: 5000,
  });

  return (
    <Box className={'mt-3'}>
      <Row className={'items-center mb-3'} gutter={16}>
        <Col flex={'200px'}>
          <Typography className={'block font-bold'}>{t('Start Prisma Studio') || ''}</Typography>
        </Col>
        <Col flex={'auto'}>
          <Button type="primary" onClick={() => mutate()} loading={isPending} disabled>
            {t('Start') || ''}
          </Button>
        </Col>
      </Row>
      <Row className={'items-center mb-3'} gutter={16}>
        <Col flex={'200px'}>
          <Typography className={'block font-bold'}>{t('Stop Prisma Studio') || ''}</Typography>
        </Col>
        <Col flex={'auto'}>
          <Button type="primary" danger onClick={() => stopPrisma()} loading={isLoadingStop} disabled>
            {t('Stop') || ''}
          </Button>
        </Col>
      </Row>

      <Typography className={'block font-bold my-2'}>Server Info:</Typography>
      <ReactJson src={data?.data} theme={isDarkMode ? 'bright' : 'bright:inverted'} />
    </Box>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title={'Server control'}>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
