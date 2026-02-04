import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const productsQueryKey = 'products';
export const productQueryKey = 'product';
export const productExistQueryKey = 'exist-product';
export const productsCountQueryKey = 'count-products';

export const productsAggregateQueryKey = 'aggregate-products';

export const useAggregateProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [productsAggregateQueryKey, props],
    () => api.instance.post('/api/product/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateProduct: res.isLoading,
    isErrorAggregateProduct: res.isError,
    aggregateProducts: res.data,
  };
};

export const useCountProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([productsCountQueryKey, props], () => api.apis.Product.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountProduct: res.isLoading,
    isErrorCountProduct: res.isError,
    countProducts: res.data,
  };
};

export const useExistProduct = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([productExistQueryKey, props], () => api.apis.Product.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistProduct: res.isLoading,
    isErrorExistProduct: res.isError,
    existProduct: res.data,
  };
};

export const useProductsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [productsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Product.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingProducts: res.isLoading, isErrorProducts: res.isError, productsData: res.data };
};

export const useProducts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([productsQueryKey, props], () => api.apis.Product.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingProducts: res.isLoading, isErrorProducts: res.isError, productsData: res.data };
};

export const useProduct = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([productQueryKey, props], () => api.apis.Product.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingProduct: res.isLoading,
    isErrorProduct: res.isError,
    productData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Product.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateProducts: res.isLoading,
    isErrorCreateProducts: res.isError,
    createProducts: res.mutate,
    createdProducts: res.data,
  };
};

export const useCreateListProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Product.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListProducts: res.isLoading,
    isErrorCreateListProducts: res.isError,
    createListProducts: res.mutate,
    createdListProducts: res.data,
  };
};

export const useCreateProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Product.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateProduct: res.isLoading,
    isErrorCreateProduct: res.isError,
    createProduct: res.mutate,
    createdProduct: res.data,
  };
};

export const useUpdateProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Product.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateProducts: res.isLoading,
    isErrorUpdateProducts: res.isError,
    updateProducts: res.mutate,
    updatedProducts: res.data,
  };
};

export const useUpdateListProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Product.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListProducts: res.isLoading,
    isErrorUpdateListProducts: res.isError,
    updateListProducts: res.mutate,
    updatedListProducts: res.data,
  };
};

export const useUpdateProductsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Product.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateProductsList: res.isLoading,
    isErrorUpdateProductsList: res.isError,
    updateProductsList: res.mutate,
    updatedProductsList: res.data,
  };
};

export const useUpdateProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Product.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateProduct: res.isLoading,
    isErrorUpdateProduct: res.isError,
    updateProduct: res.mutate,
    updatedProduct: res.data,
  };
};

export const useDeleteProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Product.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteProducts: res.isLoading,
    isErrorDeleteProducts: res.isError,
    deleteProducts: res.mutate,
  };
};

export const useDeleteAllProducts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Product.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllProducts: res.isLoading,
    isErrorDeleteAllProducts: res.isError,
    deleteAllProducts: res.mutate,
  };
};

export const useDeleteProduct = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Product.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteProductFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteProduct: res.isLoading,
    isErrorDeleteProduct: res.isError,
    deleteProduct: res.mutate,
    deleteProductFromTable,
  };
};
