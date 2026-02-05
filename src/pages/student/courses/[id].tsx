import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import StudentLayout from '@src/components/student-layout';
import {
  PlayCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Award,
  Target,
  Calendar,
  User,
} from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useCourse } from '@src/queries/models/course';
import { useCourseEnrollments } from '@src/queries/models/course-enrollment';
import { useCreateCourseEnrollment } from '@src/queries/models/course-enrollment';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/typography';
import { Progress, Tag, Modal, message, Tabs } from 'antd';
import { getImagePath } from '@utils/util';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

const CourseDetailPage: NextPageWithLayout = observer(() => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('curriculum');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  // Fetch course with all related data
  const { data: courseResponse, isLoading: isLoadingCourse } = useCourse(
    {
      include: {
        category: true,
        mentor: true,
        modules: {
          include: {
            lessons: true,
          },
          where: {
            isPublished: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        enrollments: {
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

  const course = get(courseResponse, 'data') as any;

  // Check if user is enrolled
  const enrollment = course?.enrollments?.[0];
  const isEnrolled = !!enrollment;

  // Create enrollment mutation
  const { createCourseEnrollment, isPending: isEnrolling } = useCreateCourseEnrollment(
    {},
    {
      invalidateQueries: ['course-enrollments', 'courses'],
      successToast: t("Kursga muvaffaqiyatli yozildingiz"),
      errorToast: t("Xatolik sodir bo'ldi"),
    },
  );

  // Handle enrollment
  const handleEnroll = () => {
    if (!user) {
      message.warning(t('Iltimos tizimga kiring'));
      return;
    }

    if (course.price > 0 && (user?.coins || 0) < course.price) {
      message.error(t('Yetarli coin mavjud emas'));
      return;
    }

    Modal.confirm({
      title: t("Kursga yozilishni tasdiqlaysizmi?"),
      content: (
        <div>
          <Paragraph>{t('Kurs narxi')}: {course.price} 🪙</Paragraph>
          <Paragraph>{t('Sizning balancingiz')}: {user?.coins || 0} 🪙</Paragraph>
        </div>
      ),
      okText: t('Ha, yozilaman'),
      cancelText: t("Bekor qilish"),
      onOk: () => {
        createCourseEnrollment({
          data: {
            userId: user.id,
            courseId: course.id,
            progress: 0,
            isCompleted: false,
          },
        });
      },
    });
  };

  // Calculate course stats
  const totalLessons = course?.modules?.reduce((total: number, module: any) => {
    return total + (module.lessons?.filter((l: any) => l.isPublished).length || 0);
  }, 0);

  const totalDuration = course?.modules?.reduce((total: number, module: any) => {
    return (
      total +
      (module.lessons?.reduce((lessonTotal: number, lesson: any) => {
        return lessonTotal + (lesson.duration || 0);
      }, 0) || 0)
    );
  }, 0);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} ${t('soat')} ${minutes} ${t('daqiqа')}`;
    }
    return `${minutes} ${t('daqiqа')}`;
  };

  // Start lesson
  const handleStartLesson = (lesson: any) => {
    if (!isEnrolled) {
      message.warning(t('Avval kursga yoziling'));
      return;
    }
    router.push(`/student/lessons/${lesson.id}`);
  };

  if (isLoadingCourse) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GlassCard className="p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('Kurs topilmadi') || 'Kurs topilmadi'}
          </h2>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-600 p-8 text-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Tag className="mb-3 bg-white/20 text-white border-white/30">
                {course.category?.nameUz || course.category?.nameEn}
              </Tag>

              <h1 className="text-4xl font-bold mb-4">
                {course.titleUz || course.titleRu || course.titleEn}
              </h1>

              <Paragraph className="text-lg opacity-90 mb-6 max-w-3xl">
                {course.descriptionUz || course.descriptionRu || course.descriptionEn}
              </Paragraph>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(totalDuration)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{totalLessons} {t('dars')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span>{course.level || 'All Levels'}</span>
                </div>

                {course.mentor && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>
                      {course.mentor.firstName} {course.mentor.lastName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Course Image */}
            {course.coverImage && (
              <img
                src={getImagePath(course.coverImage)}
                alt={course.titleUz || course.titleEn}
                className="w-64 h-64 object-cover rounded-2xl shadow-2xl"
              />
            )}
          </div>

          {/* Enroll Button */}
          <div className="mt-8 flex items-center gap-4">
            {!isEnrolled ? (
              <PrimaryButton onClick={handleEnroll} loading={isEnrolling}>
                {course.price > 0 ? (
                  <>
                    <Award className="w-5 h-5 mr-2" />
                    {t('Kursga yozilish')} - {course.price} 🪙
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5 mr-2" />
                    {t('Bepul boshlash')}
                  </>
                )}
              </PrimaryButton>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex-1 max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">{t('Progress')}</span>
                    <span className="text-sm font-bold">{Math.round(enrollment.progress || 0)}%</span>
                  </div>
                  <Progress
                    percent={Math.round(enrollment.progress || 0)}
                    strokeColor="white"
                    trailColor="rgba(255,255,255,0.3)"
                    showInfo={false}
                  />
                </div>
                {enrollment.isCompleted && (
                  <Tag color="success" icon={<CheckCircle />}>
                    {t('Tugatilgan')}
                  </Tag>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab={t('Dastur') || 'Dastur'} key="curriculum">
                <div className="space-y-6">
                  {course?.modules?.map((module: any, moduleIndex: number) => (
                    <div key={module.id}>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">
                          {moduleIndex + 1}
                        </span>
                        {module.titleUz || module.titleRu || module.titleEn}
                      </h3>

                      <div className="space-y-2">
                        {module.lessons
                          ?.filter((l: any) => l.isPublished)
                          .map((lesson: any, lessonIndex: number) => (
                            <button
                              key={lesson.id}
                              onClick={() => handleStartLesson(lesson)}
                              className="w-full flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-left group"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                {lessonIndex + 1}
                              </span>

                              <div className="flex-1 min-w-0">
                                <Paragraph className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                                  {lesson.titleUz || lesson.titleRu || lesson.titleEn}
                                </Paragraph>
                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60)
                                      .toString()
                                      .padStart(2, '0')}
                                  </span>
                                  {lesson.isFree && (
                                    <Tag color="green" className="text-xs">
                                      {t('Bepul')}
                                    </Tag>
                                  )}
                                </div>
                              </div>

                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabPane>

              <TabPane tab={t('Haqida') || 'Haqida'} key="about">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t('Kurs haqida') || 'Kurs haqida'}
                    </h3>
                    <Paragraph className="text-gray-600 dark:text-gray-400">
                      {course.descriptionUz || course.descriptionRu || course.descriptionEn}
                    </Paragraph>
                  </div>

                  {course.mentor && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        {t('Mentor') || 'Mentor'}
                      </h3>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        {course.mentor.photo && (
                          <img
                            src={getImagePath(course.mentor.photo)}
                            alt={course.mentor.firstName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <Paragraph className="font-semibold text-gray-900 dark:text-white">
                            {course.mentor.firstName} {course.mentor.lastName}
                          </Paragraph>
                          <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
                            {course.mentor.specialization || course.mentor.bio}
                          </Paragraph>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t('Natijalar') || 'Natijalar'}
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{t('Kursni tugatgandan so\'ng sertifikat olish')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{t('Amaliy ko\'nikmalarni o\'zlashtirish')}</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{t('Portfolio uchun loyihalarni bajaring')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <GlassCard className="p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              {t('Kurs statistikasi') || 'Kurs statistikasi'}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('Modullar')}</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {course?.modules?.length || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('Darslar')}</span>
                <span className="font-bold text-gray-900 dark:text-white">{totalLessons}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('Davomiylik')}</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatDuration(totalDuration)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('Daraja')}</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {course.level || 'All Levels'}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Price */}
          {!isEnrolled && (
            <GlassCard className="p-6">
              <div className="text-center">
                <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('Kurs narxi')}</Paragraph>
                <Paragraph className="text-4xl font-bold text-primary mb-1">{course.price || 0}</Paragraph>
                <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-4">🪙 Coin</Paragraph>

                {course.price > 0 && (
                  <Paragraph className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {t('Sizning balancingiz')}: {user?.coins || 0} 🪙
                  </Paragraph>
                )}

                <PrimaryButton block onClick={handleEnroll} loading={isEnrolling}>
                  {t('Kursga yozilish')}
                </PrimaryButton>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
});

CourseDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Kurs detal">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default CourseDetailPage;
