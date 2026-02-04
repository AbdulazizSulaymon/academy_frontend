import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const orderGroupsQueryKey = 'order-groups';
export const orderGroupQueryKey = 'order-group';
export const orderGroupExistQueryKey = 'exist-order-group';
export const orderGroupsCountQueryKey = 'count-order-groups';

export const orderGroupsAggregateQueryKey = 'aggregate-order-groups';

export const useAggregateOrderGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [orderGroupsAggregateQueryKey, props],
    () => api.instance.post('/api/orderGroup/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateOrderGroup: res.isLoading,
    isErrorAggregateOrderGroup: res.isError,
    aggregateOrderGroups: res.data,
  };
};

export const useCountOrderGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderGroupsCountQueryKey, props], () => api.apis.OrderGroup.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountOrderGroup: res.isLoading,
    isErrorCountOrderGroup: res.isError,
    countOrderGroups: res.data,
  };
};

export const useExistOrderGroup = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderGroupExistQueryKey, props], () => api.apis.OrderGroup.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistOrderGroup: res.isLoading,
    isErrorExistOrderGroup: res.isError,
    existOrderGroup: res.data,
  };
};

export const useOrderGroupsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [orderGroupsQueryKey, tableFetchProps, props],
    () =>
      api.apis.OrderGroup.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingOrderGroups: res.isLoading, isErrorOrderGroups: res.isError, orderGroupsData: res.data };
};

export const useOrderGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderGroupsQueryKey, props], () => api.apis.OrderGroup.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingOrderGroups: res.isLoading, isErrorOrderGroups: res.isError, orderGroupsData: res.data };
};

export const useOrderGroup = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([orderGroupQueryKey, props], () => api.apis.OrderGroup.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingOrderGroup: res.isLoading,
    isErrorOrderGroup: res.isError,
    orderGroupData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateOrderGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.OrderGroup.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateOrderGroups: res.isLoading,
    isErrorCreateOrderGroups: res.isError,
    createOrderGroups: res.mutate,
    createdOrderGroups: res.data,
  };
};

export const useCreateListOrderGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.OrderGroup.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListOrderGroups: res.isLoading,
    isErrorCreateListOrderGroups: res.isError,
    createListOrderGroups: res.mutate,
    createdListOrderGroups: res.data,
  };
};

export const useCreateOrderGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.OrderGroup.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateOrderGroup: res.isLoading,
    isErrorCreateOrderGroup: res.isError,
    createOrderGroup: res.mutate,
    createdOrderGroup: res.data,
  };
};

export const useUpdateOrderGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderGroup.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrderGroups: res.isLoading,
    isErrorUpdateOrderGroups: res.isError,
    updateOrderGroups: res.mutate,
    updatedOrderGroups: res.data,
  };
};

export const useUpdateListOrderGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderGroup.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListOrderGroups: res.isLoading,
    isErrorUpdateListOrderGroups: res.isError,
    updateListOrderGroups: res.mutate,
    updatedListOrderGroups: res.data,
  };
};

export const useUpdateOrderGroupsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderGroup.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrderGroupsList: res.isLoading,
    isErrorUpdateOrderGroupsList: res.isError,
    updateOrderGroupsList: res.mutate,
    updatedOrderGroupsList: res.data,
  };
};

export const useUpdateOrderGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.OrderGroup.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateOrderGroup: res.isLoading,
    isErrorUpdateOrderGroup: res.isError,
    updateOrderGroup: res.mutate,
    updatedOrderGroup: res.data,
  };
};

export const useDeleteOrderGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.OrderGroup.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteOrderGroups: res.isLoading,
    isErrorDeleteOrderGroups: res.isError,
    deleteOrderGroups: res.mutate,
  };
};

export const useDeleteAllOrderGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.OrderGroup.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllOrderGroups: res.isLoading,
    isErrorDeleteAllOrderGroups: res.isError,
    deleteAllOrderGroups: res.mutate,
  };
};

export const useDeleteOrderGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.OrderGroup.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteOrderGroupFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteOrderGroup: res.isLoading,
    isErrorDeleteOrderGroup: res.isError,
    deleteOrderGroup: res.mutate,
    deleteOrderGroupFromTable,
  };
};
