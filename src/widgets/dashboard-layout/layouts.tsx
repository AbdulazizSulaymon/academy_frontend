import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ApiProvider, useApi } from '@src/api';
import { useLayoutStore } from '@src/stores/layout-store';
import { Props } from '@src/types';
import DashboardLayout from '@src/widgets/dashboard-layout/index';
import { useAdminMenus } from '@src/widgets/dashboard-layout/use-admin-menus';
import { useSellersMenus } from '@src/widgets/dashboard-layout/use-sellers-menus';

import { usePartnersMenus } from './use-partners-menus';

export type CustomLayoutProps = Props & {
  title?: string;
  withoutPadding?: boolean;
  happyWork?: boolean;
  breadcrumbItems?: BreadcrumbItemType[];
};

export const ProtectedLayout = ({ children }: Props) => {
  return <ApiProvider>{children}</ApiProvider>;
};

export const AdminLayout = ({ children, title, happyWork, breadcrumbItems, withoutPadding }: CustomLayoutProps) => {
  const menuItems = useAdminMenus();
  const { t } = useTranslation();

  return (
    <ProtectedLayout>
      <DashboardLayout
        title={title}
        menuItems={menuItems}
        startPath={'/admin'}
        footerTitle={t('admin-footer') || ''}
        happyWork={happyWork}
        breadcrumbItems={breadcrumbItems}
        withoutPadding={withoutPadding}
        role={'admin'}
      >
        {children}
      </DashboardLayout>
    </ProtectedLayout>
  );
};

export const PartnersLayout = ({ children, title, happyWork, breadcrumbItems, withoutPadding }: CustomLayoutProps) => {
  const menuItems = usePartnersMenus();
  const { t } = useTranslation();

  return (
    <ProtectedLayout>
      <DashboardLayout
        title={title}
        menuItems={menuItems}
        startPath={'/partner'}
        footerTitle={t(`Ishonchli hamkor - yaxshi do'st.`) || ''}
        happyWork={happyWork}
        breadcrumbItems={breadcrumbItems}
        withoutPadding={withoutPadding}
        role={'partner'}
      >
        {children}
      </DashboardLayout>
    </ProtectedLayout>
  );
};

export const SellersLayout = observer(
  ({ children, title, happyWork, breadcrumbItems, withoutPadding }: CustomLayoutProps) => {
    const menuItems = useSellersMenus();
    const { shopId, setShopId } = useLayoutStore();

    useEffect(() => {
      if (!shopId && localStorage.getItem('shopId')) setShopId(localStorage.getItem('shopId') as string);
    }, []);

    const { t } = useTranslation();

    return (
      <ProtectedLayout>
        <DashboardLayout
          title={title}
          menuItems={menuItems}
          startPath={'/shop'}
          footerTitle={t("Onlayn do'kon orqali sotuvlaringizni oshiring") || ''}
          happyWork={happyWork}
          breadcrumbItems={breadcrumbItems}
          withoutPadding={withoutPadding}
          role={'seller'}
        >
          {children}
        </DashboardLayout>
      </ProtectedLayout>
    );
  },
);
