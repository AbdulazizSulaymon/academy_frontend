import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const cartItemsQueryKey = 'cart-items';
export const cartItemQueryKey = 'cart-item';
export const cartItemExistQueryKey = 'exist-cart-item';
export const cartItemsCountQueryKey = 'count-cart-items';

export const cartItemsAggregateQueryKey = 'aggregate-cart-items';

export const useAggregateCartItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [cartItemsAggregateQueryKey, props],
    () => api.instance.post('/api/cartItem/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateCartItem: res.isLoading,
    isErrorAggregateCartItem: res.isError,
    aggregateCartItems: res.data,
  };
};

export const useCountCartItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartItemsCountQueryKey, props], () => api.apis.CartItem.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountCartItem: res.isLoading,
    isErrorCountCartItem: res.isError,
    countCartItems: res.data,
  };
};

export const useExistCartItem = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartItemExistQueryKey, props], () => api.apis.CartItem.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistCartItem: res.isLoading,
    isErrorExistCartItem: res.isError,
    existCartItem: res.data,
  };
};

export const useCartItemsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [cartItemsQueryKey, tableFetchProps, props],
    () =>
      api.apis.CartItem.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingCartItems: res.isLoading, isErrorCartItems: res.isError, cartItemsData: res.data };
};

export const useCartItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartItemsQueryKey, props], () => api.apis.CartItem.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingCartItems: res.isLoading, isErrorCartItems: res.isError, cartItemsData: res.data };
};

export const useCartItem = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([cartItemQueryKey, props], () => api.apis.CartItem.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingCartItem: res.isLoading,
    isErrorCartItem: res.isError,
    cartItemData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateCartItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CartItem.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateCartItems: res.isLoading,
    isErrorCreateCartItems: res.isError,
    createCartItems: res.mutate,
    createdCartItems: res.data,
  };
};

export const useCreateListCartItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CartItem.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListCartItems: res.isLoading,
    isErrorCreateListCartItems: res.isError,
    createListCartItems: res.mutate,
    createdListCartItems: res.data,
  };
};

export const useCreateCartItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CartItem.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateCartItem: res.isLoading,
    isErrorCreateCartItem: res.isError,
    createCartItem: res.mutate,
    createdCartItem: res.data,
  };
};

export const useUpdateCartItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CartItem.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCartItems: res.isLoading,
    isErrorUpdateCartItems: res.isError,
    updateCartItems: res.mutate,
    updatedCartItems: res.data,
  };
};

export const useUpdateListCartItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CartItem.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListCartItems: res.isLoading,
    isErrorUpdateListCartItems: res.isError,
    updateListCartItems: res.mutate,
    updatedListCartItems: res.data,
  };
};

export const useUpdateCartItemsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CartItem.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCartItemsList: res.isLoading,
    isErrorUpdateCartItemsList: res.isError,
    updateCartItemsList: res.mutate,
    updatedCartItemsList: res.data,
  };
};

export const useUpdateCartItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CartItem.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCartItem: res.isLoading,
    isErrorUpdateCartItem: res.isError,
    updateCartItem: res.mutate,
    updatedCartItem: res.data,
  };
};

export const useDeleteCartItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.CartItem.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteCartItems: res.isLoading,
    isErrorDeleteCartItems: res.isError,
    deleteCartItems: res.mutate,
  };
};

export const useDeleteAllCartItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.CartItem.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllCartItems: res.isLoading,
    isErrorDeleteAllCartItems: res.isError,
    deleteAllCartItems: res.mutate,
  };
};

export const useDeleteCartItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.CartItem.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteCartItemFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteCartItem: res.isLoading,
    isErrorDeleteCartItem: res.isError,
    deleteCartItem: res.mutate,
    deleteCartItemFromTable,
  };
};
