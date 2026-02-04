import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';

import { NextPageWithLayout } from '@/types';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import NewDesignBot from '@components/new-design-bot';

import { DynamicProviders } from '@hocs/dynamic-providers';

const NewDesignPage: NextPageWithLayout = observer(() => {
  return (
    <Box>
      <h1>New Design Page</h1>
      <NewDesignBot />
    </Box>
  );
});

export default NewDesignPage;

NewDesignPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};
