import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const orderItemsQueryKey = 'order-items';
export const orderItemQueryKey = 'order-item';
export const orderItemExistQueryKey = 'exist-order-item';
export const orderItemsCountQueryKey = 'count-order-items';

export const orderItemsAggregateQueryKey = 'aggregate-order-items';

export const useAggregateOrderItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [orderItemsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/orderItem/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateOrderItem: res.isLoading,
    isError: res.isError,
    isErrorAggregateOrderItem: res.isError,
    aggregateOrderItems: res.data,
  };
};

export const useCountOrderItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [orderItemsCountQueryKey, props],
    queryFn: () => api.apis.OrderItem.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountOrderItem: res.isLoading,
    isError: res.isError,
    isErrorCountOrderItem: res.isError,
    countOrderItems: res.data,
  };
};

export const useExistOrderItem = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [orderItemExistQueryKey, props],
    queryFn: () => api.apis.OrderItem.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistOrderItem: res.isLoading,
    isError: res.isError,
    isErrorExistOrderItem: res.isError,
    existOrderItem: res.data,
  };
};

export const useOrderItemsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [orderItemsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.OrderItem.findMany({
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
    isLoadingOrderItems: res.isLoading,
    isError: res.isError,
    isErrorOrderItems: res.isError,
    orderItemsData: res.data,
  };
};

export const useOrderItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [orderItemsQueryKey, props],
    queryFn: () => api.apis.OrderItem.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingOrderItems: res.isLoading,
    isError: res.isError,
    isErrorOrderItems: res.isError,
    orderItemsData: res.data,
  };
};

export const useOrderItem = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [orderItemQueryKey, props],
    queryFn: () => api.apis.OrderItem.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingOrderItem: res.isLoading,
    isError: res.isError,
    isErrorOrderItem: res.isError,
    orderItemData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.OrderItem.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateOrderItems: res.isPending,
    isError: res.isError,
    isErrorCreateOrderItems: res.isError,
    createOrderItems: res.mutate,
    createdOrderItems: res.data,
  };
};

export const useCreateListOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.OrderItem.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListOrderItems: res.isPending,
    isError: res.isError,
    isErrorCreateListOrderItems: res.isError,
    createListOrderItems: res.mutate,
    createdListOrderItems: res.data,
  };
};

export const useCreateOrderItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.OrderItem.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateOrderItem: res.isPending,
    isError: res.isError,
    isErrorCreateOrderItem: res.isError,
    createOrderItem: res.mutate,
    createdOrderItem: res.data,
  };
};

export const useUpdateOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.OrderItem.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateOrderItems: res.isPending,
    isError: res.isError,
    isErrorUpdateOrderItems: res.isError,
    updateOrderItems: res.mutate,
    updatedOrderItems: res.data,
  };
};

export const useUpdateListOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.OrderItem.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListOrderItems: res.isPending,
    isError: res.isError,
    isErrorUpdateListOrderItems: res.isError,
    updateListOrderItems: res.mutate,
    updatedListOrderItems: res.data,
  };
};

export const useUpdateOrderItemsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.OrderItem.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateOrderItemsList: res.isPending,
    isError: res.isError,
    isErrorUpdateOrderItemsList: res.isError,
    updateOrderItemsList: res.mutate,
    updatedOrderItemsList: res.data,
  };
};

export const useUpdateOrderItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.OrderItem.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateOrderItem: res.isPending,
    isError: res.isError,
    isErrorUpdateOrderItem: res.isError,
    updateOrderItem: res.mutate,
    updatedOrderItem: res.data,
  };
};

export const useDeleteOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.OrderItem.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteOrderItems: res.isPending,
    isError: res.isError,
    isErrorDeleteOrderItems: res.isError,
    deleteOrderItems: res.mutate,
  };
};

export const useDeleteAllOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.OrderItem.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllOrderItems: res.isPending,
    isError: res.isError,
    isErrorDeleteAllOrderItems: res.isError,
    deleteAllOrderItems: res.mutate,
  };
};

export const useDeleteOrderItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.OrderItem.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteOrderItemFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteOrderItem: res.isPending,
    isError: res.isError,
    isErrorDeleteOrderItem: res.isError,
    deleteOrderItem: res.mutate,
    deleteOrderItemFromTable,
  };
};
