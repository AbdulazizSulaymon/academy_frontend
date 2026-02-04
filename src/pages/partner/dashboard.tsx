import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import { BiBookReader } from 'react-icons/bi';
import { CiStickyNote } from 'react-icons/ci';
import { FcBarChart } from 'react-icons/fc';
import { GoTasklist } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { LiaCubesSolid } from 'react-icons/lia';
import { LuMousePointerClick } from 'react-icons/lu';
import { MdAddShoppingCart, MdLogin } from 'react-icons/md';

import { NextPageWithLayout } from '@/types';
import { usePartner } from '@src/queries/models/partner';
import { useLayoutStore } from '@src/stores/layout-store';
import { PartnerBanner } from '@src/widgets/banners';
import { PartnersLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { DashboardCardProps } from '@components/dashboard-card';
import { Title } from '@components/title';

import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  const { t } = useTranslation();
  const { user } = useLayoutStore();

  const { data, isLoading, isError } = usePartner({ where: { userId: user?.id } }, { enabled: !!user?.id });

  const dashboardItems = useMemo<DashboardCardProps[]>(
    () => [
      {
        title: data?.data?.totalClicks,
        description: t('Tashriflar') || '',
        icon: <LuMousePointerClick className={'dashboard-card-icon'} />,
        gradient: 'from-cyan-500 to-blue-500',
        delay: 0,
      },
      {
        title: data?.data?.totalSignups,
        description: t(`Ro'yxatdan o'tganlar`) || '',
        icon: <MdLogin className={'dashboard-card-icon'} />,
        gradient: 'from-sky-500 to-indigo-500',
        delay: 200,
      },
      {
        title: data?.data?.totalRevenue,
        description: t('Sotib olganlar') || '',
        icon: <MdAddShoppingCart className={'dashboard-card-icon'} />,
        gradient: 'from-violet-500 to-fuchsia-500',
        delay: 400,
      },
    ],
    [data, t],
  );

  return (
    <div className={`gap-6 flex flex-col`}>
      <PartnerBanner />
      <Box>
        <Title className={`font-normal flex items-center gap-2 mb-7`}>
          <FcBarChart /> {t('Monitor') || ''}
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 text-white">
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
          {/*<Fade triggerOnce className={'min-w-[220px]'} delay={600} duration={700}>*/}
          {/*  <div className="flex justify-center gap-6 items-center p-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">*/}
          {/*    <CiStickyNote className={'dashboard-card-icon'} />*/}
          {/*    <div className="flex flex-col items-start justify-center">*/}
          {/*      <span className="dashboard-card-title">0</span>*/}
          {/*      <span className="dashboard-card-description"> {t('Sertifikatlar') || ''}</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Fade>*/}
          {/*<Fade triggerOnce className={'min-w-[220px]'} delay={800} duration={700}>*/}
          {/*  <div className="flex justify-center gap-6 items-center p-8 rounded-lg bg-gradient-to-r from-primary to-pink-500">*/}
          {/*    <IoIosNotificationsOutline className={'dashboard-card-icon'} />*/}
          {/*    <div className="flex flex-col items-start justify-center">*/}
          {/*      <span className="dashboard-card-title">0</span>*/}
          {/*      <span className="dashboard-card-description"> {t('Sertifikatlar') || ''}</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Fade>*/}
          {/*<Fade triggerOnce className={'min-w-[220px]'} delay={1000} duration={700}>*/}
          {/*  <div className="flex justify-center gap-6 items-center p-8 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500">*/}
          {/*    <GoTasklist className={'dashboard-card-icon'} />*/}
          {/*    <div className="flex flex-col items-start justify-center">*/}
          {/*      <span className="dashboard-card-title">0</span>*/}
          {/*      <span className="dashboard-card-description"> {t('Sertifikatlar') || ''}</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Fade>*/}
        </div>
      </Box>
    </div>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <PartnersLayout>{page}</PartnersLayout>
    </DynamicProviders>
  );
};

export default Page;
