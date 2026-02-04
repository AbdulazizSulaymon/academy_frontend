import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const shopHistoriesQueryKey = 'shop-histories';
export const shopHistoryQueryKey = 'shop-history';
export const shopHistoryExistQueryKey = 'exist-shop-history';
export const shopHistoriesCountQueryKey = 'count-shop-histories';

export const shopHistoriesAggregateQueryKey = 'aggregate-shop-histories';

export const useAggregateShopHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [shopHistoriesAggregateQueryKey, props],
    () => api.instance.post('/api/shopHistory/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateShopHistory: res.isLoading,
    isErrorAggregateShopHistory: res.isError,
    aggregateShopHistories: res.data,
  };
};

export const useCountShopHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopHistoriesCountQueryKey, props], () => api.apis.ShopHistory.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountShopHistory: res.isLoading,
    isErrorCountShopHistory: res.isError,
    countShopHistories: res.data,
  };
};

export const useExistShopHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopHistoryExistQueryKey, props], () => api.apis.ShopHistory.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistShopHistory: res.isLoading,
    isErrorExistShopHistory: res.isError,
    existShopHistory: res.data,
  };
};

export const useShopHistoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [shopHistoriesQueryKey, tableFetchProps, props],
    () =>
      api.apis.ShopHistory.findMany({
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
    isLoadingShopHistories: res.isLoading,
    isErrorShopHistories: res.isError,
    shopHistoriesData: res.data,
  };
};

export const useShopHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopHistoriesQueryKey, props], () => api.apis.ShopHistory.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingShopHistories: res.isLoading,
    isErrorShopHistories: res.isError,
    shopHistoriesData: res.data,
  };
};

export const useShopHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopHistoryQueryKey, props], () => api.apis.ShopHistory.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingShopHistory: res.isLoading,
    isErrorShopHistory: res.isError,
    shopHistoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateShopHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ShopHistory.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateShopHistories: res.isLoading,
    isErrorCreateShopHistories: res.isError,
    createShopHistories: res.mutate,
    createdShopHistories: res.data,
  };
};

export const useCreateListShopHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ShopHistory.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListShopHistories: res.isLoading,
    isErrorCreateListShopHistories: res.isError,
    createListShopHistories: res.mutate,
    createdListShopHistories: res.data,
  };
};

export const useCreateShopHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ShopHistory.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateShopHistory: res.isLoading,
    isErrorCreateShopHistory: res.isError,
    createShopHistory: res.mutate,
    createdShopHistory: res.data,
  };
};

export const useUpdateShopHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ShopHistory.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateShopHistories: res.isLoading,
    isErrorUpdateShopHistories: res.isError,
    updateShopHistories: res.mutate,
    updatedShopHistories: res.data,
  };
};

export const useUpdateListShopHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ShopHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListShopHistories: res.isLoading,
    isErrorUpdateListShopHistories: res.isError,
    updateListShopHistories: res.mutate,
    updatedListShopHistories: res.data,
  };
};

export const useUpdateShopHistoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ShopHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateShopHistoriesList: res.isLoading,
    isErrorUpdateShopHistoriesList: res.isError,
    updateShopHistoriesList: res.mutate,
    updatedShopHistoriesList: res.data,
  };
};

export const useUpdateShopHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ShopHistory.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateShopHistory: res.isLoading,
    isErrorUpdateShopHistory: res.isError,
    updateShopHistory: res.mutate,
    updatedShopHistory: res.data,
  };
};

export const useDeleteShopHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.ShopHistory.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteShopHistories: res.isLoading,
    isErrorDeleteShopHistories: res.isError,
    deleteShopHistories: res.mutate,
  };
};

export const useDeleteAllShopHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.ShopHistory.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllShopHistories: res.isLoading,
    isErrorDeleteAllShopHistories: res.isError,
    deleteAllShopHistories: res.mutate,
  };
};

export const useDeleteShopHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.ShopHistory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteShopHistoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteShopHistory: res.isLoading,
    isErrorDeleteShopHistory: res.isError,
    deleteShopHistory: res.mutate,
    deleteShopHistoryFromTable,
  };
};
