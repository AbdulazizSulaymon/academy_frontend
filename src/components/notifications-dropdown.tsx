import React, { useState, useEffect } from 'react';
import { Badge, Dropdown } from 'antd';
import { useViewNotifications } from '@src/queries/models/view-notification';
import { get } from 'lodash';
import { useLayoutStore } from '@src/stores/layout-store';
import {
  Bell,
  BookOpen,
  Trophy,
  Calendar,
  Coins,
  CheckCircle,
  X,
  Clock,
  Star,
  Award,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface NotificationsDropdownProps {
  className?: string;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ className }) => {
  const { user } = useLayoutStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  // Fetch viewed notifications (ViewNotification jadvali o'qilgan bildirishnomalarni saqlaydi)
  const { data: viewedNotificationsResponse, isLoading } = useViewNotifications(
    {
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    },
    { enabled: !!user?.id },
  );

  const viewedNotifications = get(viewedNotificationsResponse, 'data.data', []);
  const unreadCount = 0; // ViewNotification o'qilgan bildirishnomalarni saqlaydi, shuning uchun unreadCount hozircha 0

  // Notification type icons
  const getNotificationIcon = (type: string) => {
    const icons = {
      LESSON: BookOpen,
      COURSE: BookOpen,
      ACHIEVEMENT: Trophy,
      CERTIFICATE: Award,
      EVENT: Calendar,
      COIN: Coins,
      TEST: CheckCircle,
      PROGRESS: Star,
      DEFAULT: Bell,
    };
    const Icon = icons[type as keyof typeof icons] || icons.DEFAULT;
    return <Icon className="w-5 h-5" />;
  };

  // Get notification color
  const getNotificationColor = (type: string) => {
    const colors = {
      LESSON: 'from-blue-500/10 to-blue-600/10 text-blue-600',
      COURSE: 'from-green-500/10 to-green-600/10 text-green-600',
      ACHIEVEMENT: 'from-yellow-500/10 to-yellow-600/10 text-yellow-600',
      CERTIFICATE: 'from-purple-500/10 to-purple-600/10 text-purple-600',
      EVENT: 'from-red-500/10 to-red-600/10 text-red-600',
      COIN: 'from-orange-500/10 to-orange-600/10 text-orange-600',
      TEST: 'from-pink-500/10 to-pink-600/10 text-pink-600',
      PROGRESS: 'from-indigo-500/10 to-indigo-600/10 text-indigo-600',
      DEFAULT: 'from-gray-500/10 to-gray-600/10 text-gray-600',
    };
    return colors[type as keyof typeof colors] || colors.DEFAULT;
  };

  // Format time
  const formatTime = (date: string) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMs = now.getTime() - notificationDate.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return t('Hozir') || 'Hozir';
    if (diffInMins < 60) return `${diffInMins} ${t('daqiqa oldin') || 'daqiqa oldin'}`;
    if (diffInHours < 24) return `${diffInHours} ${t('soat oldin') || 'soat oldin'}`;
    if (diffInDays < 7) return `${diffInDays} ${t('kun oldin') || 'kun oldin'}`;
    return notificationDate.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
  };

  const menuItems = [
    {
      key: 'header',
      label: (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <span className="font-semibold text-gray-900 dark:text-white">
              {t('Bildirishnomalar') || 'Bildirishnomalar'}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {unreadCount} {t('ta yangi') || 'ta yangi'}
          </span>
        </div>
      ),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'notifications',
      label: (
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : viewedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Bell className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t('Bildirishnomalar yo\'q') || 'Bildirishnomalar yo\'q'}
              </p>
            </div>
          ) : (
            viewedNotifications.map((viewedNotification: any) => {
              const notification = viewedNotification.notification;
              return (
                <div
                  key={viewedNotification.id}
                  className={clsx(
                    'flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0',
                  )}
                >
                {/* Icon */}
                <div
                  className={clsx(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br',
                    getNotificationColor(notification.type),
                  )}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {notification.titleUz ||
                      notification.titleRu ||
                      notification.titleEn ||
                      notification.title}
                  </p>
                  {notification.message && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {notification.messageUz ||
                        notification.messageRu ||
                        notification.messageEn ||
                        notification.message}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        </div>
      ),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'footer',
      label: (
        <button
          onClick={() => setOpen(false)}
          className="w-full text-center px-4 py-2 text-sm text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {t('Barcha bildirishnomalarni ko\'rish') || 'Barcha bildirishnomalarni ko\'rish'}
        </button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      className={className}
    >
      <button
        className={clsx(
          'relative inline-flex items-center justify-center p-2.5 rounded-lg transition-colors flex-shrink-0 border-0',
          'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400',
        )}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    </Dropdown>
  );
};

export default NotificationsDropdown;
