import { Button, Form, Input, QRCode, Space } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@src/components/title';

const { useForm } = Form;

const QrCode = () => {
  const [form] = useForm();
  const { t } = useTranslation();

  const [text, setText] = useState('');

  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const changaValue = (e: { value: string }) => {
    setText(e.value);
  };

  return (
    <Space direction="vertical" className="w-[100%]">
      <Title className="text-center mb-10">{t('QR Kod Generatsiya') || ''}</Title>

      <Form form={form} onFinish={changaValue} className="flex items-center justify-center w-[100%]">
        <Space.Compact>
          <Form.Item name={'value'} rules={[{ required: true, message: 'QR Kodini yaratish' }]}>
            <Input placeholder={`${t('Matn kiriting')}`} maxLength={60} className="sm:w-[350px] lg:w-[680px]" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">{t('QR Kod') || ''}</Button>
          </Form.Item>
        </Space.Compact>
      </Form>

      <div id="myqrcode" className="flex flex-col gap-5 items-center justify-center">
        <div className="bg-white text-black">
          <QRCode
            errorLevel="H"
            color="black"
            size={250}
            iconSize={250 / 4}
            value={text || 'QrCode'}
            icon="http://localhost:3001/logo/light/left.png"
          />
        </div>

        <Button
          disabled={text == '' ? true : false}
          type="primary"
          onClick={() => {
            downloadQRCode();
            setText('');
            form.setFieldValue('value', '');
          }}
        >
          {t('Yuklash') || ''}
        </Button>
      </div>
    </Space>
  );
};

export default QrCode;
