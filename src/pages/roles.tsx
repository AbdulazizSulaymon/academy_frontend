import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  Shield,
  GraduationCap,
  Users,
  Briefcase,
  Crown,
  Settings,
  Store,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useCheckRoles } from '@hooks/use-check-roles';
import { useMyTheme } from '@hooks/use-my-theme';
import { GlassCard, FeatureCard, BenefitCard } from '@/components/ui/card';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isDarkMode } = useMyTheme();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { isAdmin, isPartner, isStudent, isMentor, isSuperAdmin, isSalesManager } = useCheckRoles();

  const allRoles = useMemo(
    () => [
      {
        label: 'Super Admin',
        value: 'superadmin',
        path: '/admin/dashboard',
        icon: Crown,
        description: 'Tizimning toliq nazorati',
        gradient: 'from-purple-500 to-purple-600',
        permission: 'isSuperAdmin',
      },
      {
        label: 'Admin',
        value: 'admin',
        path: '/admin/dashboard',
        icon: Shield,
        description: 'Admin paneli va boshqaruv',
        gradient: 'from-blue-500 to-blue-600',
        permission: 'isAdmin',
      },
      {
        label: 'Student',
        value: 'student',
        path: '/student/dashboard',
        icon: GraduationCap,
        description: 'Kurslarni o\'rganish va rivojlantirish',
        gradient: 'from-green-500 to-green-600',
        permission: 'isStudent',
      },
      {
        label: 'Mentor',
        value: 'mentor',
        path: '/mentor/dashboard',
        icon: Users,
        description: 'Kurslarni boshqarish va o\'qitish',
        gradient: 'from-orange-500 to-orange-600',
        permission: 'isMentor',
      },
      {
        label: 'Sales Manager',
        value: 'sales',
        path: '/sales/dashboard',
        icon: Store,
        description: 'Sotuv boshqaruvchisi',
        gradient: 'from-rose-500 to-rose-600',
        permission: 'isSalesManager',
      },
    ],
    [],
  );

  const roles = useMemo(() => {
    // Barcha rollarni ko'rsatish
    return allRoles;
  }, [allRoles]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedRole');
      if (saved) setSelectedRole(saved);
    } catch {}
  }, []);

  const handleNavigate = () => {
    if (selectedRole) {
      const role = roles.find((r) => r.value === selectedRole);
      if (role) {
        try {
          localStorage.setItem('selectedRole', selectedRole);
        } catch {}
        router.push(role.path);
      }
    }
  };

  const handleRoleSelect = (roleValue: string) => {
    setSelectedRole(roleValue);
    const role = roles.find((r) => r.value === roleValue);
    if (role) {
      try {
        localStorage.setItem('selectedRole', roleValue);
      } catch {}
      setTimeout(() => {
        router.push(role.path);
      }, 200);
    }
  };

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: isDarkMode
          ? 'radial-gradient(1200px 600px at 20% 20%, rgba(99, 102, 241, 0.18), transparent 55%), radial-gradient(900px 500px at 80% 30%, rgba(168, 85, 247, 0.16), transparent 55%), #0b0f19'
          : 'radial-gradient(1200px 600px at 20% 20%, rgba(59, 130, 246, 0.18), transparent 55%), radial-gradient(900px 500px at 80% 30%, rgba(168, 85, 247, 0.14), transparent 55%), #f8fafc',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 text-sm font-medium mb-6">
            <Settings className="w-4 h-4" />
            <span>Role Selection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Rolni tanlang
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tizimda qaysi rol bilan ishlashni xohlaysiz? Quyidagi rollardan birini tanlang
          </p>
        </div>

        {/* Action Bar */}
        <div className="mb-8 flex justify-center sm:justify-end">
          <div className="flex items-center gap-3">
            <GhostButton onClick={() => router.back()}>
              Ortga
            </GhostButton>
            {selectedRole && (
              <PrimaryButton onClick={handleNavigate}>
                Davom etish
                <ChevronRight className="w-4 h-4 ml-1" />
              </PrimaryButton>
            )}
          </div>
        </div>

        {/* Roles Grid */}
        {roles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => {
              const active = selectedRole === role.value;
              const Icon = role.icon;
              return (
                <div
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className={`group relative cursor-pointer transition-all duration-300 ${
                    active ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  {/* Role Card */}
                  <div
                    className={`relative p-6 rounded-2xl h-full transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-br from-primary to-primary-600 text-white shadow-2xl shadow-primary/30'
                        : 'bg-white dark:bg-dark-100 border border-gray-100 dark:border-dark-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10'
                    }`}
                  >
                    {/* Selected Badge */}
                    {active && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                        active
                          ? 'bg-white/20'
                          : `bg-gradient-to-br ${role.gradient}`
                      }`}
                    >
                      <Icon className={`w-7 h-7 ${active ? 'text-white' : 'text-white'}`} />
                    </div>

                    {/* Role Name */}
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        active ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {role.label}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed ${
                        active ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {role.description}
                    </p>

                    {/* Arrow Icon */}
                    <div
                      className={`absolute bottom-4 right-4 transition-transform duration-300 group-hover:translate-x-1 ${
                        active ? 'text-white' : 'text-primary'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </div>

                    {/* Hover Effect */}
                    {!active && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary-600/0 group-hover:from-primary/[0.03] group-hover:to-primary-600/[0.03] transition-all duration-300" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <GlassCard className="!p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-200 flex items-center justify-center mx-auto mb-4">
              <Settings className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Rollar topilmadi
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Hozircha rollar mavjud emas
            </p>
          </GlassCard>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <GlassCard className="!p-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Tizim faol</span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-dark-200 hidden sm:block"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {roles.length} ta rol mavjud
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-dark-200 hidden sm:block"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tanlangan rol: {selectedRole || 'Tanlanmagan'}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      {page}
    </DynamicProviders>
  );
};

export default Page;
