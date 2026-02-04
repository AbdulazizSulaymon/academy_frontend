import { observer } from 'mobx-react';
import { ReactElement } from 'react';

import { NextPageWithLayout } from '@/types';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { ProductList } from '@components/product-list';

import { DynamicProviders } from '@hocs/dynamic-providers';

const ProductsPage: NextPageWithLayout = observer(() => {
  return (
    <div>
      <h1>Products Page</h1>
      <ProductList />
    </div>
  );
});

export default ProductsPage;

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};
