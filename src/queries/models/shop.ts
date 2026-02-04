import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const shopsQueryKey = 'shops';
export const shopQueryKey = 'shop';
export const shopExistQueryKey = 'exist-shop';
export const shopsCountQueryKey = 'count-shops';

export const shopsAggregateQueryKey = 'aggregate-shops';

export const useAggregateShops = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopsAggregateQueryKey, props], () => api.instance.post('/api/shop/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregateShop: res.isLoading,
    isErrorAggregateShop: res.isError,
    aggregateShops: res.data,
  };
};

export const useCountShops = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopsCountQueryKey, props], () => api.apis.Shop.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountShop: res.isLoading,
    isErrorCountShop: res.isError,
    countShops: res.data,
  };
};

export const useExistShop = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopExistQueryKey, props], () => api.apis.Shop.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistShop: res.isLoading,
    isErrorExistShop: res.isError,
    existShop: res.data,
  };
};

export const useShopsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [shopsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Shop.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingShops: res.isLoading, isErrorShops: res.isError, shopsData: res.data };
};

export const useShops = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopsQueryKey, props], () => api.apis.Shop.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingShops: res.isLoading, isErrorShops: res.isError, shopsData: res.data };
};

export const useShop = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([shopQueryKey, props], () => api.apis.Shop.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingShop: res.isLoading,
    isErrorShop: res.isError,
    shopData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateShops = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Shop.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateShops: res.isLoading,
    isErrorCreateShops: res.isError,
    createShops: res.mutate,
    createdShops: res.data,
  };
};

export const useCreateListShops = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Shop.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListShops: res.isLoading,
    isErrorCreateListShops: res.isError,
    createListShops: res.mutate,
    createdListShops: res.data,
  };
};

export const useCreateShop = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Shop.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateShop: res.isLoading,
    isErrorCreateShop: res.isError,
    createShop: res.mutate,
    createdShop: res.data,
  };
};

export const useUpdateShops = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Shop.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateShops: res.isLoading,
    isErrorUpdateShops: res.isError,
    updateShops: res.mutate,
    updatedShops: res.data,
  };
};

export const useUpdateListShops = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Shop.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListShops: res.isLoading,
    isErrorUpdateListShops: res.isError,
    updateListShops: res.mutate,
    updatedListShops: res.data,
  };
};

export const useUpdateShopsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Shop.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateShopsList: res.isLoading,
    isErrorUpdateShopsList: res.isError,
    updateShopsList: res.mutate,
    updatedShopsList: res.data,
  };
};

export const useUpdateShop = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Shop.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateShop: res.isLoading,
    isErrorUpdateShop: res.isError,
    updateShop: res.mutate,
    updatedShop: res.data,
  };
};

export const useDeleteShops = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Shop.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteShops: res.isLoading,
    isErrorDeleteShops: res.isError,
    deleteShops: res.mutate,
  };
};

export const useDeleteAllShops = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Shop.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllShops: res.isLoading,
    isErrorDeleteAllShops: res.isError,
    deleteAllShops: res.mutate,
  };
};

export const useDeleteShop = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Shop.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteShopFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteShop: res.isLoading,
    isErrorDeleteShop: res.isError,
    deleteShop: res.mutate,
    deleteShopFromTable,
  };
};
