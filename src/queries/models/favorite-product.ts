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
  const res = useQuery(
    [favoriteProductsAggregateQueryKey, props],
    () => api.instance.post('/api/favoriteProduct/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateFavoriteProduct: res.isLoading,
    isErrorAggregateFavoriteProduct: res.isError,
    aggregateFavoriteProducts: res.data,
  };
};

export const useCountFavoriteProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [favoriteProductsCountQueryKey, props],
    () => api.apis.FavoriteProduct.count({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingCountFavoriteProduct: res.isLoading,
    isErrorCountFavoriteProduct: res.isError,
    countFavoriteProducts: res.data,
  };
};

export const useExistFavoriteProduct = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [favoriteProductExistQueryKey, props],
    () => api.apis.FavoriteProduct.exist({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingExistFavoriteProduct: res.isLoading,
    isErrorExistFavoriteProduct: res.isError,
    existFavoriteProduct: res.data,
  };
};

export const useFavoriteProductsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [favoriteProductsQueryKey, tableFetchProps, props],
    () =>
      api.apis.FavoriteProduct.findMany({
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
    isLoadingFavoriteProducts: res.isLoading,
    isErrorFavoriteProducts: res.isError,
    favoriteProductsData: res.data,
  };
};

export const useFavoriteProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([favoriteProductsQueryKey, props], () => api.apis.FavoriteProduct.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingFavoriteProducts: res.isLoading,
    isErrorFavoriteProducts: res.isError,
    favoriteProductsData: res.data,
  };
};

export const useFavoriteProduct = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [favoriteProductQueryKey, props],
    () => api.apis.FavoriteProduct.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingFavoriteProduct: res.isLoading,
    isErrorFavoriteProduct: res.isError,
    favoriteProductData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.FavoriteProduct.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateFavoriteProducts: res.isLoading,
    isErrorCreateFavoriteProducts: res.isError,
    createFavoriteProducts: res.mutate,
    createdFavoriteProducts: res.data,
  };
};

export const useCreateListFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.FavoriteProduct.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListFavoriteProducts: res.isLoading,
    isErrorCreateListFavoriteProducts: res.isError,
    createListFavoriteProducts: res.mutate,
    createdListFavoriteProducts: res.data,
  };
};

export const useCreateFavoriteProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.FavoriteProduct.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateFavoriteProduct: res.isLoading,
    isErrorCreateFavoriteProduct: res.isError,
    createFavoriteProduct: res.mutate,
    createdFavoriteProduct: res.data,
  };
};

export const useUpdateFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.FavoriteProduct.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateFavoriteProducts: res.isLoading,
    isErrorUpdateFavoriteProducts: res.isError,
    updateFavoriteProducts: res.mutate,
    updatedFavoriteProducts: res.data,
  };
};

export const useUpdateListFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.FavoriteProduct.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListFavoriteProducts: res.isLoading,
    isErrorUpdateListFavoriteProducts: res.isError,
    updateListFavoriteProducts: res.mutate,
    updatedListFavoriteProducts: res.data,
  };
};

export const useUpdateFavoriteProductsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.FavoriteProduct.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateFavoriteProductsList: res.isLoading,
    isErrorUpdateFavoriteProductsList: res.isError,
    updateFavoriteProductsList: res.mutate,
    updatedFavoriteProductsList: res.data,
  };
};

export const useUpdateFavoriteProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.FavoriteProduct.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateFavoriteProduct: res.isLoading,
    isErrorUpdateFavoriteProduct: res.isError,
    updateFavoriteProduct: res.mutate,
    updatedFavoriteProduct: res.data,
  };
};

export const useDeleteFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.FavoriteProduct.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteFavoriteProducts: res.isLoading,
    isErrorDeleteFavoriteProducts: res.isError,
    deleteFavoriteProducts: res.mutate,
  };
};

export const useDeleteAllFavoriteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.FavoriteProduct.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllFavoriteProducts: res.isLoading,
    isErrorDeleteAllFavoriteProducts: res.isError,
    deleteAllFavoriteProducts: res.mutate,
  };
};

export const useDeleteFavoriteProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.FavoriteProduct.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteFavoriteProductFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteFavoriteProduct: res.isLoading,
    isErrorDeleteFavoriteProduct: res.isError,
    deleteFavoriteProduct: res.mutate,
    deleteFavoriteProductFromTable,
  };
};
