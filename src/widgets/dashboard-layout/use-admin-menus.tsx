import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillShop, AiOutlineComment, AiOutlineFileZip, AiOutlineShop } from 'react-icons/ai';
import { BiHome, BiCategory } from 'react-icons/bi';
import { BsFillChatSquareTextFill } from 'react-icons/bs';
import { FaCalendarAlt, FaChalkboardTeacher, FaClipboardCheck, FaRegNewspaper } from 'react-icons/fa';
import { GoServer } from 'react-icons/go';
import { HiOutlineNewspaper, HiUsers } from 'react-icons/hi';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineChat, MdOutlineMonitor, MdShoppingBag, MdVideoLibrary } from 'react-icons/md';
import { PiMonitorFill, PiNotebookBold, PiPlugs, PiShoppingBag } from 'react-icons/pi';
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
        children: [{ key: '/dashboard', label: t('Dashboard') || '' }],
      },
      {
        key: 'user-management',
        icon: <HiOutlineUsers />,
        label: t('Foydalanuvchilar') || '',
        children: [
          { key: 'users', label: t('Foydalanuvchilar') || '' },
          { key: 'students', label: t('Talabalar') || 'Students' },
          { key: 'roles', label: t('Roles') || '' },
          { key: 'roles-tree', label: t('Roles Tree') || 'Roles Tree' },
        ],
      },
      {
        key: 'partners',
        icon: <TbUserPentagon />,
        label: t('Partners') || '',
        children: [{ key: 'partners', label: t('Partnerlar') }],
      },
      {
        key: 'leads',
        icon: <HiUsers />,
        label: t('Leads') || '',
      },
      {
        key: 'events',
        icon: <FaCalendarAlt />,
        label: t('Events') || '',
      },
      {
        key: 'assignments',
        icon: <FaClipboardCheck />,
        label: t('Assignments') || '',
        children: [
          { key: 'assignments-list', label: t('Topshiriqlar') || 'Assignments' },
          { key: 'user-assignments', label: t('Talaba topshiriqlari') || 'User Assignments' },
          { key: 'tasks-list', label: t('Vazifalar') || 'Tasks' },
        ],
      },
      {
        key: 'courses',
        icon: <BiCategory />,
        label: t('Kurslar') || '',
        children: [
          { key: 'course-categories', label: t('Kurs Toifalari') || 'Course Categories' },
          { key: 'courses', label: t('Kurslar') || 'Courses' },
          { key: 'mentors', label: t('Mentorlar') || 'Mentors' },
          { key: 'modules', label: t('Modullar') || 'Modules' },
          { key: 'lessons', label: t('Darslar') || 'Lessons' },
          { key: 'tests', label: t('Testlar') || 'Tests' },
          { key: 'questions', label: t('Savollar') || 'Questions' },
          { key: 'course-enrollments', label: t('Kursga yozilganlar') || 'Course Enrollments' },
        ],
      },
      {
        key: 'shop',
        icon: <PiShoppingBag />,
        label: t('Do' + 'kon') || '',
        children: [
          { key: 'shop-categories', label: t('Toifalar') || 'Shop Categories' },
          { key: 'products', label: t('Mahsulotlar') || 'Products' },
          { key: 'orders-list', label: t('Buyurtmalar') || 'Orders' },
        ],
      },
      // {
      //   key: 'chat',
      //   icon: <MdOutlineChat />,
      //   label: t('Chat') || '',
      //   children: [{ key: 'group', label: t('Guruhlar') || '' }],
      // },
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
