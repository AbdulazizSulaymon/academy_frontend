import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiHome } from 'react-icons/bi';
import { MdDiscount, MdOutlineMonitor } from 'react-icons/md';
import { PiMonitorFill } from 'react-icons/pi';

import { Menus } from '@src/widgets/dashboard-layout/index';

export const usePartnersMenus = () => {
  const { t } = useTranslation();

  const menuItems: Menus = useMemo(
    () => [
      {
        key: 'dashboard',
        icon: <BiHome />,
        label: t('Dashboard') || '',
      },
      {
        key: 'about-project',
        icon: <MdOutlineMonitor />,
        label: t('Loyiha haqida') || '',
      },
      // ].filter((item) => (roleName === 'Delivery' && item.key === 'orders') || (roleName && roleName !== 'Delivery')),
    ],
    [t],
  );

  return menuItems;
};
