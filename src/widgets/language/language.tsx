import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dropdown, MenuProps, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { useApi } from '@src/api';
import { useLayoutStore } from '@src/stores/layout-store';
import { useUserMe } from '@hooks/use-user-me';
import { useTranslation } from 'react-i18next';

const flags: Record<string, string> = {
  ru: '/flags/russia.png',
  en: '/flags/united-kingdom.png',
  uz: '/flags/uzbekistan.png',
};

export const LanguageElements = observer(() => {
  const { refetchMe } = useUserMe();
  const { lang, setLang, user } = useLayoutStore();
  const api = useApi();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: Record<string, any>) => api.instance.patch('api/user/update', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });

  useEffect(() => {
    const value = localStorage.getItem('lang');
    if (value != lang) {
      setLang(localStorage.getItem('lang'));
      console.log(refetchMe);
      refetchMe();
    }
  }, []);

  const onClick: MenuProps['onClick'] = (item) => {
    setLang(item.key);
    mutate({ data: { lang: item.key }, where: { id: user?.id } });
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className=" flex items-center gap-3">
          <img src={flags.ru} alt="" width={24} height={24} />
          <Typography>{t('Rus tili')}</Typography>
        </div>
      ),
      key: 'ru',
    },
    {
      label: (
        <div className=" flex items-center gap-3">
          <img src={flags.en} alt="" width={24} height={24} />
          <Typography>{t('Ingliz tili')}</Typography>
        </div>
      ),
      key: 'en',
    },
    {
      label: (
        <div className=" flex items-center gap-3">
          <img src={flags.uz} alt="" width={24} height={24} />
          <Typography>{t(`O'zbek tili`)}</Typography>
        </div>
      ),
      key: 'uz',
    },
  ];

  return (
    <Dropdown menu={{ items, onClick }} className="">
      <div className="flex items-center mr-2 cursor-pointer py-2">
        <img src={flags[lang]} alt="" width={24} height={24} />
      </div>
    </Dropdown>
  );
});
