import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { useApi } from '@src/api';
import { useLayoutStore } from '@src/stores/layout-store';
import { useNotification } from '@hooks/use-notification';
import { baseBackendUrl } from '@data/const';

let isFirst = true;

export const useUserMe = () => {
  const api = useApi();
  const { user, setUser } = useLayoutStore();
  const { notifyError, notifyInfo } = useNotification();
  const shouldFetch = useMemo(() => !!api.getToken(), [api]);
  const queryClient = useQueryClient();

  const {
    data: userData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['user-me'],
    queryFn: () =>
      api.instance.post('api/userMe/me', {
        select: {
          config: true,
          departments: true,
          lang: true,
          roles: true,
          step: true,
        },
      }),
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (isError) {
      setUser(null);
      api.logOut();
    }
  }, [isError, setUser, api]);

  useEffect(() => {
    if (userData?.data) {
      setUser(userData.data);
    } else if (userData && !userData?.data) {
      api.logOut();
      notifyError(`Foydalanuvchi ma'lumotlari topilmadi.`);
      console.warn(`Barcha so'rovlar ${baseBackendUrl}ga yuborilmoqda. Manzil togrimi ?`);
    }
  }, [userData, setUser]);

  useEffect(() => {
    if (isFirst && baseBackendUrl.includes('localhost')) {
      notifyInfo('👨‍🚀 Development');
      isFirst = false;
    }
  }, []);

  const refetchMe = () => {
    queryClient.invalidateQueries({ queryKey: ['user-me'] });
  };

  return {
    user,
    refetchMe,
    isLoading: isFetching,
    isError,
    roles: user?.roles ?? [],
    permissions: user?.permissions ?? [],
  };
};
