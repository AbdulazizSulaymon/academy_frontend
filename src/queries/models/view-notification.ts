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
  const res = useQuery(
    [viewNotificationsAggregateQueryKey, props],
    () => api.instance.post('/api/viewNotification/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateViewNotification: res.isLoading,
    isErrorAggregateViewNotification: res.isError,
    aggregateViewNotifications: res.data,
  };
};

export const useCountViewNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [viewNotificationsCountQueryKey, props],
    () => api.apis.ViewNotification.count({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingCountViewNotification: res.isLoading,
    isErrorCountViewNotification: res.isError,
    countViewNotifications: res.data,
  };
};

export const useExistViewNotification = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [viewNotificationExistQueryKey, props],
    () => api.apis.ViewNotification.exist({ ...props }),
    options,
  );
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
  const res = useQuery(
    [viewNotificationsQueryKey, tableFetchProps, props],
    () =>
      api.apis.ViewNotification.findMany({
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
    isLoadingViewNotifications: res.isLoading,
    isErrorViewNotifications: res.isError,
    viewNotificationsData: res.data,
  };
};

export const useViewNotifications = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([viewNotificationsQueryKey, props], () => api.apis.ViewNotification.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
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
  const res = useQuery(
    [viewNotificationQueryKey, props],
    () => api.apis.ViewNotification.findOne({ ...props }),
    options as any,
  );
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
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ViewNotification.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateViewNotifications: res.isLoading,
    isErrorCreateViewNotifications: res.isError,
    createViewNotifications: res.mutate,
    createdViewNotifications: res.data,
  };
};

export const useCreateListViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ViewNotification.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListViewNotifications: res.isLoading,
    isErrorCreateListViewNotifications: res.isError,
    createListViewNotifications: res.mutate,
    createdListViewNotifications: res.data,
  };
};

export const useCreateViewNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ViewNotification.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateViewNotification: res.isLoading,
    isErrorCreateViewNotification: res.isError,
    createViewNotification: res.mutate,
    createdViewNotification: res.data,
  };
};

export const useUpdateViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ViewNotification.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateViewNotifications: res.isLoading,
    isErrorUpdateViewNotifications: res.isError,
    updateViewNotifications: res.mutate,
    updatedViewNotifications: res.data,
  };
};

export const useUpdateListViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ViewNotification.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListViewNotifications: res.isLoading,
    isErrorUpdateListViewNotifications: res.isError,
    updateListViewNotifications: res.mutate,
    updatedListViewNotifications: res.data,
  };
};

export const useUpdateViewNotificationsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ViewNotification.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateViewNotificationsList: res.isLoading,
    isErrorUpdateViewNotificationsList: res.isError,
    updateViewNotificationsList: res.mutate,
    updatedViewNotificationsList: res.data,
  };
};

export const useUpdateViewNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ViewNotification.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateViewNotification: res.isLoading,
    isErrorUpdateViewNotification: res.isError,
    updateViewNotification: res.mutate,
    updatedViewNotification: res.data,
  };
};

export const useDeleteViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.ViewNotification.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteViewNotifications: res.isLoading,
    isErrorDeleteViewNotifications: res.isError,
    deleteViewNotifications: res.mutate,
  };
};

export const useDeleteAllViewNotifications = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.ViewNotification.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllViewNotifications: res.isLoading,
    isErrorDeleteAllViewNotifications: res.isError,
    deleteAllViewNotifications: res.mutate,
  };
};

export const useDeleteViewNotification = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.ViewNotification.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteViewNotificationFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteViewNotification: res.isLoading,
    isErrorDeleteViewNotification: res.isError,
    deleteViewNotification: res.mutate,
    deleteViewNotificationFromTable,
  };
};
