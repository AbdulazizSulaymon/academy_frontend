import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const rolesQueryKey = 'roles';
export const roleQueryKey = 'role';
export const roleExistQueryKey = 'exist-role';
export const rolesCountQueryKey = 'count-roles';

export const rolesAggregateQueryKey = 'aggregate-roles';

export const useAggregateRoles = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [rolesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/role/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateRole: res.isLoading,
    isError: res.isError,
    isErrorAggregateRole: res.isError,
    aggregateRoles: res.data,
  };
};

export const useCountRoles = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [rolesCountQueryKey, props],
    queryFn: () => api.apis.Role.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountRole: res.isLoading,
    isError: res.isError,
    isErrorCountRole: res.isError,
    countRoles: res.data,
  };
};

export const useExistRole = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [roleExistQueryKey, props],
    queryFn: () => api.apis.Role.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistRole: res.isLoading,
    isError: res.isError,
    isErrorExistRole: res.isError,
    existRole: res.data,
  };
};

export const useRolesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [rolesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Role.findMany({
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
    isLoadingRoles: res.isLoading,
    isError: res.isError,
    isErrorRoles: res.isError,
    rolesData: res.data,
  };
};

export const useRoles = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [rolesQueryKey, props],
    queryFn: () => api.apis.Role.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingRoles: res.isLoading,
    isError: res.isError,
    isErrorRoles: res.isError,
    rolesData: res.data,
  };
};

export const useRole = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [roleQueryKey, props],
    queryFn: () => api.apis.Role.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingRole: res.isLoading,
    isError: res.isError,
    isErrorRole: res.isError,
    roleData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Role.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateRoles: res.isPending,
    isError: res.isError,
    isErrorCreateRoles: res.isError,
    createRoles: res.mutate,
    createdRoles: res.data,
  };
};

export const useCreateListRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Role.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListRoles: res.isPending,
    isError: res.isError,
    isErrorCreateListRoles: res.isError,
    createListRoles: res.mutate,
    createdListRoles: res.data,
  };
};

export const useCreateRole = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Role.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateRole: res.isPending,
    isError: res.isError,
    isErrorCreateRole: res.isError,
    createRole: res.mutate,
    createdRole: res.data,
  };
};

export const useUpdateRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Role.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateRoles: res.isPending,
    isError: res.isError,
    isErrorUpdateRoles: res.isError,
    updateRoles: res.mutate,
    updatedRoles: res.data,
  };
};

export const useUpdateListRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Role.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListRoles: res.isPending,
    isError: res.isError,
    isErrorUpdateListRoles: res.isError,
    updateListRoles: res.mutate,
    updatedListRoles: res.data,
  };
};

export const useUpdateRolesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Role.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateRolesList: res.isPending,
    isError: res.isError,
    isErrorUpdateRolesList: res.isError,
    updateRolesList: res.mutate,
    updatedRolesList: res.data,
  };
};

export const useUpdateRole = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Role.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateRole: res.isPending,
    isError: res.isError,
    isErrorUpdateRole: res.isError,
    updateRole: res.mutate,
    updatedRole: res.data,
  };
};

export const useDeleteRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Role.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteRoles: res.isPending,
    isError: res.isError,
    isErrorDeleteRoles: res.isError,
    deleteRoles: res.mutate,
  };
};

export const useDeleteAllRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Role.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllRoles: res.isPending,
    isError: res.isError,
    isErrorDeleteAllRoles: res.isError,
    deleteAllRoles: res.mutate,
  };
};

export const useDeleteRole = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Role.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteRoleFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteRole: res.isPending,
    isError: res.isError,
    isErrorDeleteRole: res.isError,
    deleteRole: res.mutate,
    deleteRoleFromTable,
  };
};
