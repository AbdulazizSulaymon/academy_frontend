import React, { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StudentLayout from '@src/components/student-layout';
import { observer } from 'mobx-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { Form } from 'antd';
import { useUser } from '@src/queries/models/user';
import { useUpdateUser } from '@src/queries/models/user';
import { AutoForm, FormField } from '@components/form/auto-form';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { GlassCard } from '@/components/ui/card';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { User, Camera, Mail, Phone, Edit3, X, Calendar, Award, BookOpen, Trophy } from 'lucide-react';

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

  // Show loading only if no user in store and still loading
  if (!user && isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error if no user at all
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GlassCard className="text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('Foydalanuvchi topilmadi') || 'Foydalanuvchi topilmadi'}
          </h2>
        </GlassCard>
      </div>
    );
  }

  // Edit Mode
  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('Profilni tahrirlash') || 'Profilni tahrirlash'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('Ma\'lumotlaringizni yangiling') || 'Ma\'lumotlaringizni yangiling'}
            </p>
          </div>
          <button
            onClick={handleCancelEdit}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Edit Form */}
        <GlassCard>
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
        </GlassCard>
      </div>
    );
  }

  // View Mode
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-600 p-8 text-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {currentUser?.photo ? (
                  <img
                    src={currentUser.photo}
                    alt={currentUser.firstName || 'User'}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" />
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl lg:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {currentUser?.firstName} {currentUser?.lastName}
              </h1>
              <p className="text-white/80 mb-4 text-sm md:text-base truncate">{currentUser?.email}</p>

              {/* Bio */}
              {currentUser?.bio && (
                <p className="text-white/70 italic max-w-2xl text-sm md:text-base hidden md:block">
                  "{currentUser?.bio}"
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              {/* Stats */}
              <div className="text-center px-3 md:px-6 py-2 md:py-3 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-2xl md:text-3xl font-bold mb-0">{currentUser?.coins || 0}</p>
                <p className="text-xs md:text-sm text-white/80">Coins</p>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg text-sm"
              >
                <Edit3 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{t('Tahrirlash') || 'Tahrirlash'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Aloqa ma\'lumotlari') || 'Aloqa ma\'lumotlari'}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser?.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{t('Telefon') || 'Telefon'}</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {currentUser?.phone || t('Ko\'rsatilmagan') || "Ko'rsatilmagan"}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Account Info */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('Hisob ma\'lumotlari') || 'Hisob ma\'lumotlari'}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Member Since */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">{t('A\'zo bo\'lgan') || 'A\'zo bo\'lgan'}</p>
                <p className="font-medium text-gray-900 dark:text-white">
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

            {/* Coins */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Coins</p>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser?.coins || 0}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold mb-0 text-gray-900 dark:text-white">
                {currentUser?.enrolledCourses || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('Faol kurslar') || 'Faol kurslar'}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold mb-0 text-gray-900 dark:text-white">
                {currentUser?.completedCourses || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('Tugatilgan kurslar') || 'Tugatilgan kurslar'}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold mb-0 text-gray-900 dark:text-white">
                {currentUser?.certificates || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('Sertifikatlar') || 'Sertifikatlar'}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10">
            <Edit3 className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('Tezk harakatlar') || 'Tezk harakatlar'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/student/settings')}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {t('Sozlamalar') || 'Sozlamalar'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('Til, tema va boshqalar') || 'Til, tema va boshqalar'}
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push('/student/courses')}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {t('Mening kurslarim') || 'Mening kurslarim'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('Barcha kurslar') || 'Barcha kurslar'}
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push('/student/progress')}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {t('Progress') || 'Progress'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('Statistika va yutuqlar') || 'Statistika va yutuqlar'}
              </p>
            </div>
          </button>
        </div>
      </GlassCard>
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
