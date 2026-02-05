import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import StudentLayout from '@src/components/student-layout';
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Settings,
  Bookmark,
  CheckCircle,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useLessons } from '@src/queries/models/lesson';
import { useBookmarks } from '@src/queries/models/bookmark';
import { useCreateBookmark, useDeleteBookmark } from '@src/queries/models/bookmark';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { message, Modal } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const LessonDetailPage: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Fetch lesson with module and course
  const { data: lessonResponse, isLoading: isLoadingLesson } = useLessons(
    {
      include: {
        module: {
          include: {
            course: true,
          },
        },
        bookmarks: {
          where: {
            userId: user?.id,
          },
        },
      },
      where: {
        id: id as string,
      },
    },
    { enabled: !!id },
  );

  const lesson = get(lessonResponse, 'data.data', []);

  // Fetch all lessons in this module for navigation
  const { data: moduleLessonsResponse } = useLessons(
    {
      where: {
        moduleId: lesson?.moduleId,
        isPublished: true,
      },
      orderBy: {
        order: 'asc',
      },
    },
    { enabled: !!lesson?.moduleId },
  );

  const moduleLessons = get(moduleLessonsResponse, 'data.data', []);

  // Check if lesson is bookmarked
  const existingBookmark = lesson?.bookmarks?.find((b: any) => b.userId === user?.id);

  // Create bookmark mutation
  const { createBookmark } = useCreateBookmark(
    {},
    {
      invalidateQueries: ['bookmarks', 'lessons'],
      successToast: t('Saqlanganlarga qo\'shildi'),
      errorToast: t("Xatolik sodir bo'ldi"),
    },
  );

  // Delete bookmark mutation
  const { deleteBookmark } = useDeleteBookmark(
    {},
    {
      invalidateQueries: ['bookmarks', 'lessons'],
      successToast: t('Saqlangandan olib tashlandi'),
      errorToast: t("Xatolik sodir bo'ldi"),
    },
  );

  // Handle bookmark toggle
  const handleToggleBookmark = () => {
    if (!user) {
      message.warning(t('Iltimos tizimga kiring'));
      return;
    }

    if (existingBookmark) {
      deleteBookmark({ where: { id: existingBookmark.id } });
    } else {
      createBookmark({
        data: {
          userId: user.id,
          lessonId: lesson.id,
        },
      });
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Navigate to next/previous lesson
  const currentLessonIndex = moduleLessons.findIndex((l: any) => l.id === lesson?.id);
  const previousLesson = currentLessonIndex > 0 ? moduleLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < moduleLessons.length - 1 ? moduleLessons[currentLessonIndex + 1] : null;

  const navigateToLesson = (lessonId: string) => {
    router.push(`/student/lessons/${lessonId}`);
  };

  if (isLoadingLesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GlassCard className="p-12 text-center">
          <Play className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('Dars topilmadi') || 'Dars topilmadi'}
          </h2>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Video Player */}
      <div className="relative bg-black aspect-video max-h-[70vh]">
        {lesson.videoUrl ? (
          <video
            className="w-full h-full"
            controls
            poster={lesson.videoThumbnail}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            {t('Sizning brauzeringiz video ni qollab-quvvatlamaydi')}
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-600">
            <Play className="w-24 h-24 text-white/80" />
          </div>
        )}

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer group">
            <div
              className="h-full bg-primary relative group-hover:bg-primary-600 transition-colors"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-primary transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-white hover:text-primary transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-primary transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>

              <button className="text-white hover:text-primary transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {lesson.module?.titleUz || lesson.module?.titleRu || lesson.module?.titleEn}
                    </span>
                    {lesson.isFree && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {t('Bepul') || 'Bepul'}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {lesson.titleUz || lesson.titleRu || lesson.titleEn}
                  </h1>

                  <p className="text-gray-600 dark:text-gray-400">
                    {lesson.descriptionUz || lesson.descriptionRu || lesson.descriptionEn}
                  </p>
                </div>

                <button
                  onClick={handleToggleBookmark}
                  className={`p-3 rounded-xl transition-all ${
                    existingBookmark
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${existingBookmark ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatTime(lesson.duration || 0)}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {lesson.module?.course?.titleUz || lesson.module?.course?.titleEn}
                </div>
              </div>
            </GlassCard>

            {/* Lesson Navigation */}
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {t("Modul darslari") || "Modul darslari"}
              </h2>

              <div className="space-y-2">
                {moduleLessons.map((moduleLesson: any, index: number) => (
                  <button
                    key={moduleLesson.id}
                    onClick={() => navigateToLesson(moduleLesson.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all ${
                      moduleLesson.id === lesson.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{moduleLesson.titleUz || moduleLesson.titleEn}</p>
                      <p className={`text-xs ${moduleLesson.id === lesson.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {formatTime(moduleLesson.duration || 0)}
                      </p>
                    </div>

                    {moduleLesson.id === lesson.id && (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <GlassCard className="p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                {t('Kurs haqida') || 'Kurs haqida'}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('Kurs')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {lesson.module?.course?.titleUz || lesson.module?.course?.titleEn}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('Modul')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {lesson.module?.titleUz || lesson.module?.titleEn}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{t('Davomiylik')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatTime(lesson.duration || 0)}
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Navigation */}
            <div className="flex gap-3">
              {previousLesson && (
                <SecondaryButton
                  className="flex-1"
                  onClick={() => navigateToLesson(previousLesson.id)}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {t('Oldingi')}
                </SecondaryButton>
              )}

              {nextLesson && (
                <PrimaryButton className="flex-1" onClick={() => navigateToLesson(nextLesson.id)}>
                  {t('Keyingi')}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LessonDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <StudentDynamicProviders>{page}</StudentDynamicProviders>;
};

export default LessonDetailPage;
