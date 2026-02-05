import React, { ReactElement } from 'react';
import StudentLayout from '@src/components/student-layout';
import {
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  Target,
  CheckCircle,
  Flame,
  Star,
  BarChart3,
} from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useCourseEnrollments } from '@src/queries/models/course-enrollment';
import { useUserAssignments } from '@src/queries/models/user-assignment';
import { useUserTasks } from '@src/queries/models/user-task';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { GlassCard, BenefitCard } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/typography';
import { Progress } from 'antd';
import { AssignmentStatus, TaskStatus } from '@api/academy-types';
import { useTranslation } from 'react-i18next';

const ProgressPage: NextPageWithLayout = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  // Fetch course enrollments
  const { data: enrollmentsResponse } = useCourseEnrollments(
    {
      include: {
        course: {
          include: {
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
    },
    { enabled: !!user?.id },
  );

  const enrollments = get(enrollmentsResponse, 'data.data', []);

  // Fetch user assignments
  const { data: userAssignmentsResponse } = useUserAssignments(
    {
      include: {
        assignment: true,
      },
      where: {
        userId: user?.id,
      },
    },
    { enabled: !!user?.id },
  );

  const userAssignments = get(userAssignmentsResponse, 'data.data', []);

  // Fetch user tasks
  const { data: userTasksResponse } = useUserTasks(
    {
      include: {
        task: true,
      },
      where: {
        userId: user?.id,
      },
    },
    { enabled: !!user?.id },
  );

  const userTasks = get(userTasksResponse, 'data.data', []);

  // Calculate stats
  const completedCourses = enrollments.filter((e: any) => e.isCompleted).length;
  const totalCourses = enrollments.length;
  const avgProgress =
    enrollments.length > 0
      ? enrollments.reduce((sum: number, e: any) => sum + (e.progress || 0), 0) / enrollments.length
      : 0;

  const gradedAssignments = userAssignments.filter(
    (ua: any) => ua.status === AssignmentStatus.Graded,
  ).length;
  const avgScore =
    userAssignments.length > 0
      ? userAssignments
          .filter((ua: any) => ua.score !== undefined)
          .reduce((sum: number, ua: any) => sum + (ua.score || 0), 0) /
        userAssignments.filter((ua: any) => ua.score !== undefined).length
      : 0;

  const completedTasks = userTasks.filter((ut: any) => ut.status === TaskStatus.Completed).length;

  // Calculate total study time (estimated based on lessons watched)
  const totalStudyMinutes = enrollments.reduce((total: number, enrollment: any) => {
    const course = enrollment.course;
    if (!course?.modules) return total;

    return (
      total +
      course.modules.reduce((moduleTotal: number, module: any) => {
        const watchedLessons = Math.floor((module.lessons?.length || 0) * (enrollment.progress / 100));
        return (
          moduleTotal +
          (module.lessons || [])
            .slice(0, watchedLessons)
            .reduce((lessonTotal: number, lesson: any) => lessonTotal + (lesson.duration || 0), 0)
        );
      }, 0)
    );
  }, 0);

  const hours = Math.floor(totalStudyMinutes / 60);
  const minutes = totalStudyMinutes % 60;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('Progress') || 'Progress'}
        </h1>
        <Paragraph className="!text-gray-600 dark:!text-gray-400">
          {t('O\'quv yutuqlaringiz va statistikangiz') || "O'quv yutuqlaringiz va statistikangiz"}
        </Paragraph>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BenefitCard
          icon={TrendingUp}
          title={t('Umumiy progress') || 'Umumiy progress'}
          description={`${Math.round(avgProgress)}% ${t('tayor') || 'tayor'}`}
          gradient="from-blue-500 to-blue-600"
        />

        <BenefitCard
          icon={BookOpen}
          title={t('Tugatilgan kurslar') || 'Tugatilgan kurslar'}
          description={`${completedCourses}/${totalCourses}`}
          gradient="from-green-500 to-green-600"
        />

        <BenefitCard
          icon={Award}
          title={t('O\'rtacha ball') || 'O\'rtacha ball'}
          description={`${Math.round(avgScore)}%`}
          gradient="from-purple-500 to-purple-600"
        />

        <BenefitCard
          icon={Clock}
          title={t('O\'qish vaqti') || "O'qish vaqti"}
          description={`${hours} ${t('soat')} ${minutes} ${t('daqiqа')}`}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Progress */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('Kurslar bo\'yicha progress') || "Kurslar bo'yicha progress"}
              </h2>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">
                {t('Barcha faol kurslaringiz') || 'Barcha faol kurslaringiz'}
              </Paragraph>
            </div>
          </div>

          <div className="space-y-4">
            {enrollments.length === 0 ? (
              <Paragraph className="!text-center !text-gray-500 dark:!text-gray-400 !py-8">
                {t('Kurslar topilmadi') || 'Kurslar topilmadi'}
              </Paragraph>
            ) : (
              enrollments.slice(0, 5).map((enrollment: any) => {
                const course = enrollment.course;
                return (
                  <div key={enrollment.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                        {course?.titleUz || course?.titleRu || course?.titleEn}
                      </h4>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.round(enrollment.progress || 0)}%
                      </span>
                    </div>
                    <Progress
                      percent={Math.round(enrollment.progress || 0)}
                      strokeColor={{
                        '0%': '#3B82F6',
                        '100%': '#8B5CF6',
                      }}
                      showInfo={false}
                    />
                  </div>
                );
              })
            )}
          </div>
        </GlassCard>

        {/* Assignments Stats */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('Topshiriqlar statistikasi') || 'Topshiriqlar statistikasi'}
              </h2>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">
                {t('Barcha topshiriqlaringiz') || 'Barcha topshiriqlaringiz'}
              </Paragraph>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <Paragraph className="!text-2xl !font-bold !text-gray-900 dark:!text-white">
                {userAssignments.filter((ua: any) => ua.status === AssignmentStatus.Graded).length}
              </Paragraph>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Baholangan')}</Paragraph>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mb-2" />
              <Paragraph className="!text-2xl !font-bold !text-gray-900 dark:!text-white">
                {userAssignments.filter((ua: any) => ua.status === AssignmentStatus.Submitted).length}
              </Paragraph>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Tekshiruvda')}</Paragraph>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
              <Paragraph className="!text-2xl !font-bold !text-gray-900 dark:!text-white">
                {
                  userAssignments.filter((ua: any) => ua.status === AssignmentStatus.NotSubmitted || !ua.status)
                    .length
                }
              </Paragraph>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Kutilmoqda')}</Paragraph>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Award className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
              <Paragraph className="!text-2xl !font-bold !text-gray-900 dark:!text-white">
                {userAssignments.reduce((sum: number, ua: any) => sum + (ua.score || 0), 0)}
              </Paragraph>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Jami ball')}</Paragraph>
            </div>
          </div>
        </GlassCard>

        {/* Tasks Stats */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('Vazifalar') || 'Vazifalar'}
              </h2>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">
                {t('Bajarilgan vazifalar') || 'Bajarilgan vazifalar'}
              </Paragraph>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-900 dark:text-white">{t('Bajarilgan')}</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {completedTasks}/{userTasks.length}
              </span>
            </div>

            {userTasks.slice(0, 3).map((ut: any) => (
              <div key={ut.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {ut.task?.titleUz || ut.task?.titleRu || ut.task?.titleEn}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      ut.status === TaskStatus.Completed
                        ? 'bg-green-100 text-green-800'
                        : ut.status === TaskStatus.Checking
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {t(ut.status)}
                  </span>
                </div>
                {ut.task?.coinReward && (
                  <Paragraph className="!text-xs !text-yellow-600 dark:!text-yellow-400">
                    🪙 {ut.task.coinReward} {t('coin')}
                  </Paragraph>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('Yutuqlar') || 'Yutuqlar'}
              </h2>
              <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">
                {t('Sizning yutuqlaringiz') || 'Sizning yutuqlaringiz'}
              </Paragraph>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Flame className="w-8 h-8 text-orange-600" />
              <div>
                <Paragraph className="!font-medium !text-gray-900 dark:!text-white">{t('Faol o\'quvchi')}</Paragraph>
                <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">
                  {t('3+ kurs davom ettirmoqda') || '3+ kurs davom ettirmoqda'}
                </Paragraph>
              </div>
            </div>

            {completedCourses > 0 && (
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Award className="w-8 h-8 text-green-600" />
                <div>
                  <Paragraph className="!font-medium !text-gray-900 dark:!text-white">
                    {t('Kurs bitiruvchisi')}
                  </Paragraph>
                  <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">
                    {completedCourses} {t('kurs tugatgan')}
                  </Paragraph>
                </div>
              </div>
            )}

            {gradedAssignments > 5 && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <div>
                  <Paragraph className="!font-medium !text-gray-900 dark:!text-white">{t('Topshiriq ustasi')}</Paragraph>
                  <Paragraph className="!text-sm !text-gray-600 dark:!text-gray-400">
                    {gradedAssignments} {t('ta topshiriq bajargan')}
                  </Paragraph>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
});

ProgressPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Progress">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default ProgressPage;
