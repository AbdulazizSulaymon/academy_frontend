import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { ReactElement, useMemo } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import {
  FaBookOpen,
  FaChalkboardUser,
  FaClipboardCheck,
  FaFile,
  FaGraduationCap,
  FaUsers,
  FaVideo,
  FaCalendarCheck,
} from 'react-icons/fa6';
import { FcBarChart, FcQuestions } from 'react-icons/fc';
import { HiMiniUserPlus } from 'react-icons/hi2';
import { TbCategory } from 'react-icons/tb';
import { NextPageWithLayout } from '@/types';
import { useCountCourses } from '@src/queries/models/course';
import { useCountCourseCategories } from '@src/queries/models/course-category';
import { useCountUsers } from '@src/queries/models/user';
import { useCountMentors } from '@src/queries/models/mentor';
import { useCountModules } from '@src/queries/models/module';
import { useCountLessons } from '@src/queries/models/lesson';
import { useCountTests } from '@src/queries/models/test';
import { useCountUserAssignments } from '@src/queries/models/user-assignment';
import { useCountEvents } from '@src/queries/models/event';
import { AdminBanner } from '@src/widgets/banners';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { Box } from '@components/box';
import { Title } from '@components/title';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { DashboardCardProps } from '@components/dashboard-card';
import { useApi } from '@src/api';
import { GitHubStatsPanel, MonthlyCommits } from '@src/widgets/github-stats';

const Page: NextPageWithLayout = observer(() => {
  const { t } = useTranslation();

  const startDate = useMemo(() => dayjs().startOf('day').toDate(), []);
  const endDate = useMemo(() => dayjs().add(1, 'day').startOf('day').toDate(), []);

  // Academy Statistics
  const { countUsers } = useCountUsers({});
  const { countCourses } = useCountCourses({});
  const { countCourseCategories } = useCountCourseCategories({});
  const { countMentors } = useCountMentors({});
  const { countModules } = useCountModules({});
  const { countLessons } = useCountLessons({});
  const { countTests } = useCountTests({});
  const { countUserAssignments } = useCountUserAssignments({});
  const { countEvents } = useCountEvents({});

  // Daily Statistics
  const { data: dailyCountStudents } = useCountUsers({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  const dashboardItems = useMemo<DashboardCardProps[]>(
    () => [
      {
        title: countUsers?.data,
        description: t('Talabalar') || 'Talabalar',
        icon: <FaGraduationCap className={'dashboard-card-icon'} />,
        gradient: 'from-blue-500 to-indigo-600',
        delay: 200,
      },
      {
        title: countCourses?.data,
        description: t('Kurslar') || 'Kurslar',
        icon: <FaBookOpen className={'dashboard-card-icon'} />,
        gradient: 'from-emerald-500 to-green-600',
        delay: 400,
      },
      {
        title: countMentors?.data,
        description: t('Mentorlar') || 'Mentorlar',
        icon: <FaChalkboardUser className={'dashboard-card-icon'} />,
        gradient: 'from-purple-500 to-violet-600',
        delay: 600,
      },
      {
        title: countCourseCategories?.data,
        description: t('Kurs Kategoriyalari') || 'Kurs Kategoriyalari',
        icon: <TbCategory className={'dashboard-card-icon'} />,
        gradient: 'from-sky-500 to-cyan-600',
        delay: 800,
      },
      {
        title: countModules?.data,
        description: t('Modullar') || 'Modullar',
        icon: <FaFile className={'dashboard-card-icon'} />,
        gradient: 'from-orange-500 to-amber-600',
        delay: 1000,
      },
      {
        title: countLessons?.data,
        description: t('Darslar') || 'Darslar',
        icon: <FaVideo className={'dashboard-card-icon'} />,
        gradient: 'from-rose-500 to-pink-600',
        delay: 1200,
      },
      {
        title: countTests?.data,
        description: t('Testlar') || 'Testlar',
        icon: <FcQuestions className={'dashboard-card-icon'} />,
        gradient: 'from-teal-500 to-cyan-600',
        delay: 1400,
      },
      {
        title: countUserAssignments?.data,
        description: t('Topshiriq Baholari') || 'Topshiriq Baholari',
        icon: <FaClipboardCheck className={'dashboard-card-icon'} />,
        gradient: 'from-violet-500 to-purple-600',
        delay: 1600,
      },
      {
        title: countEvents?.data,
        description: t('Tadbirlar') || 'Tadbirlar',
        icon: <FaCalendarCheck className={'dashboard-card-icon'} />,
        gradient: 'from-indigo-500 to-blue-600',
        delay: 1800,
      },
      {
        title: dailyCountStudents?.data,
        description: t("Kunlik Yangi Talabalar") || 'Kunlik Yangi Talabalar',
        icon: <HiMiniUserPlus className={'dashboard-card-icon'} />,
        gradient: 'from-green-500 to-emerald-600',
        delay: 2000,
      },
    ],
    [
      countUsers,
      countCourses,
      countMentors,
      countCourseCategories,
      countModules,
      countLessons,
      countTests,
      countUserAssignments,
      countEvents,
      dailyCountStudents,
      t,
    ],
  );

  return (
    <div className={`gap-6 flex flex-col`}>
      <AdminBanner />
      <Box>
        <Title className={`font-normal flex items-center gap-2 mb-7`}>
          <FcBarChart />
          {t('monitor') || ''}
        </Title>
        <div className="grid grid-cols-1 text-white md:grid-cols-2 xl:grid-cols-3 gap-7">
          {dashboardItems.map((item, index) => (
            <Fade key={index} triggerOnce className={'min-w-[220px]'} delay={item.delay} duration={700}>
              <div className={`dashboard-card ${item.gradient}`}>
                <div>{item.icon}</div>
                <div className="flex flex-col items-start justify-center">
                  <span className="dashboard-card-title">{item.title}</span>
                  <span className="dashboard-card-description">{item.description}</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Box>
      {/*<Box>*/}
      {/*  <GitHubStatsPanel />*/}
      {/*</Box>*/}
      {/*<Box>*/}
      {/*  <MonthlyCommits />*/}
      {/*</Box>*/}
    </div>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};
export default Page;
