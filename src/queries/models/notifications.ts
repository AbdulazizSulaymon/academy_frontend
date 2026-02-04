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
  const res = useQuery(
    [notificationsAggregateQueryKey, props],
    () => api.instance.post('/api/notification/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateNotifications: res.isLoading,
    isErrorAggregateNotifications: res.isError,
    aggregateNotifications: res.data,
  };
};

export const useCountNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([notificationsCountQueryKey, props], () => api.apis.Notifications.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountNotifications: res.isLoading,
    isErrorCountNotifications: res.isError,
    countNotifications: res.data,
  };
};

export const useExistNotification = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([notificationExistQueryKey, props], () => api.apis.Notifications.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistNotifications: res.isLoading,
    isErrorExistNotifications: res.isError,
    existNotification: res.data,
  };
};

export const useNotificationsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [notificationsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Notifications.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return {
    ...res,
    isLoadingNotifications: res.isLoading,
    isErrorNotifications: res.isError,
    notificationsData: res.data,
  };
};

export const useNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([notificationsQueryKey, props], () => api.apis.Notifications.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingNotifications: res.isLoading,
    isErrorNotifications: res.isError,
    notificationsData: res.data,
  };
};

export const useNotification = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [notificationQueryKey, props],
    () => api.apis.Notifications.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingNotification: res.isLoading,
    isErrorNotification: res.isError,
    notificationData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Notifications.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateNotifications: res.isLoading,
    isErrorCreateNotifications: res.isError,
    createNotifications: res.mutate,
    createdNotifications: res.data,
  };
};

export const useCreateListNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Notifications.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListNotifications: res.isLoading,
    isErrorCreateListNotifications: res.isError,
    createListNotifications: res.mutate,
    createdListNotifications: res.data,
  };
};

export const useCreateNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Notifications.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateNotification: res.isLoading,
    isErrorCreateNotification: res.isError,
    createNotification: res.mutate,
    createdNotification: res.data,
  };
};

export const useUpdateNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notifications.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateNotifications: res.isLoading,
    isErrorUpdateNotifications: res.isError,
    updateNotifications: res.mutate,
    updatedNotifications: res.data,
  };
};

export const useUpdateListNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notifications.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListNotifications: res.isLoading,
    isErrorUpdateListNotifications: res.isError,
    updateListNotifications: res.mutate,
    updatedListNotifications: res.data,
  };
};

export const useUpdateNotificationsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notifications.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateNotificationsList: res.isLoading,
    isErrorUpdateNotificationsList: res.isError,
    updateNotificationsList: res.mutate,
    updatedNotificationsList: res.data,
  };
};

export const useUpdateNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notifications.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateNotification: res.isLoading,
    isErrorUpdateNotification: res.isError,
    updateNotification: res.mutate,
    updatedNotification: res.data,
  };
};

export const useDeleteNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Notifications.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteNotifications: res.isLoading,
    isErrorDeleteNotifications: res.isError,
    deleteNotifications: res.mutate,
  };
};

export const useDeleteAllNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Notifications.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllNotifications: res.isLoading,
    isErrorDeleteAllNotifications: res.isError,
    deleteAllNotifications: res.mutate,
  };
};

export const useDeleteNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Notifications.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteNotificationFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteNotification: res.isLoading,
    isErrorDeleteNotification: res.isError,
    deleteNotification: res.mutate,
    deleteNotificationFromTable,
  };
};
