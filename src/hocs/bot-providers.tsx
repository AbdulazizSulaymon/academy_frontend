import React from 'react';
import { ThemeProvider } from 'next-themes';
import { CacheProvider } from '@emotion/react';
import AntdProvider from '@hocs/antd-provider';
import { LoadingWrapper } from '@hocs/loading-wrapper';
import { ReactQueryProvider } from '@hocs/react-query';
import createCache from '@emotion/cache';

const cache = createCache({ key: 'next' });

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AntdProvider>
        {/*<LoadingWrapper>*/}
        <CacheProvider value={cache}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </CacheProvider>
        {/*</LoadingWrapper>*/}
      </AntdProvider>
    </>
  );
};

export default ProvidersWrapper;
