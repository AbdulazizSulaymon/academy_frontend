import { css } from '@emotion/react';
import { Button, Result, Typography } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdErrorOutline, MdRefresh, MdHome } from 'react-icons/md';
import { useRouter } from 'next/router';

const { Paragraph, Text } = Typography;

export const ErrorTitle = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 justify-center my-4">
      <MdErrorOutline className="text-red-400 text-xl animate-pulse" />
      <Text className="text-red-400 text-lg font-medium">
        {t('Malumot yuklanishda xatolik yuz berdi!') || "Ma'lumot yuklanishda xatolik yuz berdi!"}
      </Text>
    </div>
  );
};

// Glass card container
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`
      relative overflow-hidden
      bg-white/10 dark:bg-black/20
      backdrop-blur-xl
      border border-white/20 dark:border-white/10
      rounded-2xl
      shadow-2xl
      ${className}
    `}
  >
    {/* Animated gradient background */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy"></div>
    </div>
    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);

// Error icon with animation
const ErrorIcon = ({ status = '500' }: { status?: ResultStatusType }) => {
  const iconMap: Record<string, { icon: string; color: string; emoji: string }> = {
    '403': { icon: '🔒', color: 'text-orange-500', emoji: '🔒' },
    '404': { icon: '🔍', color: 'text-yellow-500', emoji: '🔍' },
    '500': { icon: '⚠️', color: 'text-red-500', emoji: '⚠️' },
    error: { icon: '❌', color: 'text-red-500', emoji: '❌' },
    success: { icon: '✅', color: 'text-green-500', emoji: '✅' },
    info: { icon: 'ℹ️', color: 'text-blue-500', emoji: 'ℹ️' },
    warning: { icon: '⚡', color: 'text-orange-500', emoji: '⚡' },
  };

  const { emoji } = iconMap[status] || iconMap['500'];

  return (
    <div className="relative">
      <div className={`text-8xl md:text-9xl mb-6 animate-bounce-slow`}>{emoji}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-32 h-32 rounded-full bg-current opacity-10 animate-ping`}></div>
      </div>
    </div>
  );
};

function Error({
  status = '500',
  title = 'Xatolik',
  subtitle = 'Malumot yuklanishda xatolik yuz berdi!',
  className = '',
  showHomeButton = false,
}: {
  status?: ResultStatusType;
  title?: string;
  subtitle?: string;
  className?: string;
  showHomeButton?: boolean;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const statusConfig: Record<string, { title: string; subtitle: string }> = {
    '403': {
      title: t('Kirish taqiqlandi') || 'Kirish taqiqlandi',
      subtitle: t("Sizda bu sahifaga kirish huquqi yo'q") || "Sizda bu sahifaga kirish huquqi yo'q",
    },
    '404': {
      title: t('Sahifa topilmadi') || 'Sahifa topilmadi',
      subtitle: t('Qidirilgan sahifa mavjud emas') || 'Qidirilgan sahifa mavjud emas',
    },
    '500': {
      title: t('Server xatoligi') || 'Server xatoligi',
      subtitle: t('Malumot yuklanishda xatolik yuz berdi') || 'Malumot yuklanishda xatolik yuz berdi',
    },
  };

  const config = statusConfig[status] || { title, subtitle };

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className={`p-8 md:p-12 max-w-2xl w-full ${className}`}>
        <div className="text-center">
          {/* Error Icon */}
          <ErrorIcon status={status} />

          {/* Status Code */}
          <div className="mb-4">
            <Text className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              {status}
            </Text>
          </div>

          {/* Title */}
          <div className="mb-4">
            <Typography.Title level={2} className="!mb-0 text-gray-800 dark:text-gray-100">
              {t(config.title)}
            </Typography.Title>
          </div>

          {/* Subtitle */}
          <div className="mb-8">
            <Paragraph className="text-lg text-gray-600 dark:text-gray-400">{t(config.subtitle)}</Paragraph>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => window.location.reload()}
              type="primary"
              size="large"
              icon={<MdRefresh className="text-lg" />}
              className={`
                h-12 px-8 rounded-xl
                bg-gradient-to-r from-blue-500 to-purple-600
                border-none
                hover:from-blue-600 hover:to-purple-700
                hover:scale-105 hover:shadow-lg
                transition-all duration-300
                font-semibold
              `}
            >
              {t('Sahifani qayta yuklash') || 'Sahifani qayta yuklash'}
            </Button>

            {showHomeButton && (
              <Button
                onClick={() => router.push('/')}
                size="large"
                icon={<MdHome className="text-lg" />}
                className={`
                  h-12 px-8 rounded-xl
                  hover:scale-105 hover:shadow-lg
                  transition-all duration-300
                  font-semibold
                `}
              >
                {t('Bosh sahifaga qaytish') || 'Bosh sahifaga qaytish'}
              </Button>
            )}
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Paragraph className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {t('Agar xatolik davom etsa') || 'Agar xatolik davom etsa,'}
            </Paragraph>
            <a
              href="mailto:support@academy.uz"
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              {t("Qo'llab-quvvatlash xizmati bilan bog'laning") || "Qo'llab-quvvatlash xizmati bilan bog'laning"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
