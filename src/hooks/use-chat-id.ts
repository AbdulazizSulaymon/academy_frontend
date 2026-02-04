import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useChatId = () => {
  const router = useRouter();

  const chatId = useMemo(() => router.query.chatId?.toString() || '0', [router.query.chatId]);

  return chatId;
};
