import React, { ReactElement, useState } from 'react';
import StudentLayout from '@src/components/student-layout';
import { ShoppingCart, Package, Search, Filter, Heart, Star, Coins, ShoppingBag, Info } from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useProducts } from '@src/queries/models/product';
import { useShopCategories } from '@src/queries/models/shop-category';
import { useFavoriteProducts } from '@src/queries/models/favorite-product';
import { useOrders } from '@src/queries/models/order';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/typography';
import { Input, Badge, Modal, message, Tag } from 'antd';
import { ProductLevel, formatCoins } from '@api/academy-types';
import { getImagePath } from '@utils/util';
import { useTranslation } from 'react-i18next';

const ShopPage: NextPageWithLayout = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Fetch products
  const { data: productsResponse, isLoading: isLoadingProducts } = useProducts(
    {
      include: {
        category: true,
      },
      where: {
        isAvailable: true,
        stock: {
          gt: 0,
        },
        ...(selectedCategory ? { categoryId: selectedCategory } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    },
    { enabled: true },
  );

  const products = get(productsResponse, 'data.data', []);

  // Fetch categories
  const { data: categoriesResponse } = useShopCategories(
    {
      where: {
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    },
    { enabled: true },
  );

  const categories = get(categoriesResponse, 'data.data', []);

  // Fetch favorites
  const { data: favoritesResponse } = useFavoriteProducts(
    {
      where: {
        userId: user?.id,
      },
    },
    { enabled: !!user?.id },
  );

  const favorites = get(favoritesResponse, 'data.data', []);

  // Fetch orders
  const { data: ordersResponse } = useOrders(
    {
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    },
    { enabled: !!user?.id },
  );

  const orders = get(ordersResponse, 'data.data', []);

  // Filter products by search
  const filteredProducts = products.filter((product: any) => {
    const query = searchQuery.toLowerCase();
    const name = product.nameUz || product.nameRu || product.nameEn || '';
    return name.toLowerCase().includes(query);
  });

  // Check if product is favorite
  const isFavorite = (productId: string) => {
    return favorites.some((f: any) => f.productId === productId);
  };

  // Get product level badge
  const getLevelBadge = (level: ProductLevel) => {
    const badges: Record<ProductLevel, { color: string; label: string }> = {
      [ProductLevel.Level1]: { color: 'bg-gray-100 text-gray-800', label: 'Bronze' },
      [ProductLevel.Level2]: { color: 'bg-blue-100 text-blue-800', label: 'Silver' },
      [ProductLevel.Level3]: { color: 'bg-yellow-100 text-yellow-800', label: 'Gold' },
    };
    const badge = badges[level];
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>{badge.label}</span>;
  };

  // Handle buy product
  const handleBuyProduct = (product: any) => {
    if (!user) {
      message.warning(t('Iltimos tizimga kiring'));
      return;
    }

    if (user.coins < product.price) {
      message.error(t('Yetarli coin mavjud emas'));
      return;
    }

    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  // Confirm purchase
  const handleConfirmPurchase = () => {
    // TODO: Implement purchase mutation
    message.success(t('Buyurtma muvaffaqiyatli yuborildi'));
    setDetailModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("Do'kon") || "Do'kon"}</h1>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {t('Coinlaringiz uchun mahsulotlar') || 'Coinlaringiz uchun mahsulotlar'}
          </Paragraph>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
              {t('Balansingiz') || 'Balansingiz'}
            </Paragraph>
            <Paragraph className="text-xl font-bold text-yellow-600 flex items-center gap-1">
              <Coins className="w-5 h-5" />
              {user?.coins?.toLocaleString() || 0}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap border-0 ${
            !selectedCategory
              ? 'bg-primary text-white'
              : ' bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {t('Barchasi') || 'Barchasi'}
        </button>
        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap border-0 ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : ' bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.nameUz || category.nameRu || category.nameEn}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder={t('Mahsulotlarni qidiring...') || 'Mahsulotlarni qidiring...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-xl border-gray-200 dark:border-gray-700"
          allowClear
        />
      </div>

      {/* Products Grid */}
      {isLoadingProducts ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('Mahsulotlar topilmadi') || 'Mahsulotlar topilmadi'}
          </h3>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {t('Boshqa toifalarni tanlang yoki qidiring') || 'Boshqa toifalarni tanlang yoki qidiring'}
          </Paragraph>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <GlassCard key={product.id} className="overflow-hidden group">
              <div className="relative">
                {product.image ? (
                  <img
                    // src={getImagePath(product.image)}
                    src={'https://online.hbsakademiya.uz/media/2025/04/02/Frame_163.webp'}
                    alt={product.nameUz || product.nameEn}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                ) : product.images?.[0] ? (
                  <img
                    src={getImagePath(product.images[0])}
                    alt={product.nameUz || product.nameEn}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary-600/20 flex items-center justify-center">
                    <Package className="w-16 h-16 text-primary/50" />
                  </div>
                )}

                {/* Level Badge */}
                <div className="absolute top-3 left-3">{getLevelBadge(product.level)}</div>

                {/* Favorite Button */}
                <button
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all border-0 shadow ${
                    isFavorite(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </button>

                {/* Stock Badge */}
                {product.stock < 10 && (
                  <div className="absolute bottom-3 left-3 py-1 bg-red-500 text-white text-xs rounded-full">
                    {t('Cheklangan') || 'Cheklangan'}
                  </div>
                )}
              </div>

              <div className="py-2 pb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.nameUz || product.nameRu || product.nameEn}
                </h3>

                <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {product.descriptionUz || product.descriptionRu || product.descriptionEn}
                </Paragraph>

                {/* Coins & Stock */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-bold">
                    <Coins className="w-4 h-4" />
                    {formatCoins(product.price)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('Qoldi')}: {product.stock}
                  </span>
                </div>

                {/* Action Button */}
                <PrimaryButton
                  className="w-full"
                  onClick={() => handleBuyProduct(product)}
                  disabled={product.stock === 0 || (user?.coins || 0) < product.price}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {product.stock === 0
                    ? t('Tugadi')
                    : (user?.coins || 0) < product.price
                    ? t('Yetarli emas')
                    : t('Sotib olish')}
                </PrimaryButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <Modal
        open={detailModalOpen}
        onCancel={() => {
          setDetailModalOpen(false);
          setSelectedProduct(null);
        }}
        footer={null}
        width={600}
        className="product-detail-modal"
      >
        {selectedProduct && (
          <div className="p-6">
            <div className="flex gap-6 mb-6">
              {selectedProduct.image || selectedProduct.images?.[0] ? (
                <img
                  src={getImagePath(selectedProduct.image || selectedProduct.images?.[0])}
                  alt={selectedProduct.nameUz || selectedProduct.nameEn}
                  className="w-48 h-48 object-cover rounded-xl"
                />
              ) : (
                <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary-600/20 rounded-xl flex items-center justify-center">
                  <Package className="w-16 h-16 text-primary/50" />
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedProduct.nameUz || selectedProduct.nameRu || selectedProduct.nameEn}
                </h2>

                <Paragraph className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedProduct.descriptionUz || selectedProduct.descriptionRu || selectedProduct.descriptionEn}
                </Paragraph>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-600" />
                    <span className="text-xl font-bold text-yellow-600">{formatCoins(selectedProduct.price)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Package className="w-4 h-4" />
                    <span>
                      {t('Qoldi')}: {selectedProduct.stock}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Tag
                      color={
                        selectedProduct.level === ProductLevel.Level3
                          ? 'gold'
                          : selectedProduct.level === ProductLevel.Level2
                          ? 'blue'
                          : 'default'
                      }
                    >
                      {selectedProduct.level}
                    </Tag>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Requirements */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <Paragraph className="text-sm font-medium text-blue-900 dark:text-blue-200">
                    {t('Daraja talablari') || 'Daraja talablari'}
                  </Paragraph>
                  <Paragraph className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    {t('Bu mahsulot uchun')} {selectedProduct.minCoinsRequired}+ {t('coin talab etiladi')}
                  </Paragraph>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="flex gap-3">
              <SecondaryButton
                className="flex-1"
                onClick={() => {
                  setDetailModalOpen(false);
                  setSelectedProduct(null);
                }}
              >
                {t('Bekor qilish')}
              </SecondaryButton>
              <PrimaryButton
                className="flex-1"
                onClick={handleConfirmPurchase}
                disabled={(user?.coins || 0) < selectedProduct.price}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t('Sotib olish')}
              </PrimaryButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
});

ShopPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Do'kon">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default ShopPage;
