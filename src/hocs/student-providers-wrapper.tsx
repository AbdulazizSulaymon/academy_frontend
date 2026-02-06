import React from 'react';
import { ThemeProvider } from 'next-themes';
import { CacheProvider } from '@emotion/react';
import { LoadingWrapper } from '@hocs/loading-wrapper';
import { ReactQueryProvider } from '@hocs/react-query';
import createCache from '@emotion/cache';
import { ProtectedLayout } from '@/widgets/dashboard-layout/layouts';
import StudentAntdProvider from '@hocs/student-antd-provider';

const cache = createCache({ key: 'next' });

const StudentProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StudentAntdProvider>
      <ProtectedLayout>
        {/*<LoadingWrapper>*/}
        <CacheProvider value={cache}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </CacheProvider>
        {/*</LoadingWrapper>*/}
      </ProtectedLayout>
    </StudentAntdProvider>
  );
};

export default StudentProvidersWrapper;
