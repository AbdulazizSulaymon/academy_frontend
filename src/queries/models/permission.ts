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
  const res = useQuery({
    queryKey: [permissionsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/permission/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregatePermission: res.isLoading,
    isError: res.isError,
    isErrorAggregatePermission: res.isError,
    aggregatePermissions: res.data,
  };
};

export const useCountPermissions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [permissionsCountQueryKey, props],
    queryFn: () => api.apis.Permission.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountPermission: res.isLoading,
    isError: res.isError,
    isErrorCountPermission: res.isError,
    countPermissions: res.data,
  };
};

export const useExistPermission = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [permissionExistQueryKey, props],
    queryFn: () => api.apis.Permission.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistPermission: res.isLoading,
    isError: res.isError,
    isErrorExistPermission: res.isError,
    existPermission: res.data,
  };
};

export const usePermissionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [permissionsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Permission.findMany({
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
    isLoadingPermissions: res.isLoading,
    isError: res.isError,
    isErrorPermissions: res.isError,
    permissionsData: res.data,
  };
};

export const usePermissions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [permissionsQueryKey, props],
    queryFn: () => api.apis.Permission.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPermissions: res.isLoading,
    isError: res.isError,
    isErrorPermissions: res.isError,
    permissionsData: res.data,
  };
};

export const usePermission = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [permissionQueryKey, props],
    queryFn: () => api.apis.Permission.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPermission: res.isLoading,
    isError: res.isError,
    isErrorPermission: res.isError,
    permissionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Permission.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePermissions: res.isPending,
    isError: res.isError,
    isErrorCreatePermissions: res.isError,
    createPermissions: res.mutate,
    createdPermissions: res.data,
  };
};

export const useCreateListPermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Permission.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListPermissions: res.isPending,
    isError: res.isError,
    isErrorCreateListPermissions: res.isError,
    createListPermissions: res.mutate,
    createdListPermissions: res.data,
  };
};

export const useCreatePermission = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Permission.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePermission: res.isPending,
    isError: res.isError,
    isErrorCreatePermission: res.isError,
    createPermission: res.mutate,
    createdPermission: res.data,
  };
};

export const useUpdatePermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Permission.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePermissions: res.isPending,
    isError: res.isError,
    isErrorUpdatePermissions: res.isError,
    updatePermissions: res.mutate,
    updatedPermissions: res.data,
  };
};

export const useUpdateListPermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Permission.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListPermissions: res.isPending,
    isError: res.isError,
    isErrorUpdateListPermissions: res.isError,
    updateListPermissions: res.mutate,
    updatedListPermissions: res.data,
  };
};

export const useUpdatePermissionsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Permission.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePermissionsList: res.isPending,
    isError: res.isError,
    isErrorUpdatePermissionsList: res.isError,
    updatePermissionsList: res.mutate,
    updatedPermissionsList: res.data,
  };
};

export const useUpdatePermission = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Permission.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePermission: res.isPending,
    isError: res.isError,
    isErrorUpdatePermission: res.isError,
    updatePermission: res.mutate,
    updatedPermission: res.data,
  };
};

export const useDeletePermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Permission.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePermissions: res.isPending,
    isError: res.isError,
    isErrorDeletePermissions: res.isError,
    deletePermissions: res.mutate,
  };
};

export const useDeleteAllPermissions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Permission.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllPermissions: res.isPending,
    isError: res.isError,
    isErrorDeleteAllPermissions: res.isError,
    deleteAllPermissions: res.mutate,
  };
};

export const useDeletePermission = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Permission.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deletePermissionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePermission: res.isPending,
    isError: res.isError,
    isErrorDeletePermission: res.isError,
    deletePermission: res.mutate,
    deletePermissionFromTable,
  };
};
