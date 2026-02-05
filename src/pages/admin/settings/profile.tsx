import { Box } from '@components/box';
import { NextPageWithLayout } from '@/types';
import { Button, Form, Input, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback } from 'react';
import { useUpdateUser } from '@src/queries/models/user';
import { getUpdateSecondaryOptions } from '@utils/util';
import { useLayoutStore } from '@src/stores/layout-store';
import { toJS } from 'mobx';
import { AdminLayout, SellersLayout } from '@src/widgets/dashboard-layout/layouts';
import { DynamicProviders } from '@hocs/dynamic-providers';

const { Text } = Typography;

const Page: NextPageWithLayout = observer(function Page() {
  const { user } = useLayoutStore();

  const { updateUser, isLoadingUpdateUser } = useUpdateUser({}, getUpdateSecondaryOptions(['user-me']));

  const onFinish = useCallback(
    (values: any) => {
      updateUser({ data: { password: values.password }, where: { phone: values.phone } });
    },
    [updateUser],
  );

  return (
    <>
      <Box>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ maxWidth: 400 }}
        >
          <Text className={'block  font-bold'}>Parolni o'zgartirish</Text>
          <Form.Item label="Telefon" name="phone" className={'mt-3 mb-5'}>
            <Input disabled value={user?.phone} />
          </Form.Item>

          <Form.Item
            label="Yangi parol"
            name="password"
            rules={[{ required: true, message: 'Yangi parolni kiriting!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={'mt-3'} loading={isLoadingUpdateUser}>
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title={'Shaxsiy kabinet'}>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
