import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { ReactElement, useMemo } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import { BsCartCheckFill } from 'react-icons/bs';
import { FaBoxOpen, FaGithub, FaUsers } from 'react-icons/fa6';
import { FcBarChart } from 'react-icons/fc';
import { HiMiniUserPlus } from 'react-icons/hi2';
import { PiShoppingCartFill } from 'react-icons/pi';
import { TbCategory, TbUserPentagon } from 'react-icons/tb';
import { NextPageWithLayout } from '@/types';
import { useCountShopCategories } from '@src/queries/models/shop-category';
import { useCountOrders } from '@src/queries/models/order';
import { useCountProducts } from '@src/queries/models/product';
import { useCountUsers } from '@src/queries/models/user';
import { AdminBanner } from '@src/widgets/banners';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { Box } from '@components/box';
import { Title } from '@components/title';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { DashboardCardProps } from '@components/dashboard-card';
import { useCountPartners } from '@src/queries/models/partner';
import { useApi } from '@src/api';
import { FiGitCommit } from 'react-icons/fi';
import { GitHubStatsPanel, MonthlyCommits } from '@src/widgets/github-stats';

const Page: NextPageWithLayout = observer(() => {
  const { t } = useTranslation();

  const startDate = useMemo(() => dayjs().add(1, 'day').startOf('day').toDate(), []);
  const endDate = useMemo(() => dayjs().add(2, 'day').startOf('day').toDate(), []);

  // const { countShops } = useCountShops({});
  const { countShopCategories } = useCountShopCategories({});
  const { countProducts } = useCountProducts({});
  const { countUsers } = useCountUsers({});
  const { countPartners } = useCountPartners({ where: { isActive: true } });
  const { countOrders } = useCountOrders({ where: { status: 'Yetkazildi' } });
  const { data: dailyCountUsers } = useCountUsers({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
  const { data: dailyCountOrders } = useCountOrders({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  const dashboardItems = useMemo<DashboardCardProps[]>(
    () => [
      // {
      //   title: countShops?.data,
      //   description: t("Do'konlar") || '',
      //   icon: <FaShop className={'dashboard-card-icon'} />,
      //   gradient: 'from-cyan-500 to-blue-500',
      // },
      {
        title: countShopCategories?.data,
        description: t('Kategoriyalar') || '',
        icon: <TbCategory className={'dashboard-card-icon'} />,
        gradient: 'from-sky-500 to-indigo-500',
        delay: 200,
      },
      {
        title: countProducts?.data,
        description: t('Mahsulotlar') || '',
        icon: <FaBoxOpen className={'dashboard-card-icon'} />,
        gradient: 'from-violet-500 to-fuchsia-500',
        delay: 400,
      },
      {
        title: countUsers?.data,
        description: t('Mijozlar') || '',
        icon: <FaUsers className={'dashboard-card-icon'} />,
        gradient: 'from-purple-500 to-pink-500',
        delay: 600,
      },
      {
        title: countOrders?.data,
        description: t('Yetkazilgan Buyurtmalar') || '',
        icon: <BsCartCheckFill className={'dashboard-card-icon'} />,
        gradient: 'from-primary to-primary-700',
        delay: 800,
      },
      {
        title: dailyCountUsers?.data,
        description: t('Kunlik Foydalanuvchilar') || '',
        icon: <HiMiniUserPlus className={'dashboard-card-icon'} />,
        gradient: 'from-green-500 to-cyan-500',
        delay: 1000,
      },
      {
        title: dailyCountOrders?.data,
        description: t('Kunlik Buyurtmalar') || '',
        icon: <PiShoppingCartFill className={'dashboard-card-icon'} />,
        gradient: 'from-violet-500 to-fuchsia-500',
        delay: 1200,
      },
      {
        title: countPartners?.data,
        description: t('Partners') || '',
        icon: <TbUserPentagon className={'dashboard-card-icon'} />,
        gradient: 'from-violet-500 to-fuchsia-500',
        delay: 1400,
      },
      // {
      //   title: githubStats?.totalContributors,
      //   description: t('Contributors') || '',
      //   icon: <FaGithub className={'dashboard-card-icon'} />,
      //   gradient: 'from-violet-500 to-fuchsia-500',
      //   delay: 1600,
      // },
      // {
      //   title: githubStats?.totalCommits,
      //   description: t('Commits') || '',
      //   icon: <FiGitCommit className={'dashboard-card-icon'} />,
      //   gradient: 'from-violet-500 to-fuchsia-500',
      //   delay: 1800,
      // },
    ],
    [
      // countShops,
      countShopCategories,
      countProducts,
      countUsers,
      countOrders,
      dailyCountUsers,
      dailyCountOrders,
      // githubStats,
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
