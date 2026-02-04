import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const coinHistoriesQueryKey = 'coin-histories';
export const coinHistoryQueryKey = 'coin-history';
export const coinHistoryExistQueryKey = 'exist-coin-history';
export const coinHistoriesCountQueryKey = 'count-coin-histories';

export const coinHistoriesAggregateQueryKey = 'aggregate-coin-histories';

export const useAggregateCoinHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [coinHistoriesAggregateQueryKey, props],
    () => api.instance.post('/api/coinHistory/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateCoinHistory: res.isLoading,
    isErrorAggregateCoinHistory: res.isError,
    aggregateCoinHistories: res.data,
  };
};

export const useCountCoinHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([coinHistoriesCountQueryKey, props], () => api.apis.CoinHistory.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountCoinHistory: res.isLoading,
    isErrorCountCoinHistory: res.isError,
    countCoinHistories: res.data,
  };
};

export const useExistCoinHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([coinHistoryExistQueryKey, props], () => api.apis.CoinHistory.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistCoinHistory: res.isLoading,
    isErrorExistCoinHistory: res.isError,
    existCoinHistory: res.data,
  };
};

export const useCoinHistoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [coinHistoriesQueryKey, tableFetchProps, props],
    () =>
      api.apis.CoinHistory.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return {
    ...res,
    isLoadingCoinHistories: res.isLoading,
    isErrorCoinHistories: res.isError,
    coinHistoriesData: res.data,
  };
};

export const useCoinHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([coinHistoriesQueryKey, props], () => api.apis.CoinHistory.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingCoinHistories: res.isLoading,
    isErrorCoinHistories: res.isError,
    coinHistoriesData: res.data,
  };
};

export const useCoinHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([coinHistoryQueryKey, props], () => api.apis.CoinHistory.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingCoinHistory: res.isLoading,
    isErrorCoinHistory: res.isError,
    coinHistoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CoinHistory.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateCoinHistories: res.isLoading,
    isErrorCreateCoinHistories: res.isError,
    createCoinHistories: res.mutate,
    createdCoinHistories: res.data,
  };
};

export const useCreateListCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CoinHistory.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListCoinHistories: res.isLoading,
    isErrorCreateListCoinHistories: res.isError,
    createListCoinHistories: res.mutate,
    createdListCoinHistories: res.data,
  };
};

export const useCreateCoinHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CoinHistory.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateCoinHistory: res.isLoading,
    isErrorCreateCoinHistory: res.isError,
    createCoinHistory: res.mutate,
    createdCoinHistory: res.data,
  };
};

export const useUpdateCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CoinHistory.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCoinHistories: res.isLoading,
    isErrorUpdateCoinHistories: res.isError,
    updateCoinHistories: res.mutate,
    updatedCoinHistories: res.data,
  };
};

export const useUpdateListCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CoinHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListCoinHistories: res.isLoading,
    isErrorUpdateListCoinHistories: res.isError,
    updateListCoinHistories: res.mutate,
    updatedListCoinHistories: res.data,
  };
};

export const useUpdateCoinHistoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CoinHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCoinHistoriesList: res.isLoading,
    isErrorUpdateCoinHistoriesList: res.isError,
    updateCoinHistoriesList: res.mutate,
    updatedCoinHistoriesList: res.data,
  };
};

export const useUpdateCoinHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CoinHistory.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCoinHistory: res.isLoading,
    isErrorUpdateCoinHistory: res.isError,
    updateCoinHistory: res.mutate,
    updatedCoinHistory: res.data,
  };
};

export const useDeleteCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.CoinHistory.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteCoinHistories: res.isLoading,
    isErrorDeleteCoinHistories: res.isError,
    deleteCoinHistories: res.mutate,
  };
};

export const useDeleteAllCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.CoinHistory.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllCoinHistories: res.isLoading,
    isErrorDeleteAllCoinHistories: res.isError,
    deleteAllCoinHistories: res.mutate,
  };
};

export const useDeleteCoinHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.CoinHistory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteCoinHistoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteCoinHistory: res.isLoading,
    isErrorDeleteCoinHistory: res.isError,
    deleteCoinHistory: res.mutate,
    deleteCoinHistoryFromTable,
  };
};
