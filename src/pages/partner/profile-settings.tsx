import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';

import { PartnersLayout } from '@src/widgets/dashboard-layout/layouts';
import { ProfileSettings } from '@src/widgets/profile-settings';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  return (
    <>
      <ProfileSettings />
    </>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <PartnersLayout>{page}</PartnersLayout>
    </DynamicProviders>
  );
};

export default Page;
