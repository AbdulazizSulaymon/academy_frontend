import { Button, Form, Input, Popover, Typography } from 'antd';
import { observer } from 'mobx-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import PhoneInput from 'react-phone-input-2';
import { UserPlus, ArrowRight, Sparkles } from 'lucide-react';
import Head from 'next/head';

import { ApiProvider, useApi } from '@src/api';
import { LoginPageLayout } from '@src/widgets/login';
import { useNotification } from '@hooks/use-notification';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { projectName } from '@data/const';

import 'react-phone-input-2/lib/style.css';

const generateRandomPassword = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

const Page = observer(function Page() {
  const router = useRouter();
  const api = useApi();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const { getErrorText, notifyError, notifySuccess } = useNotification();

  const { mutate: createUser, isLoading: isLoadingCreating } = useMutation(
    async (values: Record<string, any>) => {
      await api.instance.post('/api/user/create', {
        ref: localStorage.getItem('ref'),
        data: {
          ...values,
          phone: '+' + values.phone,
        },
      });
      setSuccess(true);
      notifySuccess(t("Muvaffaqiyatli ro'yxatdan o'tdingiz!"));

      const { phone, password } = values;
      const resLogin = api.login({
        phone: '+' + phone.trim(),
        password: password.trim(),
      });
      return resLogin;
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          router.push('/shop/dashboard');
        }, 0);
      },
      onError: (err) => {
        const message = getErrorText(err);
        if (message === 'Unique constraint failed on the fields: (`phone`)')
          notifyError("Bu telefon raqami bilan ro'yxatdan o'tilgan!");
        else notifyError("Xatolik sodir bo'ldi!");
      },
    },
  );

  const suggestions = useMemo(
    () => [generateRandomPassword(12), generateRandomPassword(12), generateRandomPassword(12)],
    [],
  );

  const hideSuggestions = () => {
    setSuggestionsVisible(false);
  };

  const handleOpenChangeSuggestions = (newOpen: boolean) => {
    setSuggestionsVisible(newOpen);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    form.setFieldsValue({ password: value });
  };

  const passwordPopoverContent = (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 mb-2">Kuchli parol tanlang:</p>
      {suggestions.map((suggestion) => (
        <div
          key={suggestion}
          onClick={() => {
            form.setFieldsValue({ password: suggestion });
            hideSuggestions();
          }}
          className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-dark-200 hover:bg-primary/10 cursor-pointer transition-colors text-sm font-mono"
        >
          ********{suggestion.slice(8)}
        </div>
      ))}
    </div>
  );

  const onFinish = async (values: any) => {
    try {
      createUser(values);
    } catch (e) {
      console.log(e);
      if (getErrorText(e)?.includes('Unique constraint failed on the fields: (`phone`)'))
        notifyError("Allaqachon bu telefon raqami orqali ro'yxatdan o'tilgan!");
      else notifyError("Xatolik sodir bo'ldi");
    }
  };

  return (
    <>
      <Head>
        <title>Ro'yxatdan o'tish - {projectName}</title>
      </Head>
      <LoginPageLayout>
        {success && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <ReactConfetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-700 mb-4 shadow-lg shadow-primary/25">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Hisob yarating
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Professional treyder bo'lish yo'lingizni boshlang
          </p>
        </div>

        <Form
          name="register"
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="w-full space-y-1"
          requiredMark={false}
        >
          <Form.Item
            name="phone"
            label={<span className="text-gray-700 dark:text-gray-300 font-medium">Telefon raqam</span>}
            rules={[{ required: true, message: 'Telefon raqamni kiriting' }]}
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

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-gray-700 dark:text-gray-300 font-medium">{t('Ism')}</span>}
              name="firstName"
              rules={[{ required: true, message: 'Ismingizni kiriting' }]}
            >
              <Input
                className="h-12 rounded-xl border-gray-200 dark:border-dark-200 hover:border-primary focus:border-primary"
                placeholder="Ism"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 dark:text-gray-300 font-medium">{t('Familiya')}</span>}
              name="lastName"
            >
              <Input
                className="h-12 rounded-xl border-gray-200 dark:border-dark-200 hover:border-primary focus:border-primary"
                placeholder="Familiya"
              />
            </Form.Item>
          </div>

          <Popover
            content={passwordPopoverContent}
            title={
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Parol takliflari</span>
              </div>
            }
            trigger="click"
            open={suggestionsVisible}
            onOpenChange={handleOpenChangeSuggestions}
            placement="bottom"
          >
            <Form.Item
              label={<span className="text-gray-700 dark:text-gray-300 font-medium">{t('Parol')}</span>}
              name="password"
              rules={[{ required: true, message: t('Iltimos parolni kiriting!') || '' }]}
            >
              <Input.Password
                className="h-12 rounded-xl border-gray-200 dark:border-dark-200 hover:border-primary focus:border-primary"
                placeholder="Parolni kiriting"
                onChange={handlePasswordChange}
              />
            </Form.Item>
          </Popover>

          <Form.Item className="mb-0 pt-2">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoadingCreating}
              className="w-full h-12 rounded-xl font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t("Ro'yxatdan o'tish")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Form.Item>
        </Form>

        {/* Benefits */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Bepul demo hisob</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Video darslar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Mentor yordami</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">Sertifikat</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Hisobingiz bormi?{' '}
            <Link
              href="/login"
              className="text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              Kirish
            </Link>
          </p>
        </div>
      </LoginPageLayout>
    </>
  );
});

export default function RegisterPage() {
  return (
    <DynamicProviders>
      <ApiProvider>
        <Page />
      </ApiProvider>
    </DynamicProviders>
  );
}
