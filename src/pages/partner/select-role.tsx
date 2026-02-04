import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect } from 'react';

import { PartnersLayout } from '@src/widgets/dashboard-layout/layouts';
import { SelectRole } from '@src/widgets/select-role';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  return <SelectRole></SelectRole>;
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <PartnersLayout>{page}</PartnersLayout>
    </DynamicProviders>
  );
};

export default Page;
