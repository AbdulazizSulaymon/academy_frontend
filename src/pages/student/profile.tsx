import React, { ReactElement, useEffect } from 'react';
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
import { User, Camera } from 'lucide-react';

const StudentProfile: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { user, setUser } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();
  const [form] = Form.useForm();

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
        // Refetch user data to update store
        if (currentUser?.id) {
          setUser({ ...user, ...currentUser });
        }
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
    {
      name: 'photo',
      label: t('Profil rasmi') || 'Profil rasmi',
      type: 'file',
      accept: 'image/*',
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
        <GlassCard className="p-12 text-center">
          <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('Foydalanuvchi topilmadi') || 'Foydalanuvchi topilmadi'}
          </h2>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-600 p-8 text-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative flex items-center gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {currentUser?.photo ? (
                <img
                  src={currentUser.photo}
                  alt={currentUser.firstName || 'User'}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {currentUser?.firstName} {currentUser?.lastName}
            </h1>
            <p className="text-white/80">{currentUser?.email}</p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{currentUser?.coins || 0}</p>
              <p className="text-sm text-white/80">Coins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <GlassCard>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('Profil ma lumotlari') || 'Profil ma\'lumotlari'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Profil ma lumotlaringizni yangilang') || 'Profil ma\'lumotlaringizni yangilang'}
          </p>
        </div>

        <AutoForm
          form={form}
          fields={formFields}
          onFinish={handleFinish}
          isSaveLoading={isUpdating}
          saveTitle={t('Saqlash') || 'Saqlash'}
          columnSize={2}
          hideButtons={false}
        />
      </GlassCard>

      {/* Account Settings */}
      <GlassCard>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('Hisob sozlamalari') || 'Hisob sozlamalari'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Hisob sozlamalaringizni boshqaring') || 'Hisob sozlamalaringizni boshqaring'}
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {t('Shaxsiy ma lumotlar') || 'Shaxsiy ma\'lumotlar'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('Ism familiya va boshqalar') || 'Ism, familiya va boshqalar'}
                </p>
              </div>
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
