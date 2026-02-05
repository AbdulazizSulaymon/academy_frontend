import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const viewNotificationsQueryKey = 'view-notifications';
export const viewNotificationQueryKey = 'view-notification';
export const viewNotificationExistQueryKey = 'exist-view-notification';
export const viewNotificationsCountQueryKey = 'count-view-notifications';

export const viewNotificationsAggregateQueryKey = 'aggregate-view-notifications';

export const useAggregateViewNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [viewNotificationsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/viewNotification/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoadingAggregateViewNotification: res.isLoading,
    isErrorAggregateViewNotification: res.isError,
    aggregateViewNotifications: res.data,
  };
};

export const useCountViewNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [viewNotificationsCountQueryKey, props],
    queryFn: () => api.apis.ViewNotification.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingCountViewNotification: res.isLoading,
    isErrorCountViewNotification: res.isError,
    countViewNotifications: res.data,
  };
};

export const useExistViewNotification = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [viewNotificationExistQueryKey, props],
    queryFn: () => api.apis.ViewNotification.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingExistViewNotification: res.isLoading,
    isErrorExistViewNotification: res.isError,
    existViewNotification: res.data,
  };
};

export const useViewNotificationsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [viewNotificationsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.ViewNotification.findMany({
        ...tableFetchProps,
        ...props,
      }),
    enabled:
      typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    ...options,
  });

  return {
    ...res,
    isLoadingViewNotifications: res.isLoading,
    isErrorViewNotifications: res.isError,
    viewNotificationsData: res.data,
  };
};

export const useViewNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [viewNotificationsQueryKey, props],
    queryFn: () => api.apis.ViewNotification.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoadingViewNotifications: res.isLoading,
    isErrorViewNotifications: res.isError,
    viewNotificationsData: res.data,
  };
};

export const useViewNotification = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [viewNotificationQueryKey, props],
    queryFn: () => api.apis.ViewNotification.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoadingViewNotification: res.isLoading,
    isErrorViewNotification: res.isError,
    viewNotificationData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ViewNotification.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateViewNotifications: res.isPending,
    isErrorCreateViewNotifications: res.isError,
    createViewNotifications: res.mutate,
    createdViewNotifications: res.data,
  };
};

export const useCreateListViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ViewNotification.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateListViewNotifications: res.isPending,
    isErrorCreateListViewNotifications: res.isError,
    createListViewNotifications: res.mutate,
    createdListViewNotifications: res.data,
  };
};

export const useCreateViewNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ViewNotification.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingCreateViewNotification: res.isPending,
    isErrorCreateViewNotification: res.isError,
    createViewNotification: res.mutate,
    createdViewNotification: res.data,
  };
};

export const useUpdateViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ViewNotification.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateViewNotifications: res.isPending,
    isErrorUpdateViewNotifications: res.isError,
    updateViewNotifications: res.mutate,
    updatedViewNotifications: res.data,
  };
};

export const useUpdateListViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ViewNotification.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateListViewNotifications: res.isPending,
    isErrorUpdateListViewNotifications: res.isError,
    updateListViewNotifications: res.mutate,
    updatedListViewNotifications: res.data,
  };
};

export const useUpdateViewNotificationsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ViewNotification.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateViewNotificationsList: res.isPending,
    isErrorUpdateViewNotificationsList: res.isError,
    updateViewNotificationsList: res.mutate,
    updatedViewNotificationsList: res.data,
  };
};

export const useUpdateViewNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ViewNotification.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateViewNotification: res.isPending,
    isErrorUpdateViewNotification: res.isError,
    updateViewNotification: res.mutate,
    updatedViewNotification: res.data,
  };
};

export const useDeleteViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.ViewNotification.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteViewNotifications: res.isPending,
    isErrorDeleteViewNotifications: res.isError,
    deleteViewNotifications: res.mutate,
  };
};

export const useDeleteAllViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.ViewNotification.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteAllViewNotifications: res.isPending,
    isErrorDeleteAllViewNotifications: res.isError,
    deleteAllViewNotifications: res.mutate,
  };
};

export const useDeleteViewNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.ViewNotification.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteViewNotificationFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteViewNotification: res.isPending,
    isErrorDeleteViewNotification: res.isError,
    deleteViewNotification: res.mutate,
    deleteViewNotificationFromTable,
  };
};
