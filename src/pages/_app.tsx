import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/uz-latn';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'nprogress/nprogress.css';
import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LoadingWrapper } from '@src/hocs/loading-wrapper';
import '@src/i18/i18';
import { StoreProvider } from '@src/stores/stores';
import { GlobalStyles } from '@src/styles/global';
import '@src/styles/tailwind.css';
import { projectName } from '@data/const';
import { ErrorBoundaryContainer } from '@hocs/error-boundary';
import { ThemeProvider } from 'next-themes';
import { NextPageWithLayout } from '@/types';
import { usePageView } from '@src/hooks/use-page-view';

dayjs.locale('uz-latn');

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  
  usePageView();

  return (
    <ThemeProvider storageKey="theme" attribute="class" defaultTheme={'light'}>
      <StoreProvider>
        <GlobalStyles />
        <Head>
          <link rel="shortcut icon" href="/logo/light/main-logo.png" />
          <title>{projectName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <LoadingWrapper>
          <ErrorBoundaryContainer>{getLayout(<Component {...pageProps} />)}</ErrorBoundaryContainer>
        </LoadingWrapper>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
