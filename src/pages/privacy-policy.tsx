import React, { ReactElement } from 'react';
import {
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  Cookie,
  Mail,
  Globe,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/card';
import { NextPageWithLayout } from '@/types';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: NextPageWithLayout = () => {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Shield,
      title: t('Ma\'lumotlaringizni himoya qilamiz') || 'Ma\'lumotlaringizni himoya qilamiz',
      description:
        t(
          'Biz sizning shaxsiy ma\'lumotlaringizni eng yuqori darajadagi xavfsizlik standartlari asosida himoya qilamiz.',
        ) ||
        'Biz sizning shaxsiy ma\'lumotlaringizni eng yuqori darajadagi xavfsizlik standartlari asosida himoya qilamiz.',
    },
    {
      icon: Eye,
      title: t('Shaffoflik') || 'Shaffoflik',
      description:
        t(
          'Ma\'lumotlaringiz qanday ishlatilishi haqida to\'liq ma\'lumot beramiz. Siz har doim bilishingiz mumkin.',
        ) ||
        'Ma\'lumotlaringiz qanday ishlatilishi haqida to\'liq ma\'lumot beramiz. Siz har doim bilishingiz mumkin.',
    },
    {
      icon: UserCheck,
      title: t('Foydalanuvchi nazorati') || 'Foydalanuvchi nazorati',
      description:
        t(
          'Siz o\'zingizning ma\'lumotlaringiz ustidan to\'liq nazoratga egasiz. Ularni ko\'rish, o\'zgartirish va o\'chirish huquqiga egasiz.',
        ) ||
        'Siz o\'zingizning ma\'lumotlaringiz ustidan to\'liq nazoratga egasiz. Ularni ko\'rish, o\'zgartirish va o\'chirish huquqiga egasiz.',
    },
  ];

  const dataCollected = [
    {
      icon: UserCheck,
      title: t('Hisob ma\'lumotlari') || 'Hisob ma\'lumotlari',
      items: [
        t('Ism va familiya') || 'Ism va familiya',
        t('Email manzil') || 'Email manzil',
        t('Telefon raqami') || 'Telefon raqami',
        t('Profil rasmi') || 'Profil rasmi',
        t('Parol (shifrlangan)') || 'Parol (shifrlangan)',
      ],
    },
    {
      icon: Database,
      title: t('Foydalanish ma\'lumotlari') || 'Foydalanish ma\'lumotlari',
      items: [
        t('Kurslarda progress') || 'Kurslarda progress',
        t('Tamomlangan darslar') || 'Tamomlangan darslar',
        t('Topshiriq natijalari') || 'Topshiriq natijalari',
        t('Sertifikatlar') || 'Sertifikatlar',
        t('Coinlar balansi') || 'Coinlar balansi',
      ],
    },
  ];

  const dataUsage = [
    t('Xizmatni taqdim etish') || 'Xizmatni taqdim etish',
    t('Kurslarni va darslarni taqdim etish') || 'Kurslarni va darslarni taqdim etish',
    t('Progress tracking') || 'Progress tracking',
    t('Sertifikat berish') || 'Sertifikat berish',
    t('Tajribangizni yaxshilash') || 'Tajribangizni yaxshilash',
    t('Xavfsizlikni ta\'minlash') || 'Xavfsizlikni ta\'minlash',
    t('Aloqa qilish') || 'Aloqa qilish',
  ];

  const userRights = [
    {
      icon: Eye,
      title: t('Kirish huquqi') || 'Kirish huquqi',
      description:
        t(
          'Siz o\'zingizning shaxsiy ma\'lumotlaringizga bepul kirish huquqiga egasiz.',
        ) || 'Siz o\'zingizning shaxsiy ma\'lumotlaringizga bepul kirish huquqiga egasiz.',
    },
    {
      icon: FileText,
      title: t('To\'g\'irlash huquqi') || 'To\'g\'irlash huquqi',
      description:
        t(
          'Ma\'lumotlaringizni noto\'g\'ri bo\'lsa, ularni o\'zgartirishni so\'rashingiz mumkin.',
        ) || 'Ma\'lumotlaringizni noto\'g\'ri bo\'lsa, ularni o\'zgartirishni so\'rashingiz mumkin.',
    },
    {
      icon: Database,
      title: t('O\'chirish huquqi') || 'O\'chirish huquqi',
      description:
        t(
          'Ba\'zi holatlarda ma\'lumotlaringizni o\'chirishni so\'rashingiz mumkin.',
        ) || 'Ba\'zi holatlarda ma\'lumotlaringizni o\'chirishni so\'rashingiz mumkin.',
    },
    {
      icon: Mail,
      title: t('Cheklovlar') || 'Cheklovlar',
      description:
        t(
          'Ma\'lum bir ma\'lumotlarni saqlashimiz qonuniy talablar tufayli majburiy bo\'lishi mumkin.',
        ) ||
        'Ma\'lum bir ma\'lumotlarni saqlashimiz qonuniy talablar tufayli majburiy bo\'lishi mumkin.',
    },
  ];

  const securityMeasures = [
    {
      icon: Lock,
      title: t('SSL shifrlash') || 'SSL shifrlash',
      description:
        t(
          'Barcha ma\'lumotlar SSL shifrlash orqali himoya qilinadi.',
        ) || 'Barcha ma\'lumotlar SSL shifrlash orqali himoya qilinadi.',
    },
    {
      icon: Shield,
      title: t('Xavfsizlik serverlari') || 'Xavfsizlik serverlari',
      description:
        t(
          'Ma\'lumotlaringiz xavfsiz serverlarda saqlanadi.',
        ) || 'Ma\'lumotlaringiz xavfsiz serverlarda saqlanadi.',
    },
    {
      icon: UserCheck,
      title: t('Kirish nazorati') || 'Kirish nazorati',
      description:
        t(
          'Faqat autorizatsiyalangan xodimlar ma\'lumotlarga kirishi mumkin.',
        ) || 'Faqat autorizatsiyalangan xodimlar ma\'lumotlarga kirishi mumkin.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-600/20 mb-4">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {t('Maxfiylik Siyosati') || 'Maxfiylik Siyosati'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t(
            'O\'zbekistan Online Academy platformasidan foydalanish uchun maxfiylik siyosati',
          ) ||
            'O\'zbekiston Online Academy platformasidan foydalanish uchun maxfiylik siyosati'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {t('Oxirgi yangilangan:') || 'Oxirgi yangilangan:'} {new Date().toLocaleDateString('uz-UZ')}
        </p>
      </div>

      {/* Key Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <GlassCard key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
                  index === 0
                    ? 'from-green-500/10 to-green-600/10'
                    : index === 1
                    ? 'from-blue-500/10 to-blue-600/10'
                    : 'from-purple-500/10 to-purple-600/10'
                }`}
              >
                <section.icon
                  className={`w-6 h-6 ${
                    index === 0
                      ? 'text-green-600'
                      : index === 1
                      ? 'text-blue-600'
                      : 'text-purple-600'
                  }`}
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Data Collection */}
      <GlassCard className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Qanday ma\'lumotlar yig\'amiz') || 'Qanday ma\'lumotlar yig\'amiz'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataCollected.map((category, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <category.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{category.title}</h3>
              </div>
              <ul className="space-y-2 ml-11">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Data Usage */}
      <GlassCard className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <Globe className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Ma\'lumotlarni qanday ishlatamiz') || 'Ma\'lumotlarni qanday ishlatamiz'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dataUsage.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-gray-900 dark:text-white">{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* User Rights */}
      <GlassCard className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10">
            <UserCheck className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Foydalanuvchi huquqlari') || 'Foydalanuvchi huquqlari'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userRights.map((right, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <right.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{right.title}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">{right.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Security */}
      <GlassCard className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Ma\'lumotlar xavfsizligi') || 'Ma\'lumotlar xavfsizligi'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityMeasures.map((measure, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                <measure.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{measure.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{measure.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Cookies */}
      <GlassCard className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/10">
            <Cookie className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Cookies va texnologiyalar') || 'Cookies va texnologiyalar'}
          </h2>
        </div>

        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            {t(
              'Biz veb-saytimizda cookies va boshqa texnologiyalardan foydalanamiz. Bulardan foydalanib, sizning tajribangizni yaxshilashimiz va xizmatimizni takomillashtiramiz.',
            ) ||
              'Biz veb-saytimizda cookies va boshqa texnologiyalardan foydalanamiz. Bulardan foydalanib, sizning tajribangizni yaxshilashimiz va xizmatimizni takomillashtiramiz.'}
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              t('Authenticate') || 'Authenticate',
              t('Preferences') || 'Preferences',
              t('Analytics') || 'Analytics',
              t('Security') || 'Security',
            ].map((item, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Contact */}
      <GlassCard className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary-600/10">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('Biz bilan bog\'lanish') || 'Biz bilan bog\'lanish'}
          </h2>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {t(
              'Maxfiylik siyosati haqida savollaringiz bormi? Biz bilan bog\'laning:',
            ) || 'Maxfiylik siyosati haqida savollaringiz bormi? Biz bilan bog\'laning:'}
          </p>
          <a
            href="mailto:support@osonsotuv.uz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
            support@osonsotuv.uz
          </a>
        </div>
      </GlassCard>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-500 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p>
          {t('Ushbu maxfiylik siyosati') ||
            'Ushbu maxfiylik siyosati'} {new Date().getFullYear()}{' '}
          {t('O\'zbekistan Online Academy') || 'O\'zbekistan Online Academy'}{' '}
          {t('tomonidan oxirgi marta yangilangan') || 'tomonidan oxirgi marta yangilangan'}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
