import React, { type ReactElement } from 'react';
import { NextPageWithLayout } from '@/types';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { GitHubStatsPanel, MonthlyCommits } from '@src/widgets/github-stats';
import { Box } from '@components/box';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { observer } from 'mobx-react';

const GithubStatsPage: NextPageWithLayout = observer(() => {
  return (
    <>
      <Box className={'mb-4'}>
        <GitHubStatsPanel />
      </Box>
      <Box>
        <MonthlyCommits />
      </Box>
    </>
  );
});

GithubStatsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default GithubStatsPage;
