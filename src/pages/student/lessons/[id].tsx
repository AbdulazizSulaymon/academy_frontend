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
  Loader2,
  Trophy,
  XCircle,
} from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useLessons } from '@src/queries/models/lesson';
import { useBookmarks } from '@src/queries/models/bookmark';
import { useCreateBookmark, useDeleteBookmark } from '@src/queries/models/bookmark';
import { useGetTestForTaking, useStartTest, useSubmitTest } from '@src/queries/models/test';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/typography';
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
  const [testStarted, setTestStarted] = useState(false);
  const [userTestResultId, setUserTestResultId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

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

  const lesson = get(lessonResponse, 'data.data[0]', null);

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
    { enabled: !!lesson?.moduleId && !!lesson },
  );

  const moduleLessons = get(moduleLessonsResponse, 'data.data', []);

  // Check if lesson is bookmarked
  const existingBookmark = lesson?.bookmarks?.find((b: any) => b.userId === user?.id);

  // Create bookmark mutation
  const { createBookmark } = useCreateBookmark(
    {},
    {
      invalidateQueries: ['bookmarks', 'lessons'],
      successToast: t("Saqlanganlarga qo'shildi"),
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

  // Get test data for taking (without correct answers)
  const { data: testData, isLoading: isLoadingTest } = useGetTestForTaking(lesson?.testId || '', {
    enabled: !!lesson?.testId && testStarted,
  });

  const test = get(testData, 'data', null);

  // Start test mutation
  const { startTest, isLoading: isStartingTest } = useStartTest(
    {
      successToast: t('Test boshlandi') || 'Test boshlandi',
      errorToast: t('Testni boshlashda xatolik') || 'Testni boshlashda xatolik',
      onSuccess: (data: any) => {
        const result = data?.data;
        if (result) {
          setUserTestResultId(result.id);
          setTestStarted(true);
        }
      },
    },
    {},
  );

  // Submit test mutation
  const { submitTest, isLoading: isSubmittingTest } = useSubmitTest(
    {
      successToast: t('Test yakunlandi!') || 'Test yakunlandi!',
      errorToast: t('Testni topshirishda xatolik') || 'Testni topshirishda xatolik',
      onSuccess: (data: any) => {
        const result = data?.data;
        if (result) {
          setTestResult(result);
          setTestCompleted(true);
        }
      },
    },
    {},
  );

  // Handle starting test
  const handleStartTest = () => {
    if (!user) {
      message.warning(t('Iltimos tizimga kiring') || 'Iltimos tizimga kiring');
      return;
    }

    if (!lesson?.testId) {
      message.error(t('Test topilmadi') || 'Test topilmadi');
      return;
    }

    startTest({
      userId: user.id,
      testId: lesson.testId,
    });
  };

  // Handle answer selection
  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (test?.questions && currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle submit test
  const handleSubmitTest = () => {
    if (!userTestResultId) {
      message.error(t('Test natijasi topilmadi') || 'Test natijasi topilmadi');
      return;
    }

    const answers = Object.entries(selectedAnswers).map(([questionId, selectedOptionId]) => ({
      questionId,
      selectedOptionId,
    }));

    if (answers.length === 0) {
      message.warning(t('Iltimos, kamida bitta savolga javob bering') || 'Iltimos, kamida bitta savolga javob bering');
      return;
    }

    submitTest({
      userTestResultId,
      answers,
    });
  };

  // Calculate progress
  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = test?.questions?.length || 0;

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
      {/* Content Player - Video or Test */}
      {lesson.lessonType === 'TEST' ? (
        // Test Interface
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
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
            <Paragraph className="text-gray-600 dark:text-gray-400">
              {lesson.descriptionUz || lesson.descriptionRu || lesson.descriptionEn}
            </Paragraph>
          </div>

          {/* Test Interface */}
          <GlassCard className="p-8">
            {isLoadingTest || isStartingTest ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('Test yuklanmoqda...') || 'Test yuklanmoqda...'}
                </h2>
              </div>
            ) : testCompleted ? (
              // Test Result Screen
              <div className="space-y-6">
                <div className="text-center py-8">
                  {testResult?.passed ? (
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {testResult?.passed
                      ? t("Tabriklaymiz! Testni o'tdingiz") || "Tabriklaymiz! Testni o'tdingiz"
                      : t("Testni o'ta olmadingiz") || "Testni o'ta olmadingiz"}
                  </h2>
                  <div className="flex items-center justify-center gap-8 mt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{testResult?.score?.toFixed(1) || 0}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('Ball') || 'Ball'}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-500">
                        {testResult?.correctAnswers || 0}/{testResult?.totalQuestions || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {t("To'g'ri javoblar") || "To'g'ri javoblar"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result Actions */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <SecondaryButton onClick={() => window.location.reload()}>
                    {t('Asosiyga qaytish') || 'Asosiyga qaytish'}
                  </SecondaryButton>
                  {nextLesson && (
                    <PrimaryButton onClick={() => navigateToLesson(nextLesson.id)}>
                      {t('Keyingi dars') || 'Keyingi dars'}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </PrimaryButton>
                  )}
                </div>
              </div>
            ) : !testStarted ? (
              // Test Start Screen
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <CheckCircle className="w-16 h-16 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('Testni boshlashga tayyormisiz?') || 'Testni boshlashga tayyormisiz?'}
                </h2>
                <Paragraph className="text-gray-600 dark:text-gray-400">
                  {t('Testni boshlash uchun tugmani bosing. Natijalar saqlanadi.') ||
                    'Testni boshlash uchun tugmani bosing. Natijalar saqlanadi.'}
                </Paragraph>
                <PrimaryButton
                  className="!mt-4"
                  onClick={handleStartTest}
                  loading={isStartingTest}
                  disabled={isStartingTest}
                >
                  {isStartingTest ? t('Yuklanmoqda...') || 'Yuklanmoqda...' : t('Testni boshlash') || 'Testni boshlash'}
                </PrimaryButton>
              </div>
            ) : test?.questions && test.questions.length > 0 ? (
              // Test Questions Screen
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('Savol')} {currentQuestionIndex + 1} {t('dan')} {test.questions.length}
                  </h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                    {answeredCount}/{totalQuestions} {t('javob')}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-600 rounded-full transition-all duration-300"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  />
                </div>

                {/* Current Question */}
                {test.questions[currentQuestionIndex] && (
                  <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4 mb-6">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                        {currentQuestionIndex + 1}
                      </span>
                      <p className="text-gray-900 dark:text-white font-medium text-lg">
                        {test.questions[currentQuestionIndex].contentUz ||
                          test.questions[currentQuestionIndex].contentEn}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 ml-12">
                      {test.questions[currentQuestionIndex].options?.map((option: any) => {
                        const isSelected = selectedAnswers[test.questions[currentQuestionIndex].id] === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleSelectAnswer(test.questions[currentQuestionIndex].id, option.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5'
                            }`}
                          >
                            <span
                              className={`font-medium ${
                                isSelected ? 'text-primary' : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {option.contentUz || option.contentEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Test Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-3">
                    <SecondaryButton
                      onClick={() => {
                        setTestStarted(false);
                        setCurrentQuestionIndex(0);
                        setSelectedAnswers({});
                      }}
                    >
                      {t('Testni bekor qilish') || 'Testni bekor qilish'}
                    </SecondaryButton>
                  </div>
                  <div className="flex gap-3">
                    {currentQuestionIndex > 0 && (
                      <SecondaryButton onClick={handlePreviousQuestion}>
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        {t('Oldingi')}
                      </SecondaryButton>
                    )}
                    {currentQuestionIndex < test.questions.length - 1 ? (
                      <PrimaryButton onClick={handleNextQuestion}>
                        {t('Keyingi')}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton onClick={handleSubmitTest} loading={isSubmittingTest} disabled={isSubmittingTest}>
                        {isSubmittingTest
                          ? t('Yuborilmoqda...') || 'Yuborilmoqda...'
                          : t('Testni topshirish') || 'Testni topshirish'}
                      </PrimaryButton>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // No questions
              <div className="text-center py-12">
                <XCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('Test savollari mavjud emas') || 'Test savollari mavjud emas'}
                </h2>
                <Paragraph className="text-gray-600 dark:text-gray-400">
                  {t("Bu test hali tayyorlanmagan. Keyinroq urinib ko'ring.") ||
                    "Bu test hali tayyorlanmagan. Keyinroq urinib ko'ring."}
                </Paragraph>
              </div>
            )}
          </GlassCard>
        </div>
      ) : (
        // Video Player
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
        </div>
      )}

      {/* Content - Only for VIDEO lessons */}
      {lesson.lessonType !== 'TEST' && (
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

                    <Paragraph className="text-gray-600 dark:text-gray-400">
                      {lesson.descriptionUz || lesson.descriptionRu || lesson.descriptionEn}
                    </Paragraph>
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
                  {t('Modul darslari') || 'Modul darslari'}
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
                        <Paragraph className="font-medium line-clamp-1">
                          {moduleLesson.titleUz || moduleLesson.titleEn}
                        </Paragraph>
                        <Paragraph
                          className={`text-xs ${moduleLesson.id === lesson.id ? 'text-white/80' : 'text-gray-500'}`}
                        >
                          {formatTime(moduleLesson.duration || 0)}
                        </Paragraph>
                      </div>

                      {moduleLesson.id === lesson.id && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info */}
              <GlassCard className="p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t('Kurs haqida') || 'Kurs haqida'}</h3>

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
                  <SecondaryButton className="flex-1" onClick={() => navigateToLesson(previousLesson.id)}>
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
      )}
    </div>
  );
});

LessonDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Dars">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default LessonDetailPage;
