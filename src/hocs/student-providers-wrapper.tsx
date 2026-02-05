import React from 'react';
import { ThemeProvider } from 'next-themes';
import { CacheProvider } from '@emotion/react';
import { LoadingWrapper } from '@hocs/loading-wrapper';
import { ReactQueryProvider } from '@hocs/react-query';
import createCache from '@emotion/cache';
import { ProtectedLayout } from '@/widgets/dashboard-layout/layouts';
import AntdProvider from '@hocs/antd-provider';

const cache = createCache({ key: 'next' });

const StudentProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AntdProvider>
      <ProtectedLayout>
        {/*<LoadingWrapper>*/}
        <CacheProvider value={cache}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </CacheProvider>
        {/*</LoadingWrapper>*/}
      </ProtectedLayout>
    </AntdProvider>
  );
};

export default StudentProvidersWrapper;
