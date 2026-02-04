import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { tokenName } from '@data/const';
import { useNotification } from '@hooks/use-notification';
import { useApi } from '@src/api';

let hasError = false;
// eslint-disable-next-line react/display-name
export const ReactQueryProvider = React.memo(({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [queryClient, setQueryClient] = useState<QueryClient | null>(null);
  const { notifySuccess, notifyError } = useNotification();
  const api = useApi();

  useEffect(() => {
    if (!queryClient)
      setQueryClient(
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 5000,
              refetchOnWindowFocus: false,
              retry: false,
              networkMode: 'always',
            },
          },
          queryCache: new QueryCache({
            onError: async (error, query) => {
              // How to get status code fo error
              console.log({ error });

              // @ts-ignore
              if (error?.request?.status === 401) {
                router.push('/login');
                if (hasError) return;
                hasError = true;
                if (localStorage.getItem(tokenName)) notifyError('Token has expired. Please login again!');
                // document.location.replace('/login');
                // queryClient.refetchQueries(query.queryKey);
              }
              // @ts-ignore
              else if (error?.request?.status === 403) {
                // router.push('/403');
                api.logOut();
                router.push('/login');
              }
            },
          }),
        }),
      );
  }, [queryClient]);

  return (
    (queryClient && (
      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryCacheProvider queryCache={queryCache}>*/}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        {/*</ReactQueryCacheProvider>*/}
      </QueryClientProvider>
    )) ||
    null
  );
});
