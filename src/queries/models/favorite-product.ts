import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const favoriteProductsQueryKey = 'favorite-products';
export const favoriteProductQueryKey = 'favorite-product';
export const favoriteProductExistQueryKey = 'exist-favorite-product';
export const favoriteProductsCountQueryKey = 'count-favorite-products';

export const favoriteProductsAggregateQueryKey = 'aggregate-favorite-products';

export const useAggregateFavoriteProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [favoriteProductsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/favoriteProduct/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateFavoriteProduct: res.isLoading,
    isError: res.isError,
    isErrorAggregateFavoriteProduct: res.isError,
    aggregateFavoriteProducts: res.data,
  };
};

export const useCountFavoriteProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [favoriteProductsCountQueryKey, props],
    queryFn: () => api.apis.FavoriteProduct.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountFavoriteProduct: res.isLoading,
    isError: res.isError,
    isErrorCountFavoriteProduct: res.isError,
    countFavoriteProducts: res.data,
  };
};

export const useExistFavoriteProduct = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [favoriteProductExistQueryKey, props],
    queryFn: () => api.apis.FavoriteProduct.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistFavoriteProduct: res.isLoading,
    isError: res.isError,
    isErrorExistFavoriteProduct: res.isError,
    existFavoriteProduct: res.data,
  };
};

export const useFavoriteProductsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [favoriteProductsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.FavoriteProduct.findMany({
        ...tableFetchProps,
        ...props,
      }),
    enabled:
      typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    ...options,
  });

  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingFavoriteProducts: res.isLoading,
    isError: res.isError,
    isErrorFavoriteProducts: res.isError,
    favoriteProductsData: res.data,
  };
};

export const useFavoriteProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [favoriteProductsQueryKey, props],
    queryFn: () => api.apis.FavoriteProduct.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingFavoriteProducts: res.isLoading,
    isError: res.isError,
    isErrorFavoriteProducts: res.isError,
    favoriteProductsData: res.data,
  };
};

export const useFavoriteProduct = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [favoriteProductQueryKey, props],
    queryFn: () => api.apis.FavoriteProduct.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingFavoriteProduct: res.isLoading,
    isError: res.isError,
    isErrorFavoriteProduct: res.isError,
    favoriteProductData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.FavoriteProduct.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateFavoriteProducts: res.isPending,
    isError: res.isError,
    isErrorCreateFavoriteProducts: res.isError,
    createFavoriteProducts: res.mutate,
    createdFavoriteProducts: res.data,
  };
};

export const useCreateListFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.FavoriteProduct.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListFavoriteProducts: res.isPending,
    isError: res.isError,
    isErrorCreateListFavoriteProducts: res.isError,
    createListFavoriteProducts: res.mutate,
    createdListFavoriteProducts: res.data,
  };
};

export const useCreateFavoriteProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.FavoriteProduct.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateFavoriteProduct: res.isPending,
    isError: res.isError,
    isErrorCreateFavoriteProduct: res.isError,
    createFavoriteProduct: res.mutate,
    createdFavoriteProduct: res.data,
  };
};

export const useUpdateFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.FavoriteProduct.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateFavoriteProducts: res.isPending,
    isError: res.isError,
    isErrorUpdateFavoriteProducts: res.isError,
    updateFavoriteProducts: res.mutate,
    updatedFavoriteProducts: res.data,
  };
};

export const useUpdateListFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.FavoriteProduct.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListFavoriteProducts: res.isPending,
    isError: res.isError,
    isErrorUpdateListFavoriteProducts: res.isError,
    updateListFavoriteProducts: res.mutate,
    updatedListFavoriteProducts: res.data,
  };
};

export const useUpdateFavoriteProductsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.FavoriteProduct.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateFavoriteProductsList: res.isPending,
    isError: res.isError,
    isErrorUpdateFavoriteProductsList: res.isError,
    updateFavoriteProductsList: res.mutate,
    updatedFavoriteProductsList: res.data,
  };
};

export const useUpdateFavoriteProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.FavoriteProduct.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateFavoriteProduct: res.isPending,
    isError: res.isError,
    isErrorUpdateFavoriteProduct: res.isError,
    updateFavoriteProduct: res.mutate,
    updatedFavoriteProduct: res.data,
  };
};

export const useDeleteFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.FavoriteProduct.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteFavoriteProducts: res.isPending,
    isError: res.isError,
    isErrorDeleteFavoriteProducts: res.isError,
    deleteFavoriteProducts: res.mutate,
  };
};

export const useDeleteAllFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.FavoriteProduct.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllFavoriteProducts: res.isPending,
    isError: res.isError,
    isErrorDeleteAllFavoriteProducts: res.isError,
    deleteAllFavoriteProducts: res.mutate,
  };
};

export const useDeleteFavoriteProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.FavoriteProduct.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteFavoriteProductFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteFavoriteProduct: res.isPending,
    isError: res.isError,
    isErrorDeleteFavoriteProduct: res.isError,
    deleteFavoriteProduct: res.mutate,
    deleteFavoriteProductFromTable,
  };
};
