import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect } from 'react';

import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { AboutProject } from '@/widgets/about-project';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  return <AboutProject></AboutProject>;
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
