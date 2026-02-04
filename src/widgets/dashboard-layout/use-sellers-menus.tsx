import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillShop, AiFillShopping, AiTwotoneSetting } from 'react-icons/ai';
import { BiCategory, BiHome } from 'react-icons/bi';
import { BsBoxSeam, BsChatSquareText, BsFillCalendarMinusFill, BsFillChatSquareTextFill, BsShop } from 'react-icons/bs';
import { FcStatistics } from 'react-icons/fc';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { HiUsers } from 'react-icons/hi';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { MdOutlineMonitor, MdOutlineShoppingCart } from 'react-icons/md';
import { PiMonitorFill, PiNotebookBold, PiPlugs } from 'react-icons/pi';
import { TbTools, TbUsers } from 'react-icons/tb';

import { Menus } from '@src/widgets/dashboard-layout/index';

export const useSellersMenus = () => {
  const { t } = useTranslation();

  const menuItems: Menus = useMemo(
    () => [
      {
        key: 'dashboard',
        icon: <BiHome />,
        label: t('Dashboard') || '',
      },
      {
        key: 'my-shops',
        icon: <BsShop />,
        label: t('landingPage.adminList.myShops') || '',
        children: [
          { key: 'list-my-shops', label: t('landingPage.adminList.myShops') || '' },
          { key: 'banners', label: t('Banners') || '' },
        ],
      },
      {
        key: 'clients',
        icon: <TbUsers />,
        label: t('Mijozlar') || '',
        children: [
          { key: 'list-clients', label: t('Mijozlar') || '' },
          { key: 'admins', label: t('Adminlar') || 'Adminlar' },
          { key: 'top-clients', label: t('landingPage.adminList.clients.topCustomers') || '' },
        ],
      },
      {
        key: 'orders',
        icon: <MdOutlineShoppingCart />,
        label: t('landingPage.adminList.order') || '',
      },
      {
        key: 'categories',
        icon: <BiCategory />,
        label: t('landingPage.adminList.category') || '',
      },
      {
        key: 'products',
        icon: <BsBoxSeam />,
        label: t('landingPage.adminList.product.title') || '',
        children: [
          { key: 'list-products', label: t('landingPage.adminList.product.title') || '' },
          { key: 'top-products', label: t('landingPage.adminList.product.topProducts') || '' },
          { key: 'discounted', label: t('landingPage.adminList.product.discount') || '' },
        ],
      },
      {
        key: 'user-management',
        icon: <HiOutlineUsers />,
        label: t('landingPage.adminList.management.title') || '',
        children: [
          { key: 'users', label: t('landingPage.adminList.management.employee') || '' },
          { key: 'departments', label: t('landingPage.adminList.management.department') || '' },
          { key: 'positions', label: t('landingPage.adminList.management.position') || '' },
        ],
      },
      {
        key: 'chat',
        icon: <BsChatSquareText />,
        label: t('landingPage.adminList.message') || '',
        path: '/chat',
      },
      {
        key: 'statistics',
        icon: <FcStatistics />,
        label: t('Statistika') || '',
        children: [{ key: 'order-statistics', label: t('landingPage.adminList.productSize') || '' }],
      },
      {
        key: 'integration',
        icon: <PiPlugs />,
        label: t('landingPage.adminList.integration.title') || '',
        children: [{ key: 'smartup', label: t('landingPage.adminList.integration.smartTup') || '' }],
      },
      {
        key: 'calendar',
        icon: <IoCalendarNumberOutline />,
        label: t('landingPage.adminList.date') || '',
      },
      {
        key: 'notes',
        icon: <PiNotebookBold />,
        label: t('landingPage.adminList.myNotes') || '',
      },
      {
        key: 'tools',
        icon: <TbTools />,
        label: t('landingPage.adminList.instrument.title') || '',
        children: [
          { key: 'white-board', label: t('landingPage.adminList.instrument.blackboard') || '' },
          { key: 'qr-code-generator', label: t('landingPage.adminList.instrument.qrCode') || '' },
        ],
      },
      // {
      //   key: 'settings',
      //   icon: <AiTwotoneSetting />,
      //   label: t('landingPage.adminList.setting.title') || '',
      //   children: [{ key: 'profile', label: t('landingPage.adminList.setting.profile') || '' }],
      // },
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
