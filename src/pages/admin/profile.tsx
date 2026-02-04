import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import { ProfileComponent } from '@components/profile';
import { Box } from '@components/box';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { ReactElement } from 'react';

const ProfilePage: NextPageWithLayout = observer(() => {
  return (
    <Box>
      <h1>Profile Page</h1>
      <ProfileComponent />
    </Box>
  );
});

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};
