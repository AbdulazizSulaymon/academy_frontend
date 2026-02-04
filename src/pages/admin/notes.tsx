import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';

import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { Notes } from '@src/widgets/notes';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  return <Notes />;
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
