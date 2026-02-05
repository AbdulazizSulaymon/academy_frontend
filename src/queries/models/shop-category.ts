import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const shopCategoriesQueryKey = 'shop-categories';
export const shopCategoryQueryKey = 'shop-category';
export const shopCategoryExistQueryKey = 'exist-shop-category';
export const shopCategoriesCountQueryKey = 'count-shop-categories';

export const shopCategoriesAggregateQueryKey = 'aggregate-shop-categories';

export const useAggregateShopCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [shopCategoriesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/shopCategory/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoadingAggregateShopCategory: res.isLoading,
    isErrorAggregateShopCategory: res.isError,
    aggregateShopCategories: res.data,
  };
};

export const useCountShopCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [shopCategoriesCountQueryKey, props],
    queryFn: () => api.apis.ShopCategory.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingCountShopCategory: res.isLoading,
    isErrorCountShopCategory: res.isError,
    countShopCategories: res.data,
  };
};

export const useExistShopCategory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [shopCategoryExistQueryKey, props],
    queryFn: () => api.apis.ShopCategory.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingExistShopCategory: res.isLoading,
    isErrorExistShopCategory: res.isError,
    existShopCategory: res.data,
  };
};

export const useShopCategoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [shopCategoriesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.ShopCategory.findMany({
        ...tableFetchProps,
        ...props,
      }),
    enabled:
      typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    ...options,
  });

  return {
    ...res,
    isLoadingShopCategories: res.isLoading,
    isErrorShopCategories: res.isError,
    shopCategoriesData: res.data,
  };
};

export const useShopCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [shopCategoriesQueryKey, props],
    queryFn: () => api.apis.ShopCategory.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoadingShopCategories: res.isLoading,
    isErrorShopCategories: res.isError,
    shopCategoriesData: res.data,
  };
};

export const useShopCategory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [shopCategoryQueryKey, props],
    queryFn: () => api.apis.ShopCategory.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoadingShopCategory: res.isLoading,
    isErrorShopCategory: res.isError,
    shopCategoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateShopCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ShopCategory.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateShopCategories: res.isPending,
    isErrorCreateShopCategories: res.isError,
    createShopCategories: res.mutate,
    createdShopCategories: res.data,
  };
};

export const useCreateListShopCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ShopCategory.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateListShopCategories: res.isPending,
    isErrorCreateListShopCategories: res.isError,
    createListShopCategories: res.mutate,
    createdListShopCategories: res.data,
  };
};

export const useCreateShopCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ShopCategory.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingCreateShopCategory: res.isPending,
    isErrorCreateShopCategory: res.isError,
    createShopCategory: res.mutate,
    createdShopCategory: res.data,
  };
};

export const useUpdateShopCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ShopCategory.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateShopCategories: res.isPending,
    isErrorUpdateShopCategories: res.isError,
    updateShopCategories: res.mutate,
    updatedShopCategories: res.data,
  };
};

export const useUpdateListShopCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ShopCategory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateListShopCategories: res.isPending,
    isErrorUpdateListShopCategories: res.isError,
    updateListShopCategories: res.mutate,
    updatedListShopCategories: res.data,
  };
};

export const useUpdateShopCategoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ShopCategory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateShopCategoriesList: res.isPending,
    isErrorUpdateShopCategoriesList: res.isError,
    updateShopCategoriesList: res.mutate,
    updatedShopCategoriesList: res.data,
  };
};

export const useUpdateShopCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ShopCategory.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateShopCategory: res.isPending,
    isErrorUpdateShopCategory: res.isError,
    updateShopCategory: res.mutate,
    updatedShopCategory: res.data,
  };
};

export const useDeleteShopCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.ShopCategory.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteShopCategories: res.isPending,
    isErrorDeleteShopCategories: res.isError,
    deleteShopCategories: res.mutate,
  };
};

export const useDeleteAllShopCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.ShopCategory.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteAllShopCategories: res.isPending,
    isErrorDeleteAllShopCategories: res.isError,
    deleteAllShopCategories: res.mutate,
  };
};

export const useDeleteShopCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.ShopCategory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteShopCategoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteShopCategory: res.isPending,
    isErrorDeleteShopCategory: res.isError,
    deleteShopCategory: res.mutate,
    deleteShopCategoryFromTable,
  };
};
