import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const ordersQueryKey = 'orders';
export const orderQueryKey = 'order';
export const orderExistQueryKey = 'exist-order';
export const ordersCountQueryKey = 'count-orders';

export const ordersAggregateQueryKey = 'aggregate-orders';

export const useAggregateOrders = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [ordersAggregateQueryKey, props],
    () => api.instance.post('/api/order/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateOrder: res.isLoading,
    isErrorAggregateOrder: res.isError,
    aggregateOrders: res.data,
  };
};

export const useCountOrders = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([ordersCountQueryKey, props], () => api.apis.Order.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountOrder: res.isLoading,
    isErrorCountOrder: res.isError,
    countOrders: res.data,
  };
};

export const useExistOrder = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderExistQueryKey, props], () => api.apis.Order.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistOrder: res.isLoading,
    isErrorExistOrder: res.isError,
    existOrder: res.data,
  };
};

export const useOrdersWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [ordersQueryKey, tableFetchProps, props],
    () =>
      api.apis.Order.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingOrders: res.isLoading, isErrorOrders: res.isError, ordersData: res.data };
};

export const useOrders = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([ordersQueryKey, props], () => api.apis.Order.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingOrders: res.isLoading, isErrorOrders: res.isError, ordersData: res.data };
};

export const useOrder = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderQueryKey, props], () => api.apis.Order.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingOrder: res.isLoading,
    isErrorOrder: res.isError,
    orderData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Order.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateOrders: res.isLoading,
    isErrorCreateOrders: res.isError,
    createOrders: res.mutate,
    createdOrders: res.data,
  };
};

export const useCreateListOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Order.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListOrders: res.isLoading,
    isErrorCreateListOrders: res.isError,
    createListOrders: res.mutate,
    createdListOrders: res.data,
  };
};

export const useCreateOrder = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Order.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateOrder: res.isLoading,
    isErrorCreateOrder: res.isError,
    createOrder: res.mutate,
    createdOrder: res.data,
  };
};

export const useUpdateOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Order.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrders: res.isLoading,
    isErrorUpdateOrders: res.isError,
    updateOrders: res.mutate,
    updatedOrders: res.data,
  };
};

export const useUpdateListOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Order.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListOrders: res.isLoading,
    isErrorUpdateListOrders: res.isError,
    updateListOrders: res.mutate,
    updatedListOrders: res.data,
  };
};

export const useUpdateOrdersList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Order.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrdersList: res.isLoading,
    isErrorUpdateOrdersList: res.isError,
    updateOrdersList: res.mutate,
    updatedOrdersList: res.data,
  };
};

export const useUpdateOrder = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Order.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrder: res.isLoading,
    isErrorUpdateOrder: res.isError,
    updateOrder: res.mutate,
    updatedOrder: res.data,
  };
};

export const useDeleteOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Order.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteOrders: res.isLoading,
    isErrorDeleteOrders: res.isError,
    deleteOrders: res.mutate,
  };
};

export const useDeleteAllOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Order.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllOrders: res.isLoading,
    isErrorDeleteAllOrders: res.isError,
    deleteAllOrders: res.mutate,
  };
};

export const useDeleteOrder = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Order.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteOrderFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteOrder: res.isLoading,
    isErrorDeleteOrder: res.isError,
    deleteOrder: res.mutate,
    deleteOrderFromTable,
  };
};
