import { Popover, Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  Box,
  Calendar,
  MessageSquare,
  Package,
  ShoppingCart,
  Store,
  Users,
  Zap,
  X,
} from 'lucide-react';
import { useMyTheme } from '@hooks/use-my-theme';
import clsx from 'clsx';

export const QuickActions = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useMyTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // On chat pages the input/send bar sits at bottom-right too.
  // Move the floating button up to avoid overlap.
  const isShopChatPage = router.pathname?.startsWith('/shop/chat');

  const quickActions = [
    {
      label: t('Dashboard') || '',
      href: '/shop/dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: t('Mahsulotlar') || '',
      href: '/shop/products/list-products',
      icon: <Package className="w-5 h-5" />,
      color: 'from-primary to-primary-700',
      bgColor: 'bg-primary-50 dark:bg-primary-950/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      label: t('Buyurtmalar') || '',
      href: '/shop/orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: t('Mijozlar') || '',
      href: '/shop/clients/list-clients',
      icon: <Users className="w-5 h-5" />,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50 dark:bg-violet-950/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      label: t('Kategoriyalar') || '',
      href: '/shop/categories',
      icon: <Box className="w-5 h-5" />,
      color: 'from-amber-500 to-yellow-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: t('Chatlar') || '',
      href: '/shop/chat',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
    },
    {
      label: t('landingPage.adminList.myShops') || '',
      href: '/shop/my-shops/list-my-shops',
      icon: <Store className="w-5 h-5" />,
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: t('landingPage.adminList.date') || '',
      href: '/shop/calendar',
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50 dark:bg-teal-950/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
  ];

  const content = (
    <div className={clsx('min-w-[280px] max-w-[320px]', isDarkMode ? 'dark' : '')}>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 m-0">
          {t('Tez amallar') || 'Quick Actions'}
        </h3>
        <Button
          type="text"
          size="small"
          onClick={() => setOpen(false)}
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            onClick={() => setOpen(false)}
            className="block"
          >
            <div
              className={clsx(
                'group relative p-4 rounded-xl border border-gray-200 dark:border-gray-700',
                'bg-white dark:bg-gray-800/50',
                'hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50',
                'hover:scale-[1.02] hover:-translate-y-0.5',
                'hover:border-transparent',
                'transition-all duration-300 cursor-pointer',
                'overflow-hidden',
                action.bgColor
              )}
            >
              <div className={clsx(
                'w-10 h-10 rounded-lg flex items-center justify-center mb-3',
                'bg-gradient-to-br ' + action.color,
                'transition-transform duration-300',
                'shadow-sm'
              )}>
                <div className="text-white">{action.icon}</div>
              </div>
              <span className={clsx(
                'font-medium text-sm block',
                'text-gray-900 dark:text-gray-100',
                'group-hover:text-gray-100 dark:group-hover:text-gray-200',
                'transition-colors'
              )}>
                {action.label}
              </span>
              <div
                className={clsx(
                  'absolute inset-0 opacity-0 group-hover:opacity-100',
                  'bg-gradient-to-br ' + action.color,
                  'transition-opacity duration-300 -z-10 blur-xl'
                )}
                style={{ transform: 'scale(1.5)' }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="leftTop"
      overlayClassName={clsx(
        'quick-actions-popover',
        isDarkMode && 'dark-popover'
      )}
      overlayInnerStyle={{
        padding: '20px',
        borderRadius: '16px',
        boxShadow: isDarkMode
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#333333' : '#e5e7eb'}`,
      }}
    >
      <button
        className={clsx(
          'fixed right-6 z-50',
          isShopChatPage ? 'bottom-24' : 'bottom-6',
          'w-16 h-16 rounded-2xl',
          'bg-gradient-to-br from-primary via-primary-600 to-primary-700',
          'text-white shadow-2xl',
          'flex items-center justify-center',
          'hover:scale-110 hover:rotate-3',
          'active:scale-95',
          'transition-all duration-300',
          'border-2 border-white/20 dark:border-gray-700/50',
          'backdrop-blur-sm',
          open && 'scale-110 rotate-3 shadow-primary/50',
          isDarkMode 
            ? 'shadow-primary/30 hover:shadow-primary/50' 
            : 'shadow-primary/40 hover:shadow-primary/60'
        )}
        aria-label={t('Tez amallar') || 'Quick Actions'}
      >
        <Zap 
          className={clsx(
            'w-7 h-7 transition-transform duration-300',
            open && 'rotate-12'
          )} 
        />
        {open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
        )}
      </button>
    </Popover>
  );
};
