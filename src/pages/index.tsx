import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useApi } from '@src/api';
import Benefits from '@/widgets/landing/benefits';
import Faq from '@/widgets/landing/faq';
import Features from '@/widgets/landing/features';
import Feedbacks from '@/widgets/landing/feedbacks';
import Footer from '@/widgets/landing/footer';
import Header from '@/widgets/landing/header';
import HowWorks from '@/widgets/landing/how-works';
import MainSection from '@/widgets/landing/main-section';
import OnlineStoreBenefits from '@/widgets/landing/online-store-benefits';
import OurClients from '@/widgets/landing/our-clients';
import Pricing from '@/widgets/landing/pricing';
import StartNow from '@/widgets/landing/start-now';
import TopButton from '@components/Button/Top-btn';
import { projectName, tokenName } from '@data/const';
import AntdProvider from '@hocs/antd-provider';
import { useLocationParams } from '@hooks/use-location-params';
import { useMyTheme } from '@hooks/use-my-theme';

const Home: NextPage = () => {
  const { setTheme } = useMyTheme();
  const router = useRouter();
  const { query } = useLocationParams();
  const api = useApi();

  useLayoutEffect(() => {
    setTheme('light', true);
    if (query.ref) {
      localStorage.setItem('ref', query.ref as string);
      api.instance.post('/api/partner/referral-click', { ref: query.ref });
    }
    if (localStorage.getItem(tokenName)) router.push('/shop/dashboard');
  }, []);

  return (
    <AntdProvider>
      <Head>
        <title>HBS Academy - Professional Treyderlarni Tayyorlaymiz</title>
        <meta
          name="description"
          content="HBS Academy - moliyaviy bozorlarda muvaffaqiyatli treyder bo'lish uchun professional ta'lim. Amaliy darslar, mentor yordami va real trading tajribasi."
        />
        <meta name="keywords" content="trading academy, treyder, forex, crypto, investment, moliyaviy bozorlar, trading kurslari, HBS Academy" />
        <meta property="og:title" content="HBS Academy - Professional Treyderlarni Tayyorlaymiz" />
        <meta
          property="og:description"
          content="Moliyaviy bozorlarda professional treyder bo'ling. HBS Academy bilan amaliy ta'lim va real trading tajribasi."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-dark">
        <TopButton />
        <Header />
        <main>
          <MainSection />
          <OnlineStoreBenefits />
          <Features />
          <HowWorks />
          <OurClients />
          <Feedbacks />
          <Benefits />
          <Pricing />
          <Faq />
          <StartNow />
        </main>
        <Footer />
      </div>
    </AntdProvider>
  );
};

export default observer(Home);
