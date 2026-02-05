import React, { ReactElement } from 'react';
import StudentLayout from '@src/components/student-layout';
import { observer } from 'mobx-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { GlassCard } from '@/components/ui/card';
import { Switch, Button, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  Moon,
  Sun,
  Globe,
  Bell,
  Lock,
  User,
  Eye,
  EyeOff,
  Key,
  Mail,
  Shield,
} from 'lucide-react';

const StudentSettings: NextPageWithLayout = observer(() => {
  const { user, setUser } = useLayoutStore();
  const { isDarkMode, toggleTheme } = useMyTheme();
  const { t, i18n } = useTranslation();

  // Language options
  const languages = [
    { code: 'uz', name: 'Oʻzbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === user?.lang) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    if (user) {
      setUser({ ...user, lang: langCode });
      i18n.changeLanguage(langCode);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('Sozlamalar') || 'Sozlamalar'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('Hisob sozlamalaringizni boshqaring') || 'Hisob sozlamalaringizni boshqaring'}
        </p>
      </div>

      {/* Appearance */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            {isDarkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-yellow-600" />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Tashqi ko\'rinish') || 'Tashqi ko\'rinish'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('Ilovani ko\'rinishini sozlang') || 'Ilovani ko\'rinishini sozlang'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                {isDarkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-yellow-600" />}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Qorong\'u rejim') || 'Qorong\'u rejim'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isDarkMode
                    ? (t('Qorong\'u rejim faol') || 'Qorong\'u rejim faol')
                    : (t('Yorqin rejim faol') || 'Yorqin rejim faol')}
                </p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              className={isDarkMode ? 'bg-purple-600' : 'bg-gray-300'}
            />
          </div>
        </div>
      </GlassCard>

      {/* Language */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Til') || 'Til'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('Ilova tilini tanlang') || 'Ilova tilini tanlang'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`p-4 rounded-xl border-2 transition-all ${
                currentLanguage.code === lang.code
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <span className="text-3xl mb-2 block">{lang.flag}</span>
                <p className="font-medium text-gray-900 dark:text-white">{lang.name}</p>
              </div>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient-to-br from-green-500/10 to-green-600/10">
            <Bell className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Bildirishnomalar') || 'Bildirishnomalar'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('Bildirishnoma sozlamalari') || 'Bildirishnoma sozlamalari'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Email bildirishnomalari') || 'Email bildirishnomalari'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Email orqali bildirishnomalar oling') || 'Email orqali bildirishnomalar oling'}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Push bildirishnomalari') || 'Push bildirishnomalari'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Brauzer bildirishnomalari') || 'Brauzer bildirishnomalari'}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Course Updates */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Kurs yangiliklari') || 'Kurs yangiliklari'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Yangi darslar va topshiriqlar haqida') || 'Yangi darslar va topshiriqlar haqida'}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </GlassCard>

      {/* Privacy & Security */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient-to-br from-red-500/10 to-red-600/10">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Maxfiylik va xavfsizlik') || 'Maxfiylik va xavfsizlik'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('Hisobingiz xavfsizligini boshqaring') || 'Hisobingiz xavfsizligini boshqaring'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Profile Visibility */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Profil ko\'rinishi') || 'Profil ko\'rinishi'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Profilingizni boshqa foydalanuvchilar ko\'radi') || 'Profilingizni boshqa foydalanuvchilar ko\'radi'}
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Change Password Button */}
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Key className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Parolni o\'zgartirish') || 'Parolni o\'zgartirish'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Hisob parolingizni yangilang') || 'Hisob parolingizni yangilang'}
                </p>
              </div>
            </div>
          </button>
        </div>
      </GlassCard>

      {/* Account Actions */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10">
            <User className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Hisob') || 'Hisob'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('Hisobingiz bilan bog\'liq amallar') || 'Hisobingiz bilan bog\'liq amallar'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Deactivate Account */}
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <EyeOff className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Hisobni vaqtincha o\'chirish') || 'Hisobni vaqtincha o\'chirish'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Hisobingizni vaqtincha faolsizlantiring') || 'Hisobingizni vaqtincha faolsizlantiring'}
                </p>
              </div>
            </div>
          </button>

          <Divider className="my-4" />

          {/* Delete Account */}
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-red-600 dark:text-red-400">
                  {t('Hisobni o\'chirish') || 'Hisobni o\'chirish'}
                </p>
                <p className="text-sm text-red-500 dark:text-red-500">
                  {t('Hisobingizni butunlay o\'chirib tashlang') || 'Hisobingizni butunlay o\'chirib tashlang'}
                </p>
              </div>
            </div>
          </button>
        </div>
      </GlassCard>
    </div>
  );
});

StudentSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Sozlamalar">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default StudentSettings;
