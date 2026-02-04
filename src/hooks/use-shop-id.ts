import { useShop, useShops } from '@src/queries/models/shop';
import { useUserMe } from '@hooks/use-user-me';
import { useEffect, useMemo } from 'react';
import { get } from 'lodash';
import { useLayoutStore } from '@src/stores/layout-store';
import { useRouter } from 'next/router';
import { useBotStore } from '@src/stores/bot-store';

export const useShopId = () => {
  const { user } = useUserMe();
  const { shopId, setShopId } = useLayoutStore();

  const { shopData } = useShop({ where: { id: shopId } }, { enabled: !!shopId });
  const shop = useMemo(() => (shopId ? shopData?.data || {} : {}), [shopData, shopId]);

  const { shopsData } = useShops(
    {
      orderBy: { id: 'asc' },
      // where: { ownerId: user?.id }
    },
    { enabled: !!user?.id },
  );

  useEffect(() => {
    const id = get(shopsData?.data, 'data[0].id', undefined);
    if ((!shopId && id) || (!localStorage.getItem('shopId') && id)) setShopId(id);
  }, [shopsData]);

  return { shopId, setShopId, shop };
};

export const useRouterShopId = () => {
  const { query } = useRouter();
  const { setShopId } = useBotStore();

  const shopId = useMemo(() => query.shopId as string, [query.shopId]);

  useEffect(() => {
    setShopId(shopId);
  }, [shopId]);

  return { shopId };
};

export const useRouterShop = () => {
  const { shopId } = useRouterShopId();

  const { shopData } = useShop(
    {
      include: {
        banners: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      where: { id: shopId },
    },
    { enabled: !!shopId },
  );

  return { shop: shopData?.data || {}, shopId };
};
