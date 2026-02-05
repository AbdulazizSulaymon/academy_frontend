import React, { ReactElement } from 'react';
import StudentLayout from '@src/components/student-layout';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  Star,
  ChevronRight,
  PlayCircle,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useCourses } from '@src/queries/models/course';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { Course } from '@api/academy-types';
import { Paragraph } from '@/components/ui/typography';

const CoursesPage: NextPageWithLayout = observer(() => {
  const { isDarkMode } = useMyTheme();

  // Fetch courses from backend
  const { data: coursesResponse, isLoading: isLoadingCourses } = useCourses(
    {
      include: {
        category: true,
        mentor: true,
        modules: {
          include: {
            lessons: true,
          },
        },
      },
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    },
    { enabled: true },
  );

  const courses = get(coursesResponse, 'data.data', []);

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

  // Calculate total duration from modules
  const getTotalDuration = (course: any) => {
    if (!course.modules) return 0;
    return course.modules.reduce((total: number, module: any) => {
      return (
        total +
        (module.lessons?.reduce((lessonTotal: number, lesson: any) => {
          return lessonTotal + (lesson.duration || 0);
        }, 0) || 0)
      );
    }, 0);
  };

  const categories = [
    { id: 'all', name: 'Barchasi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'trading', name: 'Trading', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'programming', name: 'Programming', icon: <Target className="w-4 h-4" /> },
    { id: 'design', name: 'Design', icon: <Filter className="w-4 h-4" /> },
  ];

  const levels = [
    { id: 'all', name: 'Barchasi' },
    { id: 'beginner', name: "Boshlang'ich" },
    { id: 'intermediate', name: "O'rtacha" },
    { id: 'advanced', name: 'Murakkab' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Kurslar katalogi</h1>
          <Paragraph className="text-gray-600 dark:text-gray-400">O'zishingizga mos kursni tanlang va o'rganingni boshlang</Paragraph>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-96">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
                isDarkMode
                  ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:border-gray-600 hover:shadow-gray-900/20'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300 hover:shadow-gray-200/50'
              }`}
            >
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Levels */}
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level.id}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                isDarkMode
                  ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:border-gray-600 hover:shadow-gray-900/20'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300 hover:shadow-gray-200/50'
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${
            isDarkMode
              ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:border-gray-600 hover:shadow-gray-900/20'
              : 'bg-white/80 backdrop-blur-sm border border-gray-200/60 text-gray-700 hover:bg-gray-50/80 hover:border-gray-300 hover:shadow-gray-200/50'
          }`}
        >
          <option value="newest">Yangi</option>
          <option value="popular">Mashhur</option>
          <option value="price-low">Narxi past</option>
          <option value="price-high">Narhi qimmat</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="!p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary-600/10`}
            >
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <Paragraph className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{courses.length}</Paragraph>
              <Paragraph className="text-xs text-gray-600 dark:text-gray-400 my-0">Jami kurslar</Paragraph>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="!p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10`}
            >
              <PlayCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <Paragraph className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {courses.reduce((sum: number, course: Course) => sum + getTotalDuration(course), 0)}
              </Paragraph>
              <Paragraph className="text-xs text-gray-600 dark:text-gray-400 py-0">Daqiqa</Paragraph>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="!p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10`}
            >
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <Paragraph className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {courses.reduce((sum: number, course: Course) => sum + (course.mentor?.totalStudents || 0), 0)}
              </Paragraph>
              <Paragraph className="text-xs text-gray-600 dark:text-gray-400 my-0">O'quvchilar</Paragraph>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="!p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/10`}
            >
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <Paragraph className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4.8</Paragraph>
              <Paragraph className="text-xs text-gray-600 dark:text-gray-400 my-0">Reyting</Paragraph>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Courses Grid */}
      {isLoadingCourses ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <Paragraph className="text-gray-600 dark:text-gray-400">Kurslar yuklanmoqda...</Paragraph>
          </div>
        </div>
      ) : courses.length === 0 ? (
        <GlassCard className="!p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <Paragraph className="text-gray-600 dark:text-gray-400 text-lg mb-2">Kurslar topilmadi</Paragraph>
          <Paragraph className="text-gray-500 dark:text-gray-500">Hozircha mavjud kurslar yo'q</Paragraph>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => {
            const title = course.titleUz || course.titleRu || course.titleEn || 'Kurs';
            const description = course.descriptionUz || course.descriptionRu || course.descriptionEn || '';
            const categoryName =
              course.category?.nameUz || course.category?.nameRu || course.category?.nameEn || 'Trading';
            const mentorName = `${course.mentor?.firstName || ''} ${course.mentor?.lastName || ''}`.trim() || 'Mentor';
            const totalLessons = getTotalLessons(course);
            const publishedLessons = getPublishedLessons(course);
            const totalDuration = getTotalDuration(course);
            const rating = course.mentor?.rating || 4.8;
            const totalStudents = course.mentor?.totalStudents || 0;

            return (
              <GlassCard
                key={course.id}
                className="!overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.coverImage || '/images/course-placeholder.webp'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
                      {categoryName}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <PlayCircle className="w-8 h-8 text-primary fill-current" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    {Math.floor(totalDuration / 60)} soat
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>

                  {/* Description */}
                  <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{description}</Paragraph>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                      <span className="font-medium">{rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{totalStudents} ta</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>
                        {publishedLessons}/{totalLessons} dars
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-xs font-semibold text-primary">0%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-600 rounded-full transition-all duration-500"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                  </div>

                  {/* Mentor */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                          {course.mentor?.firstName?.[0] || 'M'}
                        </span>
                      </div>
                      <div>
                        <Paragraph className="text-xs font-medium text-gray-900 dark:text-white">{mentorName}</Paragraph>
                        <Paragraph className="text-xs text-gray-500">Mentor</Paragraph>
                      </div>
                    </div>

                    <button
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-0 ${
                        isDarkMode
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      <span>Kursga yozilish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
});

CoursesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Kurslar">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default CoursesPage;
