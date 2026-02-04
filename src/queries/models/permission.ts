import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const permissionsQueryKey = 'permissions';
export const permissionQueryKey = 'permission';
export const permissionExistQueryKey = 'exist-permission';
export const permissionsCountQueryKey = 'count-permissions';

export const permissionsAggregateQueryKey = 'aggregate-permissions';

export const useAggregatePermissions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [permissionsAggregateQueryKey, props],
    () => api.instance.post('/api/permission/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregatePermission: res.isLoading,
    isErrorAggregatePermission: res.isError,
    aggregatePermissions: res.data,
  };
};

export const useCountPermissions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([permissionsCountQueryKey, props], () => api.apis.Permission.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountPermission: res.isLoading,
    isErrorCountPermission: res.isError,
    countPermissions: res.data,
  };
};

export const useExistPermission = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([permissionExistQueryKey, props], () => api.apis.Permission.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistPermission: res.isLoading,
    isErrorExistPermission: res.isError,
    existPermission: res.data,
  };
};

export const usePermissionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [permissionsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Permission.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingPermissions: res.isLoading, isErrorPermissions: res.isError, permissionsData: res.data };
};

export const usePermissions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([permissionsQueryKey, props], () => api.apis.Permission.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingPermissions: res.isLoading, isErrorPermissions: res.isError, permissionsData: res.data };
};

export const usePermission = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([permissionQueryKey, props], () => api.apis.Permission.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingPermission: res.isLoading,
    isErrorPermission: res.isError,
    permissionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Permission.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreatePermissions: res.isLoading,
    isErrorCreatePermissions: res.isError,
    createPermissions: res.mutate,
    createdPermissions: res.data,
  };
};

export const useCreateListPermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Permission.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListPermissions: res.isLoading,
    isErrorCreateListPermissions: res.isError,
    createListPermissions: res.mutate,
    createdListPermissions: res.data,
  };
};

export const useCreatePermission = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Permission.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreatePermission: res.isLoading,
    isErrorCreatePermission: res.isError,
    createPermission: res.mutate,
    createdPermission: res.data,
  };
};

export const useUpdatePermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Permission.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePermissions: res.isLoading,
    isErrorUpdatePermissions: res.isError,
    updatePermissions: res.mutate,
    updatedPermissions: res.data,
  };
};

export const useUpdateListPermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Permission.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListPermissions: res.isLoading,
    isErrorUpdateListPermissions: res.isError,
    updateListPermissions: res.mutate,
    updatedListPermissions: res.data,
  };
};

export const useUpdatePermissionsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Permission.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePermissionsList: res.isLoading,
    isErrorUpdatePermissionsList: res.isError,
    updatePermissionsList: res.mutate,
    updatedPermissionsList: res.data,
  };
};

export const useUpdatePermission = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Permission.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePermission: res.isLoading,
    isErrorUpdatePermission: res.isError,
    updatePermission: res.mutate,
    updatedPermission: res.data,
  };
};

export const useDeletePermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Permission.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeletePermissions: res.isLoading,
    isErrorDeletePermissions: res.isError,
    deletePermissions: res.mutate,
  };
};

export const useDeleteAllPermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Permission.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllPermissions: res.isLoading,
    isErrorDeleteAllPermissions: res.isError,
    deleteAllPermissions: res.mutate,
  };
};

export const useDeletePermission = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Permission.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deletePermissionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeletePermission: res.isLoading,
    isErrorDeletePermission: res.isError,
    deletePermission: res.mutate,
    deletePermissionFromTable,
  };
};
