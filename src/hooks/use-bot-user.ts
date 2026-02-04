import { useApi } from '@src/api';
import { useStore } from '@src/stores/stores';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouterShopId } from '@hooks/use-shop-id';
import { useBotStore } from '@src/stores/bot-store';

export const useBotUser = () => {
  const api = useApi();
  const router = useRouter();
  const { shopId } = useRouterShopId();
  const { setUser, setLang, user, lang } = useBotStore();
  const chatId = useMemo(() => router.query.chatId?.toString() || undefined, [router.query.chatId]);

  const {
    isLoading: loading,
    data: userResponse,
    error: findUserError,
  } = useQuery(
    ['botUser', chatId, shopId],
    async () => {
      if (user || !chatId) return { error: true };

      const res = await api.apis.Client.findOne({ where: { chatId: chatId, shopId }, include: {} });
      const userData = {
        ...res.data,
      };

      const langData = userData?.lang || 'uz';

      setUser(userData);
      setLang(langData);

      return res;
    },
    {
      enabled: !!chatId && !!shopId,
    },
  );

  return { user, lang, loading, error: findUserError };
};
