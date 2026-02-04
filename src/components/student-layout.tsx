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
  IoChevronDownOutline,
  IoSparklesOutline
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
  gradient?: string;
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

  // Menu items with enhanced gradients
  const menuItems: MenuItem[] = [
    { 
      icon: <IoHomeOutline />, 
      label: 'Bosh sahifa', 
      path: '/student', 
      gradient: 'from-blue-600 via-blue-500 to-cyan-500'
    },
    { 
      icon: <IoBookOutline />, 
      label: 'Mening kurslarim', 
      path: '/student/courses', 
      badge: 3,
      gradient: 'from-purple-600 via-purple-500 to-pink-500'
    },
    { 
      icon: <IoTrophyOutline />, 
      label: 'Topshiriqlar', 
      path: '/student/assignments', 
      badge: 5,
      gradient: 'from-orange-600 via-orange-500 to-red-500'
    },
    { 
      icon: <IoCalendarOutline />, 
      label: 'Tadbirlar', 
      path: '/student/events',
      gradient: 'from-green-600 via-green-500 to-emerald-500'
    },
    { 
      icon: <IoBookmarkOutline />, 
      label: 'Saqlangan', 
      path: '/student/bookmarks',
      gradient: 'from-yellow-600 via-yellow-500 to-amber-500'
    },
    { 
      icon: <IoStatsChartOutline />, 
      label: 'Progress', 
      path: '/student/progress',
      gradient: 'from-teal-600 via-teal-500 to-cyan-500'
    },
    { 
      icon: <IoWalletOutline />, 
      label: 'Coin', 
      path: '/student/coins', 
      badge: user?.coins,
      gradient: 'from-indigo-600 via-indigo-500 to-purple-500'
    },
    { 
      icon: <IoCartOutline />, 
      label: 'Do\'kon', 
      path: '/student/shop',
      gradient: 'from-pink-600 via-pink-500 to-rose-500'
    },
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
    <div className={`min-h-screen relative overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
        }`}>
          {/* Animated Orbs */}
          <div className={`absolute top-0 -left-4 w-72 h-72 ${
            isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
          } rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}></div>
          <div className={`absolute top-0 -right-4 w-72 h-72 ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
          } rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
          <div className={`absolute -bottom-8 left-20 w-72 h-72 ${
            isDarkMode ? 'bg-pink-600' : 'bg-pink-400'
          } rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}></div>
        </div>
      </div>

      {/* Glassmorphic Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-500 ease-out ${
          sidebarOpen ? 'w-72' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className={`h-full flex flex-col ${
          isDarkMode 
            ? 'bg-gray-900/40 backdrop-blur-2xl border-r border-white/5' 
            : 'bg-white/60 backdrop-blur-2xl border-r border-white/20'
        } shadow-2xl`}>
          {/* Logo Section */}
          <div className="relative p-6 border-b border-white/10">
            <Link href="/student" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all duration-300 group-hover:scale-105">
                  <IoSparklesOutline className="text-white text-2xl" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              </div>
              {sidebarOpen && (
                <div>
                  <span className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'} block`}>
                    Academy
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Student Portal
                  </span>
                </div>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`absolute top-1/2 -right-4 transform -translate-y-1/2 lg:flex hidden items-center justify-center w-8 h-8 rounded-full border-0 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border-white/10' 
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              } shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <IoMenuOutline className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4">
            <div className={`relative overflow-hidden rounded-2xl p-4 ${
              isDarkMode
                ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80'
                : 'bg-gradient-to-br from-white to-blue-50'
            } backdrop-blur-xl border ${
              isDarkMode ? 'border-white/5' : 'border-white/40'
            } shadow-lg transition-all duration-300`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-white font-bold text-xl">
                      {user?.firstName?.[0] || 'S'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-gray-900 rounded-full animate-pulse"></div>
                </div>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.firstName || 'Student'} {user?.lastName || ''}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                        <IoWalletOutline className="w-3.5 h-3.5 text-yellow-500" />
                        <span className="text-xs font-bold text-yellow-500">
                          {user?.coins || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                    active
                      ? 'text-white shadow-xl'
                      : isDarkMode
                      ? 'text-gray-400 hover:bg-gray-800/60 hover:text-white'
                      : 'text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-md'
                  }`}
                >
                  {/* Active background gradient */}
                  {active && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-100`}></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full`}></div>
                    </>
                  )}
                  <div className={`relative text-xl`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <>
                      <span className="relative flex-1 font-semibold">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <div className={`relative px-2.5 py-1 text-xs font-bold rounded-lg ${
                          active
                            ? 'bg-white/30 text-white backdrop-blur-sm'
                            : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30'
                        } animate-pulse`}>
                          {item.badge}
                        </div>
                      )}
                    </>
                  )}
                  {!sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-white/10 space-y-2">
            <Link
              href="/student/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-0 transition-all duration-300 ${
                isDarkMode
                  ? 'text-gray-400 hover:bg-gray-800/60 hover:text-white'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:shadow-md'
              }`}
            >
              <IoSettingsOutline className="text-xl" />
              {sidebarOpen && <span className="font-semibold">Sozlamalar</span>}
            </Link>
            <button
              onClick={() => {
                setUser(null);
                router.push('/login');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-0 transition-all duration-300 ${
                isDarkMode
                  ? 'text-red-400 hover:bg-red-500/20'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <IoLogOutOutline className="text-xl" />
              {sidebarOpen && <span className="font-semibold">Chiqish</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-500 ease-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Glassmorphic Header */}
        <header className={`sticky top-0 z-30 ${
          isDarkMode
            ? 'bg-gray-900/40 border-b border-white/5'
            : 'bg-white/40 border-b border-white/20'
        } backdrop-blur-2xl shadow-lg`}>
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-3 rounded-xl border-0 transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-white/60'
                }`}
              >
                {mobileMenuOpen ? (
                  <IoCloseOutline className="w-6 h-6" />
                ) : (
                  <IoMenuOutline className="w-6 h-6" />
                )}
              </button>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                  {title || 'Dashboard'}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Xush kelibsiz, {user?.firstName}! 👋
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`relative p-3 rounded-xl border-0 transition-all duration-300 hover:scale-105 group ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white/60 hover:bg-white'
                } shadow-lg`}
              >
                <div className="relative">
                  {isDarkMode ? (
                    <IoSunnyOutline className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <IoMoonOutline className="w-5 h-5 text-blue-600" />
                  )}
                  <div className={`absolute inset-0 rounded-full blur-md ${
                    isDarkMode ? 'bg-yellow-500' : 'bg-blue-600'
                  } opacity-30 group-hover:opacity-60 transition-opacity duration-300`}></div>
                </div>
              </button>

              {/* Notifications */}
              <button className={`relative p-3 rounded-xl border-0 transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white/60 hover:bg-white'
              } shadow-lg group`}>
                <IoNotificationsOutline className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-0 transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700'
                      : 'bg-white/60 hover:bg-white'
                  } shadow-lg`}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-white font-bold text-sm">
                      {user?.firstName?.[0] || 'S'}
                    </span>
                  </div>
                  <IoChevronDownOutline className={`w-4 h-4 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl overflow-hidden ${
                    isDarkMode ? 'bg-gray-800/95 border border-white/10' : 'bg-white/95 border border-white/20'
                  } backdrop-blur-2xl animate-scale-in`}>
                    <Link
                      href="/student/profile"
                      className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <IoPersonOutline className="text-lg" />
                      <span className="font-medium">Profil</span>
                    </Link>
                    <Link
                      href="/student/settings"
                      className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <IoSettingsOutline className="text-lg" />
                      <span className="font-medium">Sozlamalar</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
});

export default StudentLayout;
