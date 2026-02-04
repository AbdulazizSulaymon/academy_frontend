import { css } from '@emotion/react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Container } from '@src/components/container';
import Benefits from '@/widgets/landing/benefits';
import Faq from '@/widgets/landing/faq';
import Features from '@/widgets/landing/features';
import Feedbacks from '@/widgets/landing/feedbacks';
import HowWorks from '@/widgets/landing/how-works';
import OnlineStoreBenefits from '@/widgets/landing/online-store-benefits';
import OurClients from '@/widgets/landing/our-clients';
import Pricing from '@/widgets/landing/pricing';

import { projectName } from '@data/const';

import { useMyTheme } from '@hooks/use-my-theme';

export const AboutProject = () => {
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <img
        src={`/logo/${!isDarkMode ? 'light' : 'dark'}/logo.svg`}
        alt=""
        css={css`
          max-width: 80%;
          width: 200px;
          display: block;
          margin: 20px auto 40px;
          object-fit: cover;
        `}
      />
      <Typography className={'mb-6 text-[16px] leading-7'}>
        <b>{projectName}</b> - {t('about-project')}
      </Typography>

      <OnlineStoreBenefits />
      <Features />
      <HowWorks />
      <OurClients />
      <Feedbacks />
      <Benefits />
      <Pricing />
      <Faq />
    </Container>
  );
};
