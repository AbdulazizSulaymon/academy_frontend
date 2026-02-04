import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const cartsQueryKey = 'carts';
export const cartQueryKey = 'cart';
export const cartExistQueryKey = 'exist-cart';
export const cartsCountQueryKey = 'count-carts';

export const cartsAggregateQueryKey = 'aggregate-carts';

export const useAggregateCarts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartsAggregateQueryKey, props], () => api.instance.post('/api/cart/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregateCart: res.isLoading,
    isErrorAggregateCart: res.isError,
    aggregateCarts: res.data,
  };
};

export const useCountCarts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartsCountQueryKey, props], () => api.apis.Cart.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountCart: res.isLoading,
    isErrorCountCart: res.isError,
    countCarts: res.data,
  };
};

export const useExistCart = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartExistQueryKey, props], () => api.apis.Cart.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistCart: res.isLoading,
    isErrorExistCart: res.isError,
    existCart: res.data,
  };
};

export const useCartsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [cartsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Cart.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingCarts: res.isLoading, isErrorCarts: res.isError, cartsData: res.data };
};

export const useCarts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartsQueryKey, props], () => api.apis.Cart.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingCarts: res.isLoading, isErrorCarts: res.isError, cartsData: res.data };
};

export const useCart = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartQueryKey, props], () => api.apis.Cart.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingCart: res.isLoading,
    isErrorCart: res.isError,
    cartData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateCarts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Cart.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateCarts: res.isLoading,
    isErrorCreateCarts: res.isError,
    createCarts: res.mutate,
    createdCarts: res.data,
  };
};

export const useCreateListCarts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Cart.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListCarts: res.isLoading,
    isErrorCreateListCarts: res.isError,
    createListCarts: res.mutate,
    createdListCarts: res.data,
  };
};

export const useCreateCart = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Cart.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateCart: res.isLoading,
    isErrorCreateCart: res.isError,
    createCart: res.mutate,
    createdCart: res.data,
  };
};

export const useUpdateCarts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Cart.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCarts: res.isLoading,
    isErrorUpdateCarts: res.isError,
    updateCarts: res.mutate,
    updatedCarts: res.data,
  };
};

export const useUpdateListCarts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Cart.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListCarts: res.isLoading,
    isErrorUpdateListCarts: res.isError,
    updateListCarts: res.mutate,
    updatedListCarts: res.data,
  };
};

export const useUpdateCartsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Cart.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCartsList: res.isLoading,
    isErrorUpdateCartsList: res.isError,
    updateCartsList: res.mutate,
    updatedCartsList: res.data,
  };
};

export const useUpdateCart = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Cart.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCart: res.isLoading,
    isErrorUpdateCart: res.isError,
    updateCart: res.mutate,
    updatedCart: res.data,
  };
};

export const useDeleteCarts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Cart.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteCarts: res.isLoading,
    isErrorDeleteCarts: res.isError,
    deleteCarts: res.mutate,
  };
};

export const useDeleteAllCarts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Cart.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllCarts: res.isLoading,
    isErrorDeleteAllCarts: res.isError,
    deleteAllCarts: res.mutate,
  };
};

export const useDeleteCart = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Cart.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteCartFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteCart: res.isLoading,
    isErrorDeleteCart: res.isError,
    deleteCart: res.mutate,
    deleteCartFromTable,
  };
};
