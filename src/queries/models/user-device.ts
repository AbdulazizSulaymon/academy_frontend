import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const userDevicesQueryKey = 'user-devices';
export const userDeviceQueryKey = 'user-device';
export const userDeviceExistQueryKey = 'exist-user-device';
export const userDevicesCountQueryKey = 'count-user-devices';

export const userDevicesAggregateQueryKey = 'aggregate-user-devices';

export const useAggregateUserDevices = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userDevicesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/userDevice/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateUserDevice: res.isLoading,
    isError: res.isError,
    isErrorAggregateUserDevice: res.isError,
    aggregateUserDevices: res.data,
  };
};

export const useCountUserDevices = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userDevicesCountQueryKey, props],
    queryFn: () => api.apis.UserDevice.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountUserDevice: res.isLoading,
    isError: res.isError,
    isErrorCountUserDevice: res.isError,
    countUserDevices: res.data,
  };
};

export const useExistUserDevice = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userDeviceExistQueryKey, props],
    queryFn: () => api.apis.UserDevice.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistUserDevice: res.isLoading,
    isError: res.isError,
    isErrorExistUserDevice: res.isError,
    existUserDevice: res.data,
  };
};

export const useUserDevicesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [userDevicesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.UserDevice.findMany({
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
    isLoadingUserDevices: res.isLoading,
    isError: res.isError,
    isErrorUserDevices: res.isError,
    userDevicesData: res.data,
  };
};

export const useUserDevices = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userDevicesQueryKey, props],
    queryFn: () => api.apis.UserDevice.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserDevices: res.isLoading,
    isError: res.isError,
    isErrorUserDevices: res.isError,
    userDevicesData: res.data,
  };
};

export const useUserDevice = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userDeviceQueryKey, props],
    queryFn: () => api.apis.UserDevice.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserDevice: res.isLoading,
    isError: res.isError,
    isErrorUserDevice: res.isError,
    userDeviceData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserDevice.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserDevices: res.isPending,
    isError: res.isError,
    isErrorCreateUserDevices: res.isError,
    createUserDevices: res.mutate,
    createdUserDevices: res.data,
  };
};

export const useCreateListUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserDevice.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListUserDevices: res.isPending,
    isError: res.isError,
    isErrorCreateListUserDevices: res.isError,
    createListUserDevices: res.mutate,
    createdListUserDevices: res.data,
  };
};

export const useCreateUserDevice = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserDevice.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserDevice: res.isPending,
    isError: res.isError,
    isErrorCreateUserDevice: res.isError,
    createUserDevice: res.mutate,
    createdUserDevice: res.data,
  };
};

export const useUpdateUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserDevice.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserDevices: res.isPending,
    isError: res.isError,
    isErrorUpdateUserDevices: res.isError,
    updateUserDevices: res.mutate,
    updatedUserDevices: res.data,
  };
};

export const useUpdateListUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserDevice.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListUserDevices: res.isPending,
    isError: res.isError,
    isErrorUpdateListUserDevices: res.isError,
    updateListUserDevices: res.mutate,
    updatedListUserDevices: res.data,
  };
};

export const useUpdateUserDevicesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserDevice.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserDevicesList: res.isPending,
    isError: res.isError,
    isErrorUpdateUserDevicesList: res.isError,
    updateUserDevicesList: res.mutate,
    updatedUserDevicesList: res.data,
  };
};

export const useUpdateUserDevice = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserDevice.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserDevice: res.isPending,
    isError: res.isError,
    isErrorUpdateUserDevice: res.isError,
    updateUserDevice: res.mutate,
    updatedUserDevice: res.data,
  };
};

export const useDeleteUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.UserDevice.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserDevices: res.isPending,
    isError: res.isError,
    isErrorDeleteUserDevices: res.isError,
    deleteUserDevices: res.mutate,
  };
};

export const useDeleteAllUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.UserDevice.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllUserDevices: res.isPending,
    isError: res.isError,
    isErrorDeleteAllUserDevices: res.isError,
    deleteAllUserDevices: res.mutate,
  };
};

export const useDeleteUserDevice = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.UserDevice.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteUserDeviceFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserDevice: res.isPending,
    isError: res.isError,
    isErrorDeleteUserDevice: res.isError,
    deleteUserDevice: res.mutate,
    deleteUserDeviceFromTable,
  };
};
