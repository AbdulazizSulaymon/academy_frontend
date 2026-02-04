import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { notification } from 'antd';

export type QueryOptions = Record<string, any>;
export type QuerySecondaryOptions = {
  invalidateQueries?: any[];
  successToast?: React.ReactNode | string;
  errorToast?: React.ReactNode | string;
};

export function getQueryOptions(
  queryClient: QueryClient,
  options: QueryOptions,
  secondaryOptions?: QuerySecondaryOptions,
) {
  return {
    ...options,
    // @ts-ignore
    onSuccess: (...rest) => {
      if (secondaryOptions?.invalidateQueries) queryClient.invalidateQueries(secondaryOptions?.invalidateQueries);
      if (secondaryOptions?.successToast) notification.success({ message: secondaryOptions?.successToast });
      if (options.onSuccess) options.onSuccess(...rest);
    },
    // @ts-ignore
    onError: (...rest) => {
      console.log(rest);
      if (secondaryOptions?.errorToast) notification.error({ message: secondaryOptions?.errorToast });
      if (options.onError) options.onError(...rest);
    },
  };
}
