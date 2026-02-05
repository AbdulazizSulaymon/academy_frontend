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
  const res = useQuery({
    queryKey: [ordersAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/order/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateOrder: res.isLoading,
    isError: res.isError,
    isErrorAggregateOrder: res.isError,
    aggregateOrders: res.data,
  };
};

export const useCountOrders = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [ordersCountQueryKey, props],
    queryFn: () => api.apis.Order.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountOrder: res.isLoading,
    isError: res.isError,
    isErrorCountOrder: res.isError,
    countOrders: res.data,
  };
};

export const useExistOrder = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [orderExistQueryKey, props],
    queryFn: () => api.apis.Order.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistOrder: res.isLoading,
    isError: res.isError,
    isErrorExistOrder: res.isError,
    existOrder: res.data,
  };
};

export const useOrdersWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [ordersQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Order.findMany({
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
    isLoadingOrders: res.isLoading,
    isError: res.isError,
    isErrorOrders: res.isError,
    ordersData: res.data,
  };
};

export const useOrders = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [ordersQueryKey, props],
    queryFn: () => api.apis.Order.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingOrders: res.isLoading,
    isError: res.isError,
    isErrorOrders: res.isError,
    ordersData: res.data,
  };
};

export const useOrder = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [orderQueryKey, props],
    queryFn: () => api.apis.Order.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingOrder: res.isLoading,
    isError: res.isError,
    isErrorOrder: res.isError,
    orderData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Order.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateOrders: res.isPending,
    isError: res.isError,
    isErrorCreateOrders: res.isError,
    createOrders: res.mutate,
    createdOrders: res.data,
  };
};

export const useCreateListOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Order.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListOrders: res.isPending,
    isError: res.isError,
    isErrorCreateListOrders: res.isError,
    createListOrders: res.mutate,
    createdListOrders: res.data,
  };
};

export const useCreateOrder = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Order.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateOrder: res.isPending,
    isError: res.isError,
    isErrorCreateOrder: res.isError,
    createOrder: res.mutate,
    createdOrder: res.data,
  };
};

export const useUpdateOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Order.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateOrders: res.isPending,
    isError: res.isError,
    isErrorUpdateOrders: res.isError,
    updateOrders: res.mutate,
    updatedOrders: res.data,
  };
};

export const useUpdateListOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Order.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListOrders: res.isPending,
    isError: res.isError,
    isErrorUpdateListOrders: res.isError,
    updateListOrders: res.mutate,
    updatedListOrders: res.data,
  };
};

export const useUpdateOrdersList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Order.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateOrdersList: res.isPending,
    isError: res.isError,
    isErrorUpdateOrdersList: res.isError,
    updateOrdersList: res.mutate,
    updatedOrdersList: res.data,
  };
};

export const useUpdateOrder = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Order.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateOrder: res.isPending,
    isError: res.isError,
    isErrorUpdateOrder: res.isError,
    updateOrder: res.mutate,
    updatedOrder: res.data,
  };
};

export const useDeleteOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Order.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteOrders: res.isPending,
    isError: res.isError,
    isErrorDeleteOrders: res.isError,
    deleteOrders: res.mutate,
  };
};

export const useDeleteAllOrders = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Order.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllOrders: res.isPending,
    isError: res.isError,
    isErrorDeleteAllOrders: res.isError,
    deleteAllOrders: res.mutate,
  };
};

export const useDeleteOrder = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Order.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteOrderFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteOrder: res.isPending,
    isError: res.isError,
    isErrorDeleteOrder: res.isError,
    deleteOrder: res.mutate,
    deleteOrderFromTable,
  };
};
