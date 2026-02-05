import React, { ReactElement } from 'react';
import StudentLayout from '@src/components/student-layout';
import {
  Rocket,
  BookOpen,
  Trophy,
  Calendar,
  TrendingUp,
  Flame,
  Star,
  Clock,
  PlayCircle,
  ArrowRight,
  CheckCircle,
  Bookmark,
  Users,
} from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useCourseEnrollments } from '@src/queries/models/course-enrollment';
import { useEvents } from '@src/queries/models/event';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { DynamicProviders, StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';
import { GlassCard, BenefitCard } from '@/components/ui/card';
import { AcademyEventStatus } from '@api/academy-types';
import Link from 'next/link';
import { Paragraph } from '@/components/ui/typography';

const StudentDashboard: NextPageWithLayout = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();

  // Fetch enrolled courses with course data
  const { data: enrollmentsResponse, isLoading: isLoadingCourses } = useCourseEnrollments(
    {
      include: {
        course: {
          include: {
            category: true,
            mentor: true,
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
      },
      where: {
        userId: user?.id,
      },
      orderBy: {
        enrolledAt: 'desc',
      },
    },
    { enabled: !!user?.id },
  );

  const enrollments = get(enrollmentsResponse, 'data.data', []);

  // Extract courses from enrollments
  const courses = enrollments.map((enrollment: any) => enrollment.course);

  // Fetch upcoming events from API
  const { data: eventsResponse, isLoading: isLoadingEvents } = useEvents(
    {
      where: {
        status: AcademyEventStatus.Expected,
      },
      orderBy: {
        startDate: 'asc',
      },
      take: 5,
    },
    { enabled: true },
  );

  const events = get(eventsResponse, 'data.data', []);

  // Helper function to count total lessons from modules
  const getTotalLessons = (course: any) => {
    if (!course.modules) return 0;
    return course.modules.reduce((total: number, module: any) => {
      return total + (module.lessons?.length || 0);
    }, 0);
  };

  // Helper function to count published lessons from modules
  const getPublishedLessons = (course: any) => {
    if (!course.modules) return 0;
    return course.modules.reduce((total: number, module: any) => {
      return total + (module.lessons?.filter((l: any) => l.isPublished).length || 0);
    }, 0);
  };

  const stats = [
    {
      icon: BookOpen,
      label: 'Aktiv kurslar',
      value: String(courses.length || 0),
      change: `${courses.length || 0} kurs mavjud`,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Trophy,
      label: 'Topshiriqlar',
      value: '5',
      change: '3 pending',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: '68%',
      change: '+12% this week',
      gradient: 'from-green-500 to-green-600',
    },
    {
      icon: Flame,
      label: 'Streak',
      value: '12',
      change: 'days',
      gradient: 'from-yellow-500 to-yellow-600',
    },
  ];

  const recentAchievements = [
    {
      id: 1,
      title: 'Birinchi kursni tugatdingiz!',
      icon: Star,
      date: '2 kun oldin',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      id: 2,
      title: '10 ta topshiriq topshirdingiz',
      icon: Trophy,
      date: '5 kun oldin',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      title: '7 kunlik streak!',
      icon: Flame,
      date: '1 hafta oldin',
      gradient: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 min-h-[320px] shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={'/images/academy-hero.webp'}
            alt="Academy"
            className="w-full h-full object-cover opacity-20 object-top"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700/95 via-primary-500/80 to-primary-600/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm font-medium text-white/90">Online now</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Salom, {user?.firstName || 'Student'}! 👋
          </h1>
          <Paragraph className="text-base md:text-lg mb-8 max-w-2xl text-white/80 leading-relaxed">
            Bugun qanday yangi bilim egallashni xohlaysiz? Keling, o&apos;rganishni davom ettiramiz!
          </Paragraph>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 !shadow-xl !shadow-white/10">
              <Rocket className="w-5 h-5 flex-shrink-0" />
              <span>Kurslarni davom ettirish</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </PrimaryButton>
            <SecondaryButton className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
              Yangi kurs topish
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <BenefitCard
            key={stat.label}
            icon={stat.icon}
            title={stat.value}
            description={`${stat.label} • ${stat.change}`}
            gradient={stat.gradient}
            className="hover:scale-[1.02]"
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <div className="lg:col-span-2">
          <GlassCard className="!p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Aktiv kurslar</h2>
                <Paragraph className="text-sm text-gray-600 dark:text-gray-400">Davom ettirish uchun bosing</Paragraph>
              </div>
              <GhostButton>
                Barchasini ko'rish <ArrowRight className="w-4 h-4 ml-1" />
              </GhostButton>
            </div>

            <div className="space-y-4">
              {isLoadingCourses ? (
                <div className="text-center py-8">
                  <Paragraph className="text-gray-600 dark:text-gray-400">Kurslar yuklanmoqda...</Paragraph>
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-8">
                  <Paragraph className="text-gray-600 dark:text-gray-400">Hozircha kurslar yo&apos;q</Paragraph>
                </div>
              ) : (
                courses.map((course: any) => {
                  // Get course title based on language (default to Uzbek)
                  const title = course.titleUz || course.titleRu || course.titleEn || 'Kurs';
                  const categoryName =
                    course.category?.nameUz || course.category?.nameRu || course.category?.nameEn || 'Trading';
                  const mentorName =
                    `${course.mentor?.firstName || ''} ${course.mentor?.lastName || ''}`.trim() || 'Mentor';
                  const totalLessons = getTotalLessons(course);
                  const publishedLessons = getPublishedLessons(course);

                  return (
                    <Link
                      key={course.id}
                      href={`/student/courses/${course.id}`}
                      className="block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/20"
                    >
                      <div className="flex gap-4 p-4">
                        {/* Course Image */}
                        <div className="relative flex-shrink-0">
                          <img
                            src={course.coverImage || '/images/course-placeholder.webp'}
                            alt={title}
                            className="w-32 h-24 object-cover rounded-xl shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <PlayCircle className="text-white w-12 h-12" />
                          </div>
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-lg mb-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400">
                                {categoryName}
                              </span>
                              <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
                                {title}
                              </h3>
                            </div>
                            <button className="inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 flex-shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                              <Bookmark className="w-5 h-5" />
                            </button>
                          </div>
                          <Paragraph className="text-sm mb-3 text-gray-600 dark:text-gray-400">by {mentorName}</Paragraph>

                          <div className="flex items-center gap-4 text-sm mb-3">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {publishedLessons}/{totalLessons} dars
                              </span>
                            </div>
                            <div className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {course.level || 'All Levels'}
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary-600 rounded-full transition-all duration-500 shadow-lg shadow-primary/30"
                              style={{ width: `0%` }}
                            />
                          </div>

                          <Paragraph className="text-xs mt-2 text-gray-500 dark:text-gray-500">
                            {course.duration ? `${Math.floor(course.duration / 60)} soat` : ''}
                          </Paragraph>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <GlassCard className="!p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary-600/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Yaqin tadbirlar</h3>
            </div>

            <div className="space-y-3">
              {isLoadingEvents ? (
                <div className="text-center py-8">
                  <Paragraph className="text-gray-600 dark:text-gray-400">Tadbirlar yuklanmoqda...</Paragraph>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-8">
                  <Paragraph className="text-gray-600 dark:text-gray-400">Hozircha tadbirlar yo&apos;q</Paragraph>
                </div>
              ) : (
                events.map((event: any) => {
                  // Format date and time from API response
                  const eventDate = new Date(event.startDate);
                  const formattedDate = eventDate.toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  });
                  const formattedTime = eventDate.toLocaleTimeString('uz-UZ', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={event.id}
                      className="p-4 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Paragraph className="font-semibold text-sm text-gray-900 dark:text-white">
                          {event.titleUz || event.titleRu || event.titleEn || 'Tadbir'}
                        </Paragraph>
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-md flex-shrink-0 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                          {event.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs mb-2">
                        <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {formattedDate} • {formattedTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, event.participantCount || 0))].map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 border-2 border-white dark:border-gray-800"
                            ></div>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-500">{event.participantCount || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </GlassCard>

          {/* Recent Achievements */}
          <GlassCard className="!p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary-600/10">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Yutuqlar</h3>
            </div>

            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/20"
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 bg-gradient-to-br ${achievement.gradient} shadow-lg`}
                  >
                    <achievement.icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Paragraph className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">{achievement.title}</Paragraph>
                    <Paragraph className="text-xs text-gray-500">{achievement.date}</Paragraph>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
});

StudentDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Dashboard">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default StudentDashboard;
