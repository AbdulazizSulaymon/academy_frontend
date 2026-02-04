import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillShop, AiOutlineComment, AiOutlineFileZip, AiOutlineShop } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { BsFillChatSquareTextFill } from 'react-icons/bs';
import { FaRegNewspaper } from 'react-icons/fa';
import { GoServer } from 'react-icons/go';
import { HiOutlineNewspaper, HiUsers } from 'react-icons/hi';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineChat, MdOutlineMonitor } from 'react-icons/md';
import { PiMonitorFill, PiNotebookBold, PiPlugs } from 'react-icons/pi';
import { TbUserPentagon } from 'react-icons/tb';

import { Menus } from '@src/widgets/dashboard-layout/index';

export const useAdminMenus = () => {
  const { t } = useTranslation();

  const menuItems: Menus = useMemo(
    () => [
      {
        key: '/',
        icon: <BiHome />,
        label: t('Dashboard') || '',
        children: [
          { key: '/dashboard', label: t('Dashboard') || '' },
          { key: '/dashboard/github', label: t('Github') || '' },
        ],
      },
      {
        key: 'user-management',
        icon: <HiOutlineUsers />,
        label: t('Foydalanuvchilar') || '',
        children: [
          { key: 'users', label: t('Foydalanuvchilar') || '' },
          { key: 'roles', label: t('Roles') || '' },
          { key: 'roles-tree', label: t('Roles Tree') || 'Roles Tree' },
          { key: 'departments', label: t('Departments') || '' },
          { key: 'positions', label: t('Positions') || '' },
        ],
      },
      {
        key: 'sellers',
        icon: <AiOutlineShop />,
        label: t('Sellers') || '',
        children: [
          { key: 'shops', label: t('Shops') || '' },
          { key: 'sellers', label: t('Sellers') || '' },
          { key: 'top-sellers', label: t('Top Sellers') || '' },
          { key: 'subscriptions', label: t('Subscriptions') || '' },
          { key: 'transactions', label: t('Subscription Transactions') || '' },
          { key: 'plans', label: t('Subscription Plans') || '' },
        ],
      },
      {
        key: 'partners',
        icon: <TbUserPentagon />,
        label: t('Partners') || '',
        children: [
          { key: 'partners', label: t('Partnerlar') },
          { key: 'promo-codes', label: t('Promo Kodlar') || '' },
        ],
      },
      {
        key: 'leads',
        icon: <HiUsers />,
        label: t('Leads') || '',
      },
      {
        key: 'integration',
        icon: <PiPlugs />,
        label: t('Integratsiya') || '',
        children: [{ key: 'smartup', label: t('Smartup') || '' }],
      },
      {
        key: 'chat',
        icon: <MdOutlineChat />,
        label: t('Chat') || '',
        children: [{ key: 'group', label: t('Guruhlar') || '' }],
      },
      {
        key: 'notes',
        icon: <PiNotebookBold />,
        label: t('Eslatmalarim') || '',
      },
      {
        key: 'suggestions',
        icon: <AiOutlineComment />,
        label: t('Taklif va shikoyatlar') || '',
      },
      {
        key: 'notifications',
        icon: <IoNotificationsOutline />,
        label: t('Notifications') || '',
      },
      {
        key: 'files',
        icon: <AiOutlineFileZip />,
        label: t('Uploaded Files') || '',
      },
      {
        key: 'uploads-transfer',
        icon: <AiOutlineFileZip />,
        label: t('Uploads transfer') || 'Uploads transfer',
      },

      {
        key: 'app-control',
        icon: <GoServer />,
        label: t('App Control') || '',
        children: [
          { key: 'server', label: t('Server') || '' },
          { key: 'error-logs', label: t('Error Logs') || '' },
        ],
      },
      {
        key: 'about-project',
        icon: <MdOutlineMonitor />,
        label: t('Loyiha haqida') || '',
      },
      {
        key: 'new-design',
        icon: <PiMonitorFill />,
        label: t('Yangi dizayn') || '',
      },
    ],
    [t],
  );

  return menuItems;
};
