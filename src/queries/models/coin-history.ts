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
  const res = useQuery({
    queryKey: [coinHistoriesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/coinHistory/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoadingAggregateCoinHistory: res.isLoading,
    isErrorAggregateCoinHistory: res.isError,
    aggregateCoinHistories: res.data,
  };
};

export const useCountCoinHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [coinHistoriesCountQueryKey, props],
    queryFn: () => api.apis.CoinHistory.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingCountCoinHistory: res.isLoading,
    isErrorCountCoinHistory: res.isError,
    countCoinHistories: res.data,
  };
};

export const useExistCoinHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [coinHistoryExistQueryKey, props],
    queryFn: () => api.apis.CoinHistory.exist({ ...props }),
    ...options,
  });
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
  const res = useQuery({
    queryKey: [coinHistoriesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.CoinHistory.findMany({
        ...tableFetchProps,
        ...props,
      }),
    enabled:
      typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    ...options,
  });

  return {
    ...res,
    isLoadingCoinHistories: res.isLoading,
    isErrorCoinHistories: res.isError,
    coinHistoriesData: res.data,
  };
};

export const useCoinHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [coinHistoriesQueryKey, props],
    queryFn: () => api.apis.CoinHistory.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
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
  const res = useQuery({
    queryKey: [coinHistoryQueryKey, props],
    queryFn: () => api.apis.CoinHistory.findOne({ ...props }),
    ...(options as any),
  });
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
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CoinHistory.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateCoinHistories: res.isPending,
    isErrorCreateCoinHistories: res.isError,
    createCoinHistories: res.mutate,
    createdCoinHistories: res.data,
  };
};

export const useCreateListCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CoinHistory.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateListCoinHistories: res.isPending,
    isErrorCreateListCoinHistories: res.isError,
    createListCoinHistories: res.mutate,
    createdListCoinHistories: res.data,
  };
};

export const useCreateCoinHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CoinHistory.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingCreateCoinHistory: res.isPending,
    isErrorCreateCoinHistory: res.isError,
    createCoinHistory: res.mutate,
    createdCoinHistory: res.data,
  };
};

export const useUpdateCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CoinHistory.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateCoinHistories: res.isPending,
    isErrorUpdateCoinHistories: res.isError,
    updateCoinHistories: res.mutate,
    updatedCoinHistories: res.data,
  };
};

export const useUpdateListCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CoinHistory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateListCoinHistories: res.isPending,
    isErrorUpdateListCoinHistories: res.isError,
    updateListCoinHistories: res.mutate,
    updatedListCoinHistories: res.data,
  };
};

export const useUpdateCoinHistoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CoinHistory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateCoinHistoriesList: res.isPending,
    isErrorUpdateCoinHistoriesList: res.isError,
    updateCoinHistoriesList: res.mutate,
    updatedCoinHistoriesList: res.data,
  };
};

export const useUpdateCoinHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CoinHistory.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateCoinHistory: res.isPending,
    isErrorUpdateCoinHistory: res.isError,
    updateCoinHistory: res.mutate,
    updatedCoinHistory: res.data,
  };
};

export const useDeleteCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.CoinHistory.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteCoinHistories: res.isPending,
    isErrorDeleteCoinHistories: res.isError,
    deleteCoinHistories: res.mutate,
  };
};

export const useDeleteAllCoinHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.CoinHistory.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteAllCoinHistories: res.isPending,
    isErrorDeleteAllCoinHistories: res.isError,
    deleteAllCoinHistories: res.mutate,
  };
};

export const useDeleteCoinHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.CoinHistory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteCoinHistoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteCoinHistory: res.isPending,
    isErrorDeleteCoinHistory: res.isError,
    deleteCoinHistory: res.mutate,
    deleteCoinHistoryFromTable,
  };
};
