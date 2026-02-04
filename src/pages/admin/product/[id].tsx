import { NextPageWithLayout } from '@/types';
import { observer } from 'mobx-react';
import { ReactElement } from 'react';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { ProductDetailComponent } from '@components/productDetailComponent';

const ProductDetail: NextPageWithLayout = observer(() => {
  return (
    <div>
      <h1>Product ID Page</h1>
      <ProductDetailComponent />
    </div>
  );
});

export default ProductDetail;

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};
