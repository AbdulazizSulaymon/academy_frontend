import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StudentLayout from '@src/components/student-layout';
import { observer } from 'mobx-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { Form, Modal } from 'antd';
import { useUser } from '@src/queries/models/user';
import { useUpdateUser } from '@src/queries/models/user';
import { AutoForm, FormField } from '@components/form/auto-form';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  User,
  Camera,
  Mail,
  Phone,
  Edit3,
  X,
  Calendar,
  Award,
  BookOpen,
  Trophy,
  Sparkles,
  Target,
  TrendingUp,
  Clock,
  Star,
  Gift,
  Flame,
  Gem,
  Crown,
  ChevronRight,
  MapPin,
  Link as LinkIcon,
  Linkedin,
  Github,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';

const StudentProfile: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { user, setUser } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch current user data
  const { userData, isLoading: isLoadingUser } = useUser(
    {
      where: { id: user?.id },
    },
    { enabled: !!user?.id },
  );

  // Extract user data from response
  const currentUser = user || userData;

  // Update user mutation
  const { updateUser, isPending: isUpdating } = useUpdateUser(
    {
      onSuccess: () => {
        setIsEditing(false);
      },
    },
    {
      invalidateQueries: ['user'],
      successToast: t('Profil muvaffaqiyatli yangilandi') || 'Profil muvaffaqiyatli yangilandi',
      errorToast: t('Xatolik sodir bo"ldi') || 'Xatolik sodir bo"ldi',
    },
  );

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        bio: currentUser.bio,
      });
    }
  }, [currentUser, form]);

  const handleFinish = (values: any) => {
    updateUser({
      where: { id: user?.id },
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        bio: values.bio,
      },
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.resetFields();
    if (currentUser) {
      form.setFieldsValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        bio: currentUser.bio,
      });
    }
  };

  const formFields: FormField[] = [
    {
      name: 'firstName',
      label: t('Ism') || 'Ism',
      type: 'text',
      rules: [{ required: true, message: t("Iltimos ismingizni kiriting") || "Iltimos ismingizni kiriting" }],
      placeholder: t('Ismingiz') || 'Ismingiz',
      span: 12,
    },
    {
      name: 'lastName',
      label: t('Familiya') || 'Familiya',
      type: 'text',
      rules: [{ required: true, message: t("Iltimos familiyangizni kiriting") || "Iltimos familiyangizni kiriting" }],
      placeholder: t('Familiyangiz') || 'Familiyangiz',
      span: 12,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      rules: [
        { required: true, message: t("Iltimos email kiriting") || "Iltimos email kiriting" },
        { type: 'email', message: t("To'g'ri email kiriting") || "To'g'ri email kiriting" },
      ],
      placeholder: 'email@example.com',
      span: 12,
    },
    {
      name: 'phone',
      label: t('Telefon') || 'Telefon',
      type: 'text',
      placeholder: '+998 90 123 45 67',
      span: 12,
    },
    {
      name: 'bio',
      label: t('Bio') || 'Bio',
      type: 'textarea',
      placeholder: t('Ozingiz haqingizda') || 'Ozingiz haqingizda',
      rows: 4,
      span: 24,
    },
  ];

  // Calculate member duration
  const getMemberDuration = () => {
    if (!currentUser?.createdAt) return '-';
    const created = new Date(currentUser.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) return `${diffDays} ${t('kun') || 'kun'}`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} ${t('oy') || 'oy'}`;
    return `${Math.floor(diffDays / 365)} ${t('yil') || 'yil'}`;
  };

  // Get level based on coins
  const getLevel = () => {
    const coins = currentUser?.coins || 0;
    if (coins >= 10000) return { name: 'Diamond', icon: Gem, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-500/10' };
    if (coins >= 5000) return { name: 'Platinum', icon: Crown, color: 'from-gray-300 to-gray-400', bg: 'bg-gray-400/10' };
    if (coins >= 2000) return { name: 'Gold', icon: Star, color: 'from-yellow-400 to-orange-500', bg: 'bg-yellow-500/10' };
    if (coins >= 500) return { name: 'Silver', icon: Award, color: 'from-gray-400 to-gray-500', bg: 'bg-gray-500/10' };
    return { name: 'Bronze', icon: Sparkles, color: 'from-orange-400 to-orange-600', bg: 'bg-orange-500/10' };
  };

  const level = getLevel();
  const LevelIcon = level.icon;

  // Show loading only if no user in store and still loading
  if (!user && isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Show error if no user at all
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('Foydalanuvchi topilmadi') || 'Foydalanuvchi topilmadi'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Iltimos tizimga kiring') || 'Iltimos tizimga kiring'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Premium Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Cover Image */}
          <div className="h-48 md:h-64 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"></div>
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Animated Patterns */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/20 rounded-full"></div>
            </div>

            {/* Trading Quote */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/90 text-sm md:text-base font-medium italic">
                "{t('Kripto bozorida muvaffaqiyat - bu sabr va bilimlar комбинация') || 'Kripto bozorida muvaffaqiyat - bu sabr va bilimlar kombinatsiyasi'}"
              </p>
            </div>

            {/* Level Badge */}
            <div className={`absolute top-6 right-6 ${level.bg} backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2`}>
              <LevelIcon className={`w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r ${level.color}`} />
              <span className="font-semibold text-gray-900 dark:text-white">{level.name}</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar with Ring */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative"
              >
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-2xl relative z-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  {currentUser?.photo ? (
                    <img
                      src={currentUser.photo}
                      alt={currentUser.firstName || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl md:text-6xl font-bold text-gray-400 dark:text-gray-500">
                        {currentUser?.firstName?.[0] || '?'}
                      </span>
                    </div>
                  )}
                </div>
                {/* Animated Ring */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-spin-slow opacity-70 blur-sm"></div>

                {/* Camera Button */}
                <button className="absolute bottom-2 right-2 w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Camera className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </motion.div>

              {/* User Details */}
              <div className="flex-1 pt-20 md:pt-28">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {currentUser?.firstName} {currentUser?.lastName}
                    </h1>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      Online
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-4">
                    <Mail className="w-4 h-4" />
                    {currentUser?.email}
                  </p>
                  {currentUser?.bio && (
                    <p className="text-gray-700 dark:text-gray-300 italic max-w-2xl mb-0">
                      "{currentUser?.bio}"
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Stats & Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-20 md:pt-28"
              >
                {/* Coins Card */}
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{currentUser?.coins || 0}</p>
                      <p className="text-xs text-white/80 mb-0">Coins</p>
                    </div>
                  </div>
                </div>

                {/* Streak Card */}
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{getMemberDuration()}</p>
                      <p className="text-xs text-white/80 mb-0">{t('Azo') || 'Azo'}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:opacity-90 transition-opacity shadow-xl flex items-center gap-2"
                >
                  <Edit3 className="w-5 h-5" />
                  {t('Tahrirlash') || 'Tahrirlash'}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: BookOpen, label: t('Kurslar') || 'Kurslar', value: currentUser?.enrolledCourses || 0, color: 'from-green-400 to-emerald-500' },
            { icon: Award, label: t('Tugatildi') || 'Tugatildi', value: currentUser?.completedCourses || 0, color: 'from-blue-400 to-indigo-500' },
            { icon: Trophy, label: t('Sertifikatlar') || 'Sertifikatlar', value: currentUser?.certificates || 0, color: 'from-yellow-400 to-orange-500' },
            { icon: Target, label: t('Topshiriqlar') || 'Topshiriqlar', value: currentUser?.assignments || 0, color: 'from-purple-400 to-pink-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-0">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                {t('Men haqimda') || 'Men haqimda'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white text-sm mb-0">{currentUser?.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('Telefon') || 'Telefon'}</p>
                    <p className="font-medium text-gray-900 dark:text-white text-sm mb-0">
                      {currentUser?.phone || t('Ko\'rsatilmagan')}
                    </p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('A\'zo bo\'lgan') || 'A\'zo bo\'lgan'}</p>
                    <p className="font-medium text-gray-900 dark:text-white text-sm mb-0">
                      {currentUser?.createdAt
                        ? new Date(currentUser.createdAt).toLocaleDateString('uz-UZ', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : '-'}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('Manzil') || 'Manzil'}</p>
                    <p className="font-medium text-gray-900 dark:text-white text-sm mb-0">
                      {currentUser?.location || t('Ko\'rsatilmagan')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {currentUser?.bio && (
                <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-0">
                    <span className="text-2xl text-primary/50">"</span>
                    {currentUser?.bio}
                    <span className="text-2xl text-primary/50">"</span>
                  </p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                </div>
                {t('Tezk harakatlar') || 'Tezk harakatlar'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: BookOpen, title: t('Mening kurslarim') || 'Mening kurslarim', desc: t('Barcha kurslar') || 'Barcha kurslar', href: '/student/courses', color: 'bg-green-500' },
                  { icon: Target, title: t('Topshiriqlar') || 'Topshiriqlar', desc: t('Faol topshiriqlar') || 'Faol topshiriqlar', href: '/student/assignments', color: 'bg-purple-500' },
                  { icon: Trophy, title: t('Yutuqlar') || 'Yutuqlar', desc: t('Sertifikatlar va badge') || 'Sertifikatlar va badge', href: '/student/progress', color: 'bg-yellow-500' },
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={() => router.push(action.href)}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-left group"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-lg`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white mb-0">{action.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0">{action.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Achievements */}
          <div className="space-y-8">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 shadow-xl text-white"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">{t('Daraja') || 'Daraja'}</h2>
                <div className={`px-3 py-1 rounded-full ${level.bg} backdrop-blur-sm`}>
                  <span className="font-semibold text-sm">{level.name}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{t('Hozirgi')}</span>
                  <span className="font-semibold">{currentUser?.coins || 0} / 10000</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(((currentUser?.coins || 0) / 10000) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </div>

              {/* Next Level */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">
                  {t('Keyingi daraja')}: {10000 - (currentUser?.coins || 0)} {t('coin qoldi')}
                </span>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                {t('So\'nggi faoliyat') || 'So\'nggi faoliyat'}
              </h2>

              <div className="space-y-4">
                {[
                  { icon: BookOpen, text: t('Kursni boshladi') || 'Kursni boshladi', time: '2 soat oldin', color: 'bg-green-500' },
                  { icon: Award, text: t('Testni tugatdi') || 'Testni tugatdi', time: '1 kun oldin', color: 'bg-blue-500' },
                  { icon: Gift, text: t('Coin oldi') || 'Coin oldi', time: '3 kun oldin', color: 'bg-yellow-500' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate mb-0">{activity.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-0">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => router.push('/student/progress')}
                className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors font-medium"
              >
                {t('Barchasini ko\'rish') || 'Barchasini ko\'rish'}
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-indigo-500" />
                </div>
                {t('Ijtimoiy tarmoqlar') || 'Ijtimoiy tarmoqlar'}
              </h2>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#0077b5] flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 dark:text-white mb-0">LinkedIn</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0">{t('Profilni ulashish') || 'Profilni ulashish'}</p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 dark:text-white mb-0">GitHub</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0">{t('Loyihalar') || 'Loyihalar'}</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        open={isEditing}
        onCancel={handleCancelEdit}
        closeIcon={null}
        footer={null}
        centered
        width={600}
        className="profile-edit-modal"
      >
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('Profilni tahrirlash') || 'Profilni tahrirlash'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('Ma\'lumotlaringizni yangiling') || 'Ma\'lumotlaringizni yangiling'}
              </p>
            </div>
            <button
              onClick={handleCancelEdit}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Edit Form */}
          <AutoForm
            form={form}
            fields={formFields}
            onFinish={handleFinish}
            isSaveLoading={isUpdating}
            saveTitle={t('Saqlash') || 'Saqlash'}
            cancelTitle={t('Bekor qilish') || 'Bekor qilish'}
            onCancel={handleCancelEdit}
            columnSize={2}
          />
        </div>
      </Modal>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
});

StudentProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Profil">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default StudentProfile;
