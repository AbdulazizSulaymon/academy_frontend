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
    isLoadingAggregateUserDevice: res.isLoading,
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
    isLoadingCountUserDevice: res.isLoading,
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
    isLoadingExistUserDevice: res.isLoading,
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

  return { ...res, isLoadingUserDevices: res.isLoading, isErrorUserDevices: res.isError, userDevicesData: res.data };
};

export const useUserDevices = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userDevicesQueryKey, props],
    queryFn: () => api.apis.UserDevice.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return { ...res, isLoadingUserDevices: res.isLoading, isErrorUserDevices: res.isError, userDevicesData: res.data };
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
    isLoadingUserDevice: res.isLoading,
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
    isLoadingCreateUserDevices: res.isPending,
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
    isLoadingCreateListUserDevices: res.isPending,
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
    isLoadingCreateUserDevice: res.isPending,
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
    isLoadingUpdateUserDevices: res.isPending,
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
    isLoadingUpdateListUserDevices: res.isPending,
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
    isLoadingUpdateUserDevicesList: res.isPending,
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
    isLoadingUpdateUserDevice: res.isPending,
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
    isLoadingDeleteUserDevices: res.isPending,
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
    isLoadingDeleteAllUserDevices: res.isPending,
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
    isLoadingDeleteUserDevice: res.isPending,
    isErrorDeleteUserDevice: res.isError,
    deleteUserDevice: res.mutate,
    deleteUserDeviceFromTable,
  };
};
