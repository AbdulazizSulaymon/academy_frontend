import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';

import { NextPageWithLayout } from '@/types';
import { PartnersLayout } from '@src/widgets/dashboard-layout/layouts';
import { AboutProject } from '@src/widgets/project/about-project';

import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => <AboutProject />);

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <PartnersLayout>{page}</PartnersLayout>
    </DynamicProviders>
  );
};

export default Page;
