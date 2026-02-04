import { observer } from 'mobx-react';
import React, { ReactElement } from 'react';

import { NextPageWithLayout } from '@/types';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { CategoryList } from '@components/category';

import { DynamicProviders } from '@hocs/dynamic-providers';

const CategoriesPage: NextPageWithLayout = observer(() => {
  return (
    <div>
      <h1>Categories Page</h1>
      <CategoryList />
    </div>
  );
});

export default CategoriesPage;

CategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};
