import { Box } from '@components/box';
import { NextPageWithLayout } from '@/types';
import { Api, useApi } from '@src/api';
import { Button, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';
import { AdminLayout, SellersLayout } from '@src/widgets/dashboard-layout/layouts';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from '@hooks/use-notification';
import { DynamicProviders } from '@hocs/dynamic-providers';

const { Text } = Typography;

const Page: NextPageWithLayout = observer(function Page() {
  const api: Api = useApi();
  const { notifySuccess, notifyError } = useNotification();

  const {
    error: restartError,
    isLoading: restartLoading,
    mutate: restart,
  } = useMutation(async () => {
    let res = { error: true };
    try {
      const res = await api.instance.post('api/bot/restart', {});
      notifySuccess('Restart amalga oshdi');
    } catch (e) {
      notifyError('Xatolik yuz berdi');
    }
    return res;
  });

  return (
    <Box className={'mt-3'}>
      <Text className={'block  font-bold'}>Botni restart qilish</Text>
      <Button type="primary" className={' mt-3'} onClick={() => restart}>
        Restart
      </Button>
    </Box>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title={'Bot sozlamalari'}>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
