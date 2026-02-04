import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { Button, Card, Input, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FaUserFriends, FaStore, FaUserShield } from 'react-icons/fa';
import { useCheckRoles } from '@hooks/use-check-roles';
import { ProtectedLayout } from '@src/widgets/dashboard-layout/layouts';
import { css } from '@emotion/react';
import { useMyTheme } from '@hooks/use-my-theme';

const Page: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isDarkMode } = useMyTheme();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { isAdmin, isPartner } = useCheckRoles();

  const roles = useMemo(() => {
    const items: Record<string, any>[] = [
      isPartner && {
        label: t('Partner'),
        value: 'partner',
        path: '/partner/dashboard',
        icon: <FaUserFriends size={28} />,
        description: t("Hamkorlar paneli") || "Hamkorlar paneli",
      },
      {
        label: t('Sotuvchi'),
        value: 'shop',
        path: '/shop/dashboard',
        icon: <FaStore size={28} />,
        description: t("Sotuvchi paneli") || "Sotuvchi paneli",
      },
      isAdmin && {
        label: t('Admin'),
        value: 'admin',
        path: '/admin/dashboard',
        icon: <FaUserShield size={28} />,
        description: t("Admin paneli") || "Admin paneli",
      },
    ].filter(Boolean) as Record<string, any>[];

    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((r) => String(r.label || '').toLowerCase().includes(q));
  }, [isAdmin, isPartner, search, t]);

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

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      css={css`
        background: ${isDarkMode
          ? 'radial-gradient(1200px 600px at 20% 20%, rgba(99, 102, 241, 0.18), transparent 55%), radial-gradient(900px 500px at 80% 30%, rgba(168, 85, 247, 0.16), transparent 55%), #0b0f19'
          : 'radial-gradient(1200px 600px at 20% 20%, rgba(59, 130, 246, 0.18), transparent 55%), radial-gradient(900px 500px at 80% 30%, rgba(168, 85, 247, 0.14), transparent 55%), #f8fafc'};
      `}
    >
      <div className="w-full max-w-4xl">
        <div className="mb-6 text-center">
          <Typography.Title level={2} className="!mb-1">
            {t('Rolni tanlang')}
          </Typography.Title>
          <Typography.Text type="secondary">
            {t('Quyidagi rollardan birini tanlang')}
          </Typography.Text>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('Qidiruv') as string}
            allowClear
            className="sm:max-w-[320px]"
          />

          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <Button onClick={() => router.back()}>{t('Ortga')}</Button>
            <Button type="primary" disabled={!selectedRole} onClick={handleNavigate}>
              {t("O'tish")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const active = selectedRole === role.value;
            return (
              <Card
                key={role.value}
                hoverable
                onClick={() => setSelectedRole(role.value)}
                className="rounded-2xl"
                css={css`
                  border: 1px solid ${active ? '#6366f1' : isDarkMode ? 'rgba(148, 163, 184, 0.18)' : '#e5e7eb'};
                  background: ${isDarkMode ? 'rgba(15, 23, 42, 0.55)' : 'rgba(255, 255, 255, 0.9)'};
                  backdrop-filter: blur(10px);
                  transition: 0.15s ease;

                  .ant-card-body {
                    padding: 18px;
                  }

                  ${active
                    ? `
                    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.25);
                    transform: translateY(-1px);
                  `
                    : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    css={css`
                      background: ${active ? '#6366f1' : isDarkMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.12)'};
                      color: ${active ? '#fff' : isDarkMode ? '#c7d2fe' : '#4338ca'};
                    `}
                  >
                    {role.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <Typography.Title level={4} className="!m-0 !text-base truncate">
                        {role.label}
                      </Typography.Title>
                      {active && (
                        <span
                          className="rounded-full px-2 py-1 text-[11px] font-semibold"
                          css={css`
                            background: ${isDarkMode ? 'rgba(99, 102, 241, 0.18)' : 'rgba(99, 102, 241, 0.12)'};
                            color: ${isDarkMode ? '#c7d2fe' : '#4338ca'};
                          `}
                        >
                          {t('Tanlangan')}
                        </span>
                      )}
                    </div>
                    <Typography.Paragraph className="!mb-0 !mt-1 text-sm" type="secondary" ellipsis={{ rows: 2 }}>
                      {role.description}
                    </Typography.Paragraph>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {!roles.length && (
          <div className="mt-6 text-center">
            <Typography.Text type="secondary">{t("Ma'lumot yoq")}</Typography.Text>
          </div>
        )}
      </div>
    </div>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <ProtectedLayout>{page}</ProtectedLayout>
    </DynamicProviders>
  );
};

export default Page;
