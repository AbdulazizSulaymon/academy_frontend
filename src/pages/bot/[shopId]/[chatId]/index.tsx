import { observer } from 'mobx-react';
import React, { ReactElement, useLayoutEffect } from 'react';
import { useRouterShopId } from '@hooks/use-shop-id';
import { BotProviders } from '@src/widgets/bot/bot-providers';
import { NextPageWithLayout } from '@/types';
import { useChatId } from '@hooks/use-chat-id';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = observer(function Page() {
  const router = useRouter();
  const { shopId } = useRouterShopId();
  const chatId = useChatId();

  useLayoutEffect(() => {
    router.replace(`/ecom/${shopId}/${chatId}`);
  }, [chatId, shopId]);

  return '';
});

Page.getLayout = function getLayout(page: ReactElement) {
  return <BotProviders>{page}</BotProviders>;
};

export default Page;
