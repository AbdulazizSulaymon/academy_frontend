import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { LogIn, ArrowRight } from 'lucide-react';
import Head from 'next/head';

import { ApiProvider, useApi } from '@src/api';
import { LoginPageLayout } from '@src/widgets/login';
import { useNotification } from '@hooks/use-notification';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { projectName } from '@data/const';

import 'react-phone-input-2/lib/style.css';

const Page = observer(function Page() {
  const router = useRouter();
  const api = useApi();
  const { notifyError } = useNotification();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (values: Record<string, any>) => {
      const { phone, password } = values;
      const res = api.login({
        phone: '+' + phone.trim(),
        password: password.trim(),
      });
      return res;
    },
    onSuccess: () => {
      router.push('/student/');
    },
    onError: () => {
      notifyError(t("Login yoki parol noto'g'ri!"));
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    form.setFieldsValue({ password: value });
  };

  return (
    <>
      <Head>
        <title>Kirish - {projectName}</title>
      </Head>
      <LoginPageLayout>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-700 mb-4 shadow-lg shadow-primary/25">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Qaytganingizdan xursandmiz!</h1>
          <p className="text-gray-500 dark:text-gray-400">Trading yo'lingizni davom ettiring</p>
        </div>

        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={login}
          autoComplete="off"
          className="w-full space-y-1"
          requiredMark={false}
        >
          <Form.Item
            name="phone"
            label={<span className="text-gray-700 dark:text-gray-300 font-medium">Telefon raqam</span>}
            rules={[{ required: true, message: t('Iltimos telefon raqamingizni kiriting!') || '' }]}
          >
            <PhoneInput
              country="uz"
              inputStyle={{
                width: '100%',
                height: '48px',
                fontSize: '16px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                backgroundColor: 'transparent',
              }}
              containerStyle={{ width: '100%' }}
              buttonStyle={{
                borderRadius: '12px 0 0 12px',
                border: '1px solid #e5e7eb',
                borderRight: 'none',
                backgroundColor: 'transparent',
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700 dark:text-gray-300 font-medium">Parol</span>}
            name="password"
            rules={[{ required: true, message: t('Iltimos parolni kiriting!') || '' }]}
          >
            <Input.Password
              className="h-12 rounded-xl border-gray-200 dark:border-dark-200 hover:border-primary focus:border-primary"
              placeholder="Parolni kiriting"
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item className="mb-0 pt-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full h-12 rounded-xl font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t('Kirish')}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Form.Item>
        </Form>

        {/* Features */}
        <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">O'quv materiallarga kirish</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Kirganingizdan so'ng barcha video darslar, strategiyalar va kitoblarga kirish imkoniyati
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Hisobingiz yo'qmi?{' '}
            <Link href="/register" className="text-primary font-semibold hover:text-primary-600 transition-colors">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </LoginPageLayout>
    </>
  );
});

export default function LoginPage() {
  return (
    <DynamicProviders>
      <ApiProvider>
        <Page />
      </ApiProvider>
    </DynamicProviders>
  );
}
