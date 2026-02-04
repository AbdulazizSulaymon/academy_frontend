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
  const res = useQuery(
    [userDevicesAggregateQueryKey, props],
    () => api.instance.post('/api/userDevice/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateUserDevice: res.isLoading,
    isErrorAggregateUserDevice: res.isError,
    aggregateUserDevices: res.data,
  };
};

export const useCountUserDevices = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userDevicesCountQueryKey, props], () => api.apis.UserDevice.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountUserDevice: res.isLoading,
    isErrorCountUserDevice: res.isError,
    countUserDevices: res.data,
  };
};

export const useExistUserDevice = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userDeviceExistQueryKey, props], () => api.apis.UserDevice.exist({ ...props }), options);
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
  const res = useQuery(
    [userDevicesQueryKey, tableFetchProps, props],
    () =>
      api.apis.UserDevice.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingUserDevices: res.isLoading, isErrorUserDevices: res.isError, userDevicesData: res.data };
};

export const useUserDevices = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userDevicesQueryKey, props], () => api.apis.UserDevice.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingUserDevices: res.isLoading, isErrorUserDevices: res.isError, userDevicesData: res.data };
};

export const useUserDevice = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userDeviceQueryKey, props], () => api.apis.UserDevice.findOne({ ...props }), options as any);
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
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserDevice.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateUserDevices: res.isLoading,
    isErrorCreateUserDevices: res.isError,
    createUserDevices: res.mutate,
    createdUserDevices: res.data,
  };
};

export const useCreateListUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserDevice.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListUserDevices: res.isLoading,
    isErrorCreateListUserDevices: res.isError,
    createListUserDevices: res.mutate,
    createdListUserDevices: res.data,
  };
};

export const useCreateUserDevice = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserDevice.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateUserDevice: res.isLoading,
    isErrorCreateUserDevice: res.isError,
    createUserDevice: res.mutate,
    createdUserDevice: res.data,
  };
};

export const useUpdateUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserDevice.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserDevices: res.isLoading,
    isErrorUpdateUserDevices: res.isError,
    updateUserDevices: res.mutate,
    updatedUserDevices: res.data,
  };
};

export const useUpdateListUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserDevice.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListUserDevices: res.isLoading,
    isErrorUpdateListUserDevices: res.isError,
    updateListUserDevices: res.mutate,
    updatedListUserDevices: res.data,
  };
};

export const useUpdateUserDevicesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserDevice.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserDevicesList: res.isLoading,
    isErrorUpdateUserDevicesList: res.isError,
    updateUserDevicesList: res.mutate,
    updatedUserDevicesList: res.data,
  };
};

export const useUpdateUserDevice = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserDevice.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserDevice: res.isLoading,
    isErrorUpdateUserDevice: res.isError,
    updateUserDevice: res.mutate,
    updatedUserDevice: res.data,
  };
};

export const useDeleteUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.UserDevice.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteUserDevices: res.isLoading,
    isErrorDeleteUserDevices: res.isError,
    deleteUserDevices: res.mutate,
  };
};

export const useDeleteAllUserDevices = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.UserDevice.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllUserDevices: res.isLoading,
    isErrorDeleteAllUserDevices: res.isError,
    deleteAllUserDevices: res.mutate,
  };
};

export const useDeleteUserDevice = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.UserDevice.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteUserDeviceFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteUserDevice: res.isLoading,
    isErrorDeleteUserDevice: res.isError,
    deleteUserDevice: res.mutate,
    deleteUserDeviceFromTable,
  };
};
