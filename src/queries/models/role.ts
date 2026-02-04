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
  const res = useQuery([rolesAggregateQueryKey, props], () => api.instance.post('/api/role/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregateRole: res.isLoading,
    isErrorAggregateRole: res.isError,
    aggregateRoles: res.data,
  };
};

export const useCountRoles = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([rolesCountQueryKey, props], () => api.apis.Role.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountRole: res.isLoading,
    isErrorCountRole: res.isError,
    countRoles: res.data,
  };
};

export const useExistRole = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([roleExistQueryKey, props], () => api.apis.Role.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistRole: res.isLoading,
    isErrorExistRole: res.isError,
    existRole: res.data,
  };
};

export const useRolesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [rolesQueryKey, tableFetchProps, props],
    () =>
      api.apis.Role.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingRoles: res.isLoading, isErrorRoles: res.isError, rolesData: res.data };
};

export const useRoles = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([rolesQueryKey, props], () => api.apis.Role.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingRoles: res.isLoading, isErrorRoles: res.isError, rolesData: res.data };
};

export const useRole = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([roleQueryKey, props], () => api.apis.Role.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingRole: res.isLoading,
    isErrorRole: res.isError,
    roleData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Role.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateRoles: res.isLoading,
    isErrorCreateRoles: res.isError,
    createRoles: res.mutate,
    createdRoles: res.data,
  };
};

export const useCreateListRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Role.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListRoles: res.isLoading,
    isErrorCreateListRoles: res.isError,
    createListRoles: res.mutate,
    createdListRoles: res.data,
  };
};

export const useCreateRole = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Role.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateRole: res.isLoading,
    isErrorCreateRole: res.isError,
    createRole: res.mutate,
    createdRole: res.data,
  };
};

export const useUpdateRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Role.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateRoles: res.isLoading,
    isErrorUpdateRoles: res.isError,
    updateRoles: res.mutate,
    updatedRoles: res.data,
  };
};

export const useUpdateListRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Role.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListRoles: res.isLoading,
    isErrorUpdateListRoles: res.isError,
    updateListRoles: res.mutate,
    updatedListRoles: res.data,
  };
};

export const useUpdateRolesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Role.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateRolesList: res.isLoading,
    isErrorUpdateRolesList: res.isError,
    updateRolesList: res.mutate,
    updatedRolesList: res.data,
  };
};

export const useUpdateRole = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Role.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateRole: res.isLoading,
    isErrorUpdateRole: res.isError,
    updateRole: res.mutate,
    updatedRole: res.data,
  };
};

export const useDeleteRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Role.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteRoles: res.isLoading,
    isErrorDeleteRoles: res.isError,
    deleteRoles: res.mutate,
  };
};

export const useDeleteAllRoles = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Role.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllRoles: res.isLoading,
    isErrorDeleteAllRoles: res.isError,
    deleteAllRoles: res.mutate,
  };
};

export const useDeleteRole = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Role.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteRoleFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteRole: res.isLoading,
    isErrorDeleteRole: res.isError,
    deleteRole: res.mutate,
    deleteRoleFromTable,
  };
};
