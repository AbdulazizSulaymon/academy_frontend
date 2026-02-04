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
  IoTimeOutline
} from 'react-icons/io5';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';

const StudentDashboard = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();

  // Sample data - backend'dan kelishi kerak
  const stats = [
    {
      icon: <IoBookOutline />,
      label: 'Aktiv kurslar',
      value: '3',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: <IoTrophyOutline />,
      label: 'Topshiriqlar',
      value: '5',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: <IoTrendingUpOutline />,
      label: 'Progress',
      value: '68%',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: <IoFlameOutline />,
      label: 'Streak',
      value: '12 kun',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
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
    },
    {
      id: 2,
      title: 'React Advanced Patterns',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      lessons: 32,
      completed: 14,
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      lessons: 28,
      completed: 8,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      date: '2026-02-10',
      time: '18:00',
      type: 'Online',
    },
    {
      id: 2,
      title: 'JavaScript Q&A Session',
      date: '2026-02-12',
      time: '19:00',
      type: 'Online',
    },
  ];

  const recentAchievements = [
    { id: 1, title: 'Birinchi kursni tugatdingiz!', icon: <IoStarOutline />, date: '2 kun oldin' },
    { id: 2, title: '10 ta topshiriq topshirdingiz', icon: <IoTrophyOutline />, date: '5 kun oldin' },
    { id: 3, title: '7 kunlik streak!', icon: <IoFlameOutline />, date: '1 hafta oldin' },
  ];

  return (
    <StudentLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className={`relative overflow-hidden rounded-2xl p-8 ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
        }`}>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Salom, {user?.firstName || 'Student'}! 👋
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Bugun qanday o'rganishni xohlaysiz?
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 border-0">
                <div className="flex items-center gap-2">
                  <IoRocketOutline className="text-xl" />
                  <span>Kurslarni davom ettirish</span>
                </div>
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/30">
                Yangi kurs topish
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl p-6 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              } hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Courses */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Aktiv kurslar
                </h2>
                <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold border-0 bg-transparent">
                  Barchasini ko'rish
                </button>
              </div>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`group relative overflow-hidden rounded-xl p-4 ${
                      isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                    } transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold mb-2 group-hover:text-blue-500 transition-colors ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            {course.completed}/{course.lessons} dars
                          </span>
                          <span className="text-green-500 font-semibold">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <IoCalendarOutline className="text-xl text-blue-500" />
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Yaqin tadbirlar
                </h3>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-xl ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'
                    } border border-blue-200/50`}
                  >
                    <p className={`font-semibold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <IoTimeOutline className="text-blue-500" />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {event.date} • {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <IoTrophyOutline className="text-xl text-yellow-500" />
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Yutuqlar
                </h3>
              </div>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-start gap-3 p-3 rounded-xl ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-yellow-50'
                    }`}
                  >
                    <div className="text-yellow-500 text-xl">
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
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
