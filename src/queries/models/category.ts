import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const categoriesQueryKey = 'categories';
export const categoryQueryKey = 'category';
export const categoryExistQueryKey = 'exist-category';
export const categoriesCountQueryKey = 'count-categories';

export const categoriesAggregateQueryKey = 'aggregate-categories';

export const useAggregateCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [categoriesAggregateQueryKey, props],
    () => api.instance.post('/api/category/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateCategory: res.isLoading,
    isErrorAggregateCategory: res.isError,
    aggregateCategories: res.data,
  };
};

export const useCountCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([categoriesCountQueryKey, props], () => api.apis.Category.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountCategory: res.isLoading,
    isErrorCountCategory: res.isError,
    countCategories: res.data,
  };
};

export const useExistCategory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([categoryExistQueryKey, props], () => api.apis.Category.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistCategory: res.isLoading,
    isErrorExistCategory: res.isError,
    existCategory: res.data,
  };
};

export const useCategoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [categoriesQueryKey, tableFetchProps, props],
    () =>
      api.apis.Category.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingCategories: res.isLoading, isErrorCategories: res.isError, categoriesData: res.data };
};

export const useCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([categoriesQueryKey, props], () => api.apis.Category.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingCategories: res.isLoading, isErrorCategories: res.isError, categoriesData: res.data };
};

export const useCategory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([categoryQueryKey, props], () => api.apis.Category.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingCategory: res.isLoading,
    isErrorCategory: res.isError,
    categoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Category.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateCategories: res.isLoading,
    isErrorCreateCategories: res.isError,
    createCategories: res.mutate,
    createdCategories: res.data,
  };
};

export const useCreateListCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Category.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListCategories: res.isLoading,
    isErrorCreateListCategories: res.isError,
    createListCategories: res.mutate,
    createdListCategories: res.data,
  };
};

export const useCreateCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Category.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateCategory: res.isLoading,
    isErrorCreateCategory: res.isError,
    createCategory: res.mutate,
    createdCategory: res.data,
  };
};

export const useUpdateCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Category.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCategories: res.isLoading,
    isErrorUpdateCategories: res.isError,
    updateCategories: res.mutate,
    updatedCategories: res.data,
  };
};

export const useUpdateListCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Category.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListCategories: res.isLoading,
    isErrorUpdateListCategories: res.isError,
    updateListCategories: res.mutate,
    updatedListCategories: res.data,
  };
};

export const useUpdateCategoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Category.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCategoriesList: res.isLoading,
    isErrorUpdateCategoriesList: res.isError,
    updateCategoriesList: res.mutate,
    updatedCategoriesList: res.data,
  };
};

export const useUpdateCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Category.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCategory: res.isLoading,
    isErrorUpdateCategory: res.isError,
    updateCategory: res.mutate,
    updatedCategory: res.data,
  };
};

export const useDeleteCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Category.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteCategories: res.isLoading,
    isErrorDeleteCategories: res.isError,
    deleteCategories: res.mutate,
  };
};

export const useDeleteAllCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Category.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllCategories: res.isLoading,
    isErrorDeleteAllCategories: res.isError,
    deleteAllCategories: res.mutate,
  };
};

export const useDeleteCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Category.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteCategoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteCategory: res.isLoading,
    isErrorDeleteCategory: res.isError,
    deleteCategory: res.mutate,
    deleteCategoryFromTable,
  };
};
