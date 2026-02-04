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
  const res = useQuery(
    [orderItemsAggregateQueryKey, props],
    () => api.instance.post('/api/orderItem/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateOrderItem: res.isLoading,
    isErrorAggregateOrderItem: res.isError,
    aggregateOrderItems: res.data,
  };
};

export const useCountOrderItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderItemsCountQueryKey, props], () => api.apis.OrderItem.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountOrderItem: res.isLoading,
    isErrorCountOrderItem: res.isError,
    countOrderItems: res.data,
  };
};

export const useExistOrderItem = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderItemExistQueryKey, props], () => api.apis.OrderItem.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistOrderItem: res.isLoading,
    isErrorExistOrderItem: res.isError,
    existOrderItem: res.data,
  };
};

export const useOrderItemsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [orderItemsQueryKey, tableFetchProps, props],
    () =>
      api.apis.OrderItem.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingOrderItems: res.isLoading, isErrorOrderItems: res.isError, orderItemsData: res.data };
};

export const useOrderItems = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderItemsQueryKey, props], () => api.apis.OrderItem.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingOrderItems: res.isLoading, isErrorOrderItems: res.isError, orderItemsData: res.data };
};

export const useOrderItem = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderItemQueryKey, props], () => api.apis.OrderItem.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingOrderItem: res.isLoading,
    isErrorOrderItem: res.isError,
    orderItemData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.OrderItem.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateOrderItems: res.isLoading,
    isErrorCreateOrderItems: res.isError,
    createOrderItems: res.mutate,
    createdOrderItems: res.data,
  };
};

export const useCreateListOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.OrderItem.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListOrderItems: res.isLoading,
    isErrorCreateListOrderItems: res.isError,
    createListOrderItems: res.mutate,
    createdListOrderItems: res.data,
  };
};

export const useCreateOrderItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.OrderItem.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateOrderItem: res.isLoading,
    isErrorCreateOrderItem: res.isError,
    createOrderItem: res.mutate,
    createdOrderItem: res.data,
  };
};

export const useUpdateOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderItem.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrderItems: res.isLoading,
    isErrorUpdateOrderItems: res.isError,
    updateOrderItems: res.mutate,
    updatedOrderItems: res.data,
  };
};

export const useUpdateListOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderItem.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListOrderItems: res.isLoading,
    isErrorUpdateListOrderItems: res.isError,
    updateListOrderItems: res.mutate,
    updatedListOrderItems: res.data,
  };
};

export const useUpdateOrderItemsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderItem.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrderItemsList: res.isLoading,
    isErrorUpdateOrderItemsList: res.isError,
    updateOrderItemsList: res.mutate,
    updatedOrderItemsList: res.data,
  };
};

export const useUpdateOrderItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderItem.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrderItem: res.isLoading,
    isErrorUpdateOrderItem: res.isError,
    updateOrderItem: res.mutate,
    updatedOrderItem: res.data,
  };
};

export const useDeleteOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.OrderItem.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteOrderItems: res.isLoading,
    isErrorDeleteOrderItems: res.isError,
    deleteOrderItems: res.mutate,
  };
};

export const useDeleteAllOrderItems = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.OrderItem.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllOrderItems: res.isLoading,
    isErrorDeleteAllOrderItems: res.isError,
    deleteAllOrderItems: res.mutate,
  };
};

export const useDeleteOrderItem = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.OrderItem.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteOrderItemFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteOrderItem: res.isLoading,
    isErrorDeleteOrderItem: res.isError,
    deleteOrderItem: res.mutate,
    deleteOrderItemFromTable,
  };
};
