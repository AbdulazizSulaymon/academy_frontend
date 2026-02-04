import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
  IoNotificationsOutline,
  IoPersonOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoChevronDownOutline
} from 'react-icons/io5';
import { observer } from 'mobx-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
  color?: string;
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

  // Menu items for student
  const menuItems: MenuItem[] = [
    { icon: <IoHomeOutline />, label: 'Bosh sahifa', path: '/student', color: 'from-blue-500 to-cyan-500' },
    { icon: <IoBookOutline />, label: 'Mening kurslarim', path: '/student/courses', badge: 3, color: 'from-purple-500 to-pink-500' },
    { icon: <IoTrophyOutline />, label: 'Topshiriqlar', path: '/student/assignments', badge: 5, color: 'from-orange-500 to-red-500' },
    { icon: <IoCalendarOutline />, label: 'Tadbirlar', path: '/student/events', color: 'from-green-500 to-emerald-500' },
    { icon: <IoBookmarkOutline />, label: 'Saqlangan', path: '/student/bookmarks', color: 'from-yellow-500 to-amber-500' },
    { icon: <IoStatsChartOutline />, label: 'Progress', path: '/student/progress', color: 'from-teal-500 to-cyan-500' },
    { icon: <IoWalletOutline />, label: 'Coin', path: '/student/coins', badge: user?.coins, color: 'from-indigo-500 to-purple-500' },
    { icon: <IoCartOutline />, label: 'Do\'kon', path: '/student/shop', color: 'from-pink-500 to-rose-500' },
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
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className={`h-full flex flex-col ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border-r border-gray-700' 
            : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 border-r border-gray-200'
        } backdrop-blur-xl`}>
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/30">
            <Link href="/student" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              {sidebarOpen && (
                <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Academy
                </span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:flex hidden p-2 rounded-lg border-0 ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <IoMenuOutline className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-700/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {user?.firstName?.[0] || 'S'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user?.firstName || 'Student'} {user?.lastName || ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <IoWalletOutline className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-500">
                      {user?.coins || 0} coin
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                      : 'text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-md'
                  }`}
                >
                  <div className={`text-xl ${active ? 'text-white' : ''}`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                          active
                            ? 'bg-white/20 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {!sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Settings & Logout */}
          <div className="p-3 border-t border-gray-700/30 space-y-1">
            <Link
              href="/student/settings"
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  : 'text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-md'
              }`}
            >
              <IoSettingsOutline className="text-xl" />
              {sidebarOpen && <span className="font-medium">Sozlamalar</span>}
            </Link>
            <button
              onClick={() => {
                setUser(null);
                router.push('/login');
              }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border-0 transition-all duration-200 ${
                isDarkMode
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <IoLogOutOutline className="text-xl" />
              {sidebarOpen && <span className="font-medium">Chiqish</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className={`sticky top-0 z-30 ${
          isDarkMode
            ? 'bg-gray-800/80 border-b border-gray-700'
            : 'bg-white/80 border-b border-gray-200'
        } backdrop-blur-xl`}>
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg border-0 ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                {mobileMenuOpen ? (
                  <IoCloseOutline className="w-6 h-6" />
                ) : (
                  <IoMenuOutline className="w-6 h-6" />
                )}
              </button>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {title || 'Dashboard'}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Xush kelibsiz! 👋
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg border-0 transition-all ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {isDarkMode ? (
                  <IoSunnyOutline className="w-5 h-5" />
                ) : (
                  <IoMoonOutline className="w-5 h-5" />
                )}
              </button>

              {/* Notifications */}
              <button className={`relative p-2.5 rounded-lg border-0 transition-all ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                <IoNotificationsOutline className="w-5 h-5" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border-0 transition-all ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.firstName?.[0] || 'S'}
                    </span>
                  </div>
                  <IoChevronDownOutline className="w-4 h-4" />
                </button>

                {profileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  } overflow-hidden`}>
                    <Link
                      href="/student/profile"
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <IoPersonOutline />
                      <span>Profil</span>
                    </Link>
                    <Link
                      href="/student/settings"
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <IoSettingsOutline />
                      <span>Sozlamalar</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
});

export default StudentLayout;
