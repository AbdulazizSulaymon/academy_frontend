import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect } from 'react';

import { Welcome } from '@src/widgets/dashboard-layout';
import { PartnersLayout } from '@src/widgets/dashboard-layout/layouts';

import { useAutoNavigate } from '@hooks/use-auto-navigate';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  useAutoNavigate('/partner/dashboard');

  return <Welcome />;
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <PartnersLayout>{page}</PartnersLayout>
    </DynamicProviders>
  );
};

export default Page;
