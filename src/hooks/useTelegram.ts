import { useStore } from '@src/stores/stores';
import { useEffect, useState } from 'react';

export function useTelegram() {
  // const [tg, setTg] = useState<any>({});
  const { tg, setTg } = useStore().botStore;

  useEffect(() => {
    const waitForTelegram = () => {
      return new Promise((resolve) => {
        const checkTelegram = () => {
          if (window.Telegram) {
            resolve(window.Telegram);
          } else {
            setTimeout(checkTelegram, 100);
          }
        };
        checkTelegram();
      });
    };

    waitForTelegram().then((Telegram) => {
      // @ts-ignore
      window && !tg && setTg(window.Telegram.WebApp);
    });
  }, []);

  // useEffect(() => {
  //   if (tg && tg.ready) {
  //     tg.ready();
  //   }
  // }, [tg]);

  const onClose = () => {
    tg?.close();
  };

  const onToggleButton = () => {
    if (tg?.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
  };
}
