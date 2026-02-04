import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const brandsQueryKey = 'brands';
export const brandQueryKey = 'brand';
export const brandExistQueryKey = 'exist-brand';
export const brandsCountQueryKey = 'count-brands';

export const brandsAggregateQueryKey = 'aggregate-brands';

export const useAggregateBrands = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [brandsAggregateQueryKey, props],
    () => api.instance.post('/api/brand/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateBrand: res.isLoading,
    isErrorAggregateBrand: res.isError,
    aggregateBrands: res.data,
  };
};

export const useCountBrands = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([brandsCountQueryKey, props], () => api.apis.Brand.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountBrand: res.isLoading,
    isErrorCountBrand: res.isError,
    countBrands: res.data,
  };
};

export const useExistBrand = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([brandExistQueryKey, props], () => api.apis.Brand.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistBrand: res.isLoading,
    isErrorExistBrand: res.isError,
    existBrand: res.data,
  };
};

export const useBrandsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [brandsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Brand.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingBrands: res.isLoading, isErrorBrands: res.isError, brandsData: res.data };
};

export const useBrands = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([brandsQueryKey, props], () => api.apis.Brand.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingBrands: res.isLoading, isErrorBrands: res.isError, brandsData: res.data };
};

export const useBrand = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([brandQueryKey, props], () => api.apis.Brand.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingBrand: res.isLoading,
    isErrorBrand: res.isError,
    brandData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateBrands = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Brand.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateBrands: res.isLoading,
    isErrorCreateBrands: res.isError,
    createBrands: res.mutate,
    createdBrands: res.data,
  };
};

export const useCreateListBrands = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Brand.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListBrands: res.isLoading,
    isErrorCreateListBrands: res.isError,
    createListBrands: res.mutate,
    createdListBrands: res.data,
  };
};

export const useCreateBrand = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Brand.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateBrand: res.isLoading,
    isErrorCreateBrand: res.isError,
    createBrand: res.mutate,
    createdBrand: res.data,
  };
};

export const useUpdateBrands = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Brand.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBrands: res.isLoading,
    isErrorUpdateBrands: res.isError,
    updateBrands: res.mutate,
    updatedBrands: res.data,
  };
};

export const useUpdateListBrands = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Brand.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListBrands: res.isLoading,
    isErrorUpdateListBrands: res.isError,
    updateListBrands: res.mutate,
    updatedListBrands: res.data,
  };
};

export const useUpdateBrandsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Brand.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBrandsList: res.isLoading,
    isErrorUpdateBrandsList: res.isError,
    updateBrandsList: res.mutate,
    updatedBrandsList: res.data,
  };
};

export const useUpdateBrand = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Brand.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBrand: res.isLoading,
    isErrorUpdateBrand: res.isError,
    updateBrand: res.mutate,
    updatedBrand: res.data,
  };
};

export const useDeleteBrands = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Brand.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteBrands: res.isLoading,
    isErrorDeleteBrands: res.isError,
    deleteBrands: res.mutate,
  };
};

export const useDeleteAllBrands = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Brand.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllBrands: res.isLoading,
    isErrorDeleteAllBrands: res.isError,
    deleteAllBrands: res.mutate,
  };
};

export const useDeleteBrand = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Brand.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteBrandFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteBrand: res.isLoading,
    isErrorDeleteBrand: res.isError,
    deleteBrand: res.mutate,
    deleteBrandFromTable,
  };
};
