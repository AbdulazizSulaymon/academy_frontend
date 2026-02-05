import React, { ReactElement } from 'react';
import StudentLayout from '@src/components/student-layout';
import {
  FileText,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  Upload,
  Eye,
} from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useAssignments } from '@src/queries/models/assignment';
import { useUserAssignments } from '@src/queries/models/user-assignment';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { Badge } from 'antd';
import { AssignmentStatus, getStatusColor } from '@api/academy-types';
import { useTranslation } from 'react-i18next';

const AssignmentsPage: NextPageWithLayout = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  // Fetch all assignments
  const { data: assignmentsResponse, isLoading: isLoadingAssignments } = useAssignments(
    {
      include: {
        course: true,
        userAssignments: {
          where: {
            userId: user?.id,
          },
        },
      },
      where: {
        isPublished: true,
      },
      orderBy: {
        dueDate: 'asc',
      },
    },
    { enabled: !!user?.id },
  );

  const assignments = get(assignmentsResponse, 'data.data', []);

  // Get status badge color and icon
  const getStatusInfo = (status: AssignmentStatus) => {
    switch (status) {
      case AssignmentStatus.Available:
        return { color: 'bg-green-100 text-green-800', icon: <AlertCircle className="w-4 h-4" /> };
      case AssignmentStatus.NotSubmitted:
        return { color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle className="w-4 h-4" /> };
      case AssignmentStatus.Submitted:
        return { color: 'bg-blue-100 text-blue-800', icon: <Clock className="w-4 h-4" /> };
      case AssignmentStatus.Graded:
        return { color: 'bg-purple-100 text-purple-800', icon: <CheckCircle2 className="w-4 h-4" /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <AlertCircle className="w-4 h-4" /> };
    }
  };

  // Get user assignment status
  const getUserAssignment = (assignment: any) => {
    return assignment.userAssignments?.find((ua: any) => ua.userId === user?.id);
  };

  // Check if assignment is overdue
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('Topshiriqlar') || 'Topshiriqlar'}
          </h1>
          <p className="!text-gray-600 dark:!text-gray-400">
            {t('Barcha topshiriqlaringizni boshqaring') || 'Barcha topshiriqlaringizni boshqaring'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Jami') || 'Jami'}</p>
              <p className="!text-2xl mb-0 !font-bold !text-gray-900 dark:!text-white">{assignments.length}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Kutilmoqda') || 'Kutilmoqda'}</p>
              <p className="!text-2xl mb-0 !font-bold !text-gray-900 dark:!text-white">
                {assignments.filter((a: any) => {
                  const ua = getUserAssignment(a);
                  return !ua || ua.status === AssignmentStatus.Available;
                }).length}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Yuborilgan') || 'Yuborilgan'}</p>
              <p className="!text-2xl mb-0 !font-bold !text-gray-900 dark:!text-white">
                {assignments.filter((a: any) => {
                  const ua = getUserAssignment(a);
                  return ua?.status === AssignmentStatus.Submitted;
                }).length}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Baholangan') || 'Baholangan'}</p>
              <p className="!text-2xl mb-0 !font-bold !text-gray-900 dark:!text-white">
                {assignments.filter((a: any) => {
                  const ua = getUserAssignment(a);
                  return ua?.status === AssignmentStatus.Graded;
                }).length}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {isLoadingAssignments ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : assignments.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('Topshiriqlar yo\'q') || "Topshiriqlar yo'q"}
            </h3>
            <p className="!text-gray-600 dark:!text-gray-400">
              {t('Hozircha topshiriqlar mavjud emas') || "Hozircha topshiriqlar mavjud emas"}
            </p>
          </GlassCard>
        ) : (
          assignments.map((assignment: any) => {
            const userAssignment = getUserAssignment(assignment);
            const statusInfo = getStatusInfo(userAssignment?.status || AssignmentStatus.Available);
            const overdue = !userAssignment && assignment.dueDate && isOverdue(assignment.dueDate);

            return (
              <GlassCard key={assignment.id} className={`p-6 ${overdue ? 'border-red-300 dark:border-red-700' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {assignment.titleUz || assignment.titleRu || assignment.titleEn}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <span className="flex items-center gap-1">
                          {statusInfo.icon}
                          {t(userAssignment?.status || AssignmentStatus.Available)}
                        </span>
                      </span>
                      {overdue && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {t('Muddati o\'tgan') || "Muddati o'tgan"}
                        </span>
                      )}
                    </div>

                    <p className="!text-gray-600 dark:!text-gray-400 !mb-4">
                      {assignment.descriptionUz || assignment.descriptionRu || assignment.descriptionEn}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {assignment.dueDate ? formatDate(assignment.dueDate) : t('Muddati yo\'q')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {assignment.maxScore} {t('ball')}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600">🪙</span>
                        {assignment.coinReward} {t('coin')}
                      </div>
                      {userAssignment?.score !== undefined && (
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {t('Sizning ballingiz')}: {userAssignment.score}/{assignment.maxScore}
                        </div>
                      )}
                    </div>

                    {userAssignment?.feedback && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="!text-sm !text-blue-800 dark:!text-blue-200">
                          <strong>{t('Fikr-mulohaza')}:</strong> {userAssignment.feedback}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <SecondaryButton>
                      {t('Batafsil') || 'Batafsil'}
                    </SecondaryButton>
                    {(!userAssignment || userAssignment.status === AssignmentStatus.Available) && (
                      <PrimaryButton>{t('Topshirish') || 'Topshirish'}</PrimaryButton>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
});

AssignmentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Topshiriqlar">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default AssignmentsPage;
