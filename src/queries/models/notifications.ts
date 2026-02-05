import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const notificationsQueryKey = 'notifications';
export const notificationQueryKey = 'notification';
export const notificationExistQueryKey = 'exist-notification';
export const notificationsCountQueryKey = 'count-notifications';

export const notificationsAggregateQueryKey = 'aggregate-notifications';

export const useAggregateNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [notificationsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/notification/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateNotifications: res.isLoading,
    isError: res.isError,
    isErrorAggregateNotifications: res.isError,
    aggregateNotifications: res.data,
  };
};

export const useCountNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [notificationsCountQueryKey, props],
    queryFn: () => api.apis.Notifications.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountNotifications: res.isLoading,
    isError: res.isError,
    isErrorCountNotifications: res.isError,
    countNotifications: res.data,
  };
};

export const useExistNotification = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [notificationExistQueryKey, props],
    queryFn: () => api.apis.Notifications.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistNotifications: res.isLoading,
    isError: res.isError,
    isErrorExistNotifications: res.isError,
    existNotification: res.data,
  };
};

export const useNotificationsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [notificationsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Notifications.findMany({
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
    isLoadingNotifications: res.isLoading,
    isError: res.isError,
    isErrorNotifications: res.isError,
    notificationsData: res.data,
  };
};

export const useNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [notificationsQueryKey, props],
    queryFn: () => api.apis.Notifications.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingNotifications: res.isLoading,
    isError: res.isError,
    isErrorNotifications: res.isError,
    notificationsData: res.data,
  };
};

export const useNotification = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [notificationQueryKey, props],
    queryFn: () => api.apis.Notifications.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingNotification: res.isLoading,
    isError: res.isError,
    isErrorNotification: res.isError,
    notificationData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Notifications.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateNotifications: res.isPending,
    isError: res.isError,
    isErrorCreateNotifications: res.isError,
    createNotifications: res.mutate,
    createdNotifications: res.data,
  };
};

export const useCreateListNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Notifications.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListNotifications: res.isPending,
    isError: res.isError,
    isErrorCreateListNotifications: res.isError,
    createListNotifications: res.mutate,
    createdListNotifications: res.data,
  };
};

export const useCreateNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Notifications.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateNotification: res.isPending,
    isError: res.isError,
    isErrorCreateNotification: res.isError,
    createNotification: res.mutate,
    createdNotification: res.data,
  };
};

export const useUpdateNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notifications.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateNotifications: res.isPending,
    isError: res.isError,
    isErrorUpdateNotifications: res.isError,
    updateNotifications: res.mutate,
    updatedNotifications: res.data,
  };
};

export const useUpdateListNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notifications.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListNotifications: res.isPending,
    isError: res.isError,
    isErrorUpdateListNotifications: res.isError,
    updateListNotifications: res.mutate,
    updatedListNotifications: res.data,
  };
};

export const useUpdateNotificationsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notifications.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateNotificationsList: res.isPending,
    isError: res.isError,
    isErrorUpdateNotificationsList: res.isError,
    updateNotificationsList: res.mutate,
    updatedNotificationsList: res.data,
  };
};

export const useUpdateNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notifications.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateNotification: res.isPending,
    isError: res.isError,
    isErrorUpdateNotification: res.isError,
    updateNotification: res.mutate,
    updatedNotification: res.data,
  };
};

export const useDeleteNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Notifications.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteNotifications: res.isPending,
    isError: res.isError,
    isErrorDeleteNotifications: res.isError,
    deleteNotifications: res.mutate,
  };
};

export const useDeleteAllNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Notifications.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllNotifications: res.isPending,
    isError: res.isError,
    isErrorDeleteAllNotifications: res.isError,
    deleteAllNotifications: res.mutate,
  };
};

export const useDeleteNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Notifications.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteNotificationFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteNotification: res.isPending,
    isError: res.isError,
    isErrorDeleteNotification: res.isError,
    deleteNotification: res.mutate,
    deleteNotificationFromTable,
  };
};
