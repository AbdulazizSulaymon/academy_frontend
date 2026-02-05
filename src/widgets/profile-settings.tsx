import { css } from '@emotion/react';
import { useResponsive } from 'ahooks';
import { Button, Col, Divider, Form, Input, Row, Select, Space, Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiTwotoneDelete } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useUpdateUser } from '@src/queries/models/user';
import { useStore } from '@src/stores/stores';

import { UploadInput } from '@components/form/auto-form';
import { Title } from '@components/title';

import { countriesOptions } from '@data/countries';

import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';

const { TextArea } = Input;

interface DeviceFormValues {
  newDevice?: string;
  removeDevice?: string;
}

interface DataType {
  key: string;
  deviceName: string;
  activationDate: string;
}

const initialDeviceData: DataType[] = [
  {
    key: '1',
    deviceName: "Noma'lum qurilma",
    activationDate: '01:53:29, 04.11.2023',
  },
  {
    key: '2',
    deviceName: 'Mac OS 10.15.7, Edge 118',
    activationDate: '01:53:29, 04.11.2023',
  },
];

export const ProfileSettings = observer(function Page() {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { user } = useStore().layoutStore;
  const [data, setData] = useState(initialDeviceData);
  const responsive = useResponsive();
  const { query, push } = useLocationParams();
  const { notifySuccess, notifyError } = useNotification();
  const { t } = useTranslation();

  const { updateUser, isLoadingUpdateUser, isError } = useUpdateUser(
    {},
    { invalidateQueries: ['user-me'], successToast: 'Muvaffaqiyatli saqlandi', errorToast: "Xatolik sodir bo'ldi" },
  );

  const onFinish = useCallback(
    (values: any) => {
      updateUser({ data: values, where: { id: user?.id } });
    },
    [updateUser, user?.id],
  );

  const onFinishPasswordForm = (values: Record<string, any>) => {
    onFinish({ password: values.newPassword });
  };

  const handleDeleteDevice = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  const deviceTableColumns = [
    {
      title: t('Qurilma nomi') || '',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: t('Faollashtirilgan sana') || '',
      dataIndex: 'activationDate',
      key: 'activationDate',
    },
    {
      title: t('Faoliyatlar') || '',
      key: 'actions',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button
            className="text-red-500 border-red-500 gap-1 hover:bg-red-500 hover:text-white"
            onClick={() => handleDeleteDevice(record.key)}
          >
            <AiTwotoneDelete /> {t('Delete') || ''}
          </Button>
        </Space>
      ),
    },
    [t],
  ];

  const onFinishAddDevice = async (values: DeviceFormValues) => {
    try {
      // Perform logic to add a new device
      // Make an API request to add the device
      // ...

      // For demonstration purposes, assume a successful device addition
      message.success('Device added successfully');
      form.resetFields();
    } catch (error) {
      // Handle error, e.g., display error message
      message.error('Failed to add the device. Please try again.');
    }
  };
  const onFinishRemoveDevice = async (values: DeviceFormValues) => {
    try {
      // Perform logic to remove a device
      // Make an API request to remove the device
      // ...

      // For demonstration purposes, assume a successful device removal
      message.success('Device removed successfully');
      form.resetFields();
    } catch (error) {
      // Handle error, e.g., display error message
      message.error('Failed to remove the device. Please try again.');
    }
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user]);

  const onChange = useCallback((key: string) => {
    push({ tab: key });
  }, []);

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: (
        <div className={`flex gap-2 items-center`}>
          <CgProfile />
          {t('Profil') || ''}
        </div>
      ),
      children: (
        <div className={`px-0 px-lg-4 md:px-0 pb-4`}>
          <div className={'flex justify-center mt-2'}>
            <Title>{t("Shaxsiy ma'lumotlar") || ''}</Title>
          </div>
          <div className={'flex justify-center'}>
            <div>
              <Form
                form={form}
                layout="vertical"
                style={{ maxWidth: 800 }}
                className={'mt-8'}
                onFinish={onFinish}
                autoComplete="off"
              >
                <div className={'flex justify-center text-center'}>
                  <Form.Item className={'font-bold'} label={''} name={'photo'}>
                    {/*{form.getFieldValue('photo') ? (*/}
                    <UploadInput form={form} field={{ name: 'photo', accept: 'image/*' }} view={false} />
                    {/*) : (*/}
                    {/*  <Avatar size={74} icon={<UserOutlined />} />*/}
                    {/*)}*/}
                  </Form.Item>
                </div>

                <Row gutter={22}>
                  <Col span={24}>
                    <Title className={`w-full text-center mb-8`}>{user?.email}</Title>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Ism') || ''} name="firstName">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Familiya') || ''} name="lastName">
                      <Input allowClear />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item className={'font-bold'} label={t("O'zingiz haqingizda") || ''} name={'about'}>
                      <TextArea allowClear autoSize />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Telefon raqam') || ''} name="phone">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Mamlakat') || ''} name="country">
                      <Select
                        style={{ width: '100%' }}
                        options={countriesOptions}
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          ((option?.label || '') as string).toLowerCase().includes(input.toLowerCase())
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Divider />
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Instagram manzil') || ''} name="instagram">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Github manzil') || ''} name="github">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('YouTube manzil') || ''} name="youtube">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Facebook manzil') || ''} name="facebook">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={'font-bold'} label={t('Telegram manzil') || ''} name="telegram">
                      <Input allowClear />
                    </Form.Item>
                  </Col>
                </Row>

                <div className={'flex justify-end'}>
                  <Button className={'w-[130px]'} type={'primary'} htmlType="submit" loading={isLoadingUpdateUser}>
                    {t('Saqlash') || ''}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'password',
      label: (
        <div className={`flex items-center gap-2`}>
          <RiLockPasswordLine />
          {t("Parolni o'zgartirish") || ''}
        </div>
      ),
      children: (
        <Form
          form={passwordForm}
          onFinish={onFinishPasswordForm}
          layout="vertical"
          style={{ maxWidth: 800, marginInline: 'auto' }}
        >
          {/*<Form.Item*/}
          {/*  label="Hozirgi parol"*/}
          {/*  name="currentPassword"*/}
          {/*  rules={[{ required: true, message: 'Iltimos hozirgi parolni kiriting' }]}*/}
          {/*>*/}
          {/*  <Input.Password />*/}
          {/*</Form.Item>*/}

          <Form.Item
            label={t('Yangi parol') || ''}
            name="newPassword"
            rules={[
              { required: true, message: t('Iltimos yangi parolni kiriting') || '' },
              { min: 6, message: t("Parol kamida 6 ta belgidan iborat bo'lishi kerak") || '' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={t('Yangi parolni tasdiqlang') || ''}
            name="confirmNewPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Iltimos yangi parolni tasdiqlang' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(t(`Parollar mos emas`) || '');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('Saqlash') || ''}
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    // {
    //   key: 'devices',
    //   label: (
    //     <div className={`flex items-center gap-2`}>
    //       <PiDevicesLight />
    //       Faol qurilmalar
    //     </div>
    //   ),
    //   children: (
    //     <div className={''}>
    //       <Title>Faol qurilmalar</Title>
    //       <Typography.Text className={'block mb-4 w-full md:w-1/2'}>
    //         Siz bir vaqtning o'zida faqat 2ta qurilma orqali ta'lim olishingiz mumkin.Ilovalarni uchinchi qurilmada
    //         faollashtirish uchun, avval mavjud ikkita qurilmalardanbirini o'chirishingiz kerak.
    //       </Typography.Text>
    //       <Tag
    //         bordered={false}
    //         color="volcano"
    //         className={`w-full whitespace-normal text-xs rounded-xl md:text-xl flex items-center justify-start p-5 gap-2`}
    //       >
    //         <PiWarningCircleFill />
    //         Faqat <strong>2ta</strong> qurilma orqali foydalanishingiz mumkin
    //       </Tag>
    //       <Table className={`mt-5`} dataSource={data} columns={deviceTableColumns} />
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="profile"
        activeKey={query.tab}
        tabPosition={!responsive.lg ? 'top' : 'left'}
        className={'px-2 md:px-4 w-full h-full'}
        items={items}
        onChange={onChange}
        css={css`
          .ant-tabs-content-holder {
            overflow-y: auto;
            overflow-x: hidden;
          }
        `}
      />
    </>
  );
});
