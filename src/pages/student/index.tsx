import React from 'react';
import StudentLayout from '@src/components/student-layout';
import { 
  IoRocketOutline, 
  IoBookOutline, 
  IoTrophyOutline,
  IoCalendarOutline,
  IoTrendingUpOutline,
  IoFlameOutline,
  IoStarOutline,
  IoTimeOutline,
  IoPlayCircleOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircleOutline
} from 'react-icons/io5';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';

const StudentDashboard = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();

  // Sample data
  const stats = [
    {
      icon: <IoBookOutline />,
      label: 'Aktiv kurslar',
      value: '3',
      change: '+2 this month',
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      icon: <IoTrophyOutline />,
      label: 'Topshiriqlar',
      value: '5',
      change: '3 pending',
      gradient: 'from-orange-600 via-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
    },
    {
      icon: <IoTrendingUpOutline />,
      label: 'Progress',
      value: '68%',
      change: '+12% this week',
      gradient: 'from-green-600 via-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
    },
    {
      icon: <IoFlameOutline />,
      label: 'Streak',
      value: '12',
      change: 'days',
      gradient: 'from-yellow-600 via-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-500/10 to-orange-500/10',
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
      lessons: 24,
      completed: 18,
      instructor: 'John Doe',
      nextLesson: 'Async/Await Patterns',
    },
    {
      id: 2,
      title: 'React Advanced Patterns',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      lessons: 32,
      completed: 14,
      instructor: 'Jane Smith',
      nextLesson: 'Custom Hooks Deep Dive',
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      lessons: 28,
      completed: 8,
      instructor: 'Mike Johnson',
      nextLesson: 'Database Integration',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      date: '2026-02-10',
      time: '18:00',
      type: 'Online',
      participants: 45,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 2,
      title: 'JavaScript Q&A Session',
      date: '2026-02-12',
      time: '19:00',
      type: 'Online',
      participants: 32,
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  const recentAchievements = [
    { 
      id: 1, 
      title: 'Birinchi kursni tugatdingiz!', 
      icon: <IoStarOutline />, 
      date: '2 kun oldin',
      gradient: 'from-yellow-500 to-orange-500',
    },
    { 
      id: 2, 
      title: '10 ta topshiriq topshirdingiz', 
      icon: <IoTrophyOutline />, 
      date: '5 kun oldin',
      gradient: 'from-purple-500 to-pink-500',
    },
    { 
      id: 3, 
      title: '7 kunlik streak!', 
      icon: <IoFlameOutline />, 
      date: '1 hafta oldin',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <StudentLayout title="Dashboard">
      <div className="space-y-6">
        {/* Hero Welcome Section */}
        <div className={`relative overflow-hidden rounded-3xl p-8 md:p-10 ${
          isDarkMode
            ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
            : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
        } shadow-2xl`}>
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">Online now</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
              Salom, {user?.firstName || 'Student'}! 👋
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
              Bugun qanday yangi bilim egallashni xohlaysiz? Keling, o'rganishni davom ettiramiz!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="group px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 flex items-center gap-3">
                <IoRocketOutline className="text-2xl" />
                <span>Kurslarni davom ettirish</span>
                <IoArrowForwardOutline className="text-xl group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-[1.02]">
                Yangi kurs topish
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-800/60 backdrop-blur-xl border border-white/5' 
                  : 'bg-white/60 backdrop-blur-xl border border-white/20'
              } hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <div className="text-3xl text-white">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Courses - Enhanced */}
          <div className="lg:col-span-2">
            <div className={`rounded-3xl p-6 ${
              isDarkMode 
                ? 'bg-gray-800/60 backdrop-blur-xl border border-white/5' 
                : 'bg-white/60 backdrop-blur-xl border border-white/20'
            } shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                    Aktiv kurslar
                  </h2>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Davom ettirish uchun bosing
                  </p>
                </div>
                <button className="text-sm text-blue-500 hover:text-blue-600 font-bold border-0 bg-transparent px-4 py-2 rounded-xl hover:bg-blue-500/10 transition-all">
                  Barchasini ko'rish →
                </button>
              </div>
              
              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`group relative overflow-hidden rounded-2xl ${
                      isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-white'
                    } transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.01]`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-4 p-4">
                      {/* Course Image */}
                      <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-32 h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                          <IoPlayCircleOutline className="text-white text-2xl drop-shadow-lg group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      
                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg mb-2 group-hover:text-blue-500 transition-colors ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {course.title}
                        </h3>
                        <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          by {course.instructor}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <div className="flex items-center gap-2">
                            <IoCheckmarkCircleOutline className="text-green-500" />
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {course.completed}/{course.lessons} dars
                            </span>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                            <span className="text-green-500 font-bold text-xs">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-lg"
                            style={{ width: `${course.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                          </div>
                        </div>
                        
                        <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Keyingi: {course.nextLesson}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events - Enhanced */}
            <div className={`rounded-3xl p-6 ${
              isDarkMode 
                ? 'bg-gray-800/60 backdrop-blur-xl border border-white/5' 
                : 'bg-white/60 backdrop-blur-xl border border-white/20'
            } shadow-xl`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                  <IoCalendarOutline className="text-xl text-white" />
                </div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Yaqin tadbirlar
                </h3>
              </div>
              
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`group relative overflow-hidden p-4 rounded-2xl ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'
                    } border border-blue-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${event.gradient} opacity-10 rounded-full blur-2xl`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {event.title}
                        </p>
                        <span className="px-2 py-1 text-xs font-bold bg-green-500/20 text-green-600 rounded-lg border border-green-500/30">
                          {event.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs mb-2">
                        <div className="flex items-center gap-1">
                          <IoTimeOutline className="text-blue-500" />
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            {event.date} • {event.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white"></div>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">+{event.participants} participants</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements - Enhanced */}
            <div className={`rounded-3xl p-6 ${
              isDarkMode 
                ? 'bg-gray-800/60 backdrop-blur-xl border border-white/5' 
                : 'bg-white/60 backdrop-blur-xl border border-white/20'
            } shadow-xl`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500">
                  <IoTrophyOutline className="text-xl text-white" />
                </div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Yutuqlar
                </h3>
              </div>
              
              <div className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className={`group relative overflow-hidden flex items-start gap-3 p-4 rounded-2xl ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-br from-yellow-50 to-orange-50'
                    } hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02]`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`relative p-3 rounded-xl bg-gradient-to-br ${achievement.gradient} shadow-lg group-hover:scale-105 transition-transform`}>
                      <div className="text-white text-xl">
                        {achievement.icon}
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
});

export default StudentDashboard;
