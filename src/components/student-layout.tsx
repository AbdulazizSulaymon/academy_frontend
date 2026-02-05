import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Dropdown } from 'antd';
import {
  IoHomeOutline,
  IoBookOutline,
  IoTrophyOutline,
  IoWalletOutline,
  IoCartOutline,
  IoCalendarOutline,
  IoBookmarkOutline,
  IoStatsChartOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoPersonOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoChevronDownOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { observer } from 'mobx-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { useCheckRoles } from '@hooks/use-check-roles';
import { useApi } from '@src/api';
import { useTranslation } from 'react-i18next';
import { NotificationsDropdown } from '@components/notifications-dropdown';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

interface StudentLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const StudentLayout: React.FC<StudentLayoutProps> = observer(({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useLayoutStore();
  const { isDarkMode, toggleTheme } = useMyTheme();
  const { accessRoles } = useCheckRoles();
  const api = useApi();
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    { icon: <IoHomeOutline />, label: 'Bosh sahifa', path: '/student' },
    { icon: <IoBookOutline />, label: 'Mening kurslarim', path: '/student/courses', badge: 3 },
    { icon: <IoTrophyOutline />, label: 'Topshiriqlar', path: '/student/assignments', badge: 5 },
    { icon: <IoCalendarOutline />, label: 'Tadbirlar', path: '/student/events' },
    { icon: <IoBookmarkOutline />, label: 'Saqlangan', path: '/student/bookmarks' },
    { icon: <IoStatsChartOutline />, label: 'Progress', path: '/student/progress' },
    { icon: <IoWalletOutline />, label: 'Coin', path: '/student/coins', badge: user?.coins ?? 0 },
    { icon: <IoCartOutline />, label: "Do'kon", path: '/student/shop' },
  ];

  const isActive = (path: string) => {
    if (path === '/student') {
      return router.pathname === '/student';
    }
    return router.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-72' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div
          className={`h-full flex flex-col border-r ${
            isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}
        >
          {/* Logo Section */}
          <div className="relative p-6 border-b border-gray-200 dark:border-gray-800">
            <Link href="/student" className="flex items-center justify-start">
              <div className="relative flex-shrink-0">
                <img
                  src={isDarkMode ? '/logo/dark/logo.png' : '/logo/light/logo.png'}
                  alt="Academy Logo"
                  height={40}
                  className="rounded-xl object-cover"
                />
              </div>
            </Link>
          </div>

          {/* User Profile Card */}
          <div className="p-4">
            <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                      {user?.firstName?.[0] || 'S'}
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-gray-900 dark:border-gray-900 rounded-full"></div>
                </div>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.firstName || 'Student'} {user?.lastName || ''}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1.5">
                        <IoWalletOutline className="w-3.5 h-3.5 flex-shrink-0 text-yellow-500" />
                        <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 font-semibold">
                          {user?.coins ?? 0} coins
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-primary-600 text-white shadow-sm'
                      : `hover:bg-gray-50 dark:hover:bg-gray-800/50 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                  }`}
                >
                  <div
                    className={`w-5 h-5 flex items-center justify-center flex-shrink-0 text-base ${
                      active ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <>
                      <span
                        className={`flex-1 font-medium text-sm ${
                          active ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <div
                          className={`px-2 py-0.5 text-xs font-medium rounded-md flex-shrink-0 ${
                            active
                              ? 'bg-white/20 text-white'
                              : item.label === 'Coin'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-semibold'
                              : isDarkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {item.badge}
                        </div>
                      )}
                    </>
                  )}
                  {!sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
            <Link
              href="/student/settings"
              className="group relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 overflow-hidden"
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
                <IoSettingsOutline />
              </div>
              {sidebarOpen && (
                <span className="font-medium text-sm text-gray-700 dark:text-gray-300 relative z-10">Sozlamalar</span>
              )}
              <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </Link>
            <Button
              onClick={() => {
                api.logOut();
                setUser(null);
                router.push('/login');
              }}
              danger
              block
              icon={<IoLogOutOutline className="text-base" />}
              className={`!rounded-xl !font-medium ${sidebarOpen ? '!flex !items-center !gap-3' : '!w-10 !h-10'}`}
            >
              {sidebarOpen && 'Chiqish'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Header */}
        <header
          className={`sticky top-0 z-30 border-b ${
            isDarkMode
              ? 'bg-gray-900/95 backdrop-blur-sm border-gray-800'
              : 'bg-white/95 backdrop-blur-sm border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileMenuOpen(!mobileMenuOpen);
                  } else {
                    setSidebarOpen(!sidebarOpen);
                  }
                }}
                className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors border-0 ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                {(window.innerWidth < 1024 ? mobileMenuOpen : !sidebarOpen) ? (
                  <IoCloseOutline className="w-5 h-5" />
                ) : (
                  <IoMenuOutline className="w-5 h-5" />
                )}
              </button>
              <div>
                <h1 className={`text-xl font-semibold mb-0 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {title || 'Dashboard'}
                </h1>
                <p className={`text-sm mb-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Xush kelibsiz, {user?.firstName}!
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors flex-shrink-0 border-0 ${
                  isDarkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isDarkMode ? <IoSunnyOutline className="w-5 h-5" /> : <IoMoonOutline className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <NotificationsDropdown />

              {/* Profile */}
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'profile',
                      icon: <IoPersonOutline className="text-base" />,
                      label: (
                        <Link href="/student/profile" className="flex items-center gap-3">
                          Profil
                        </Link>
                      ),
                    },
                    ...(accessRoles.length > 1
                      ? [
                          {
                            key: 'roles',
                            icon: <IoPeopleOutline className="text-base" />,
                            label: (
                              <Link href="/roles" className="flex items-center gap-3">
                                Rollar
                              </Link>
                            ),
                          },
                        ]
                      : []),
                    {
                      key: 'settings',
                      icon: <IoSettingsOutline className="text-base" />,
                      label: (
                        <Link href="/student/settings" className="flex items-center gap-3">
                          Sozlamalar
                        </Link>
                      ),
                    },
                  ],
                }}
                open={profileDropdownOpen}
                onOpenChange={setProfileDropdownOpen}
                trigger={['click']}
              >
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors flex-shrink-0 border-0 ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    {user?.firstName?.[0] || 'S'}
                  </span>
                </button>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-6">{children}</main>
      </div>
    </div>
  );
});

export default StudentLayout;
