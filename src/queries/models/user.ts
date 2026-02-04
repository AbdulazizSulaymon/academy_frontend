import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const usersQueryKey = 'users';
export const userQueryKey = 'user';
export const userExistQueryKey = 'exist-user';
export const usersCountQueryKey = 'count-users';

export const usersAggregateQueryKey = 'aggregate-users';

export const useAggregateUsers = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([usersAggregateQueryKey, props], () => api.instance.post('/api/user/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregateUser: res.isLoading,
    isErrorAggregateUser: res.isError,
    aggregateUsers: res.data,
  };
};

export const useCountUsers = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([usersCountQueryKey, props], () => api.apis.User.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountUser: res.isLoading,
    isErrorCountUser: res.isError,
    countUsers: res.data,
  };
};

export const useExistUser = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userExistQueryKey, props], () => api.apis.User.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistUser: res.isLoading,
    isErrorExistUser: res.isError,
    existUser: res.data,
  };
};

export const useUsersWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [usersQueryKey, tableFetchProps, props],
    () =>
      api.apis.User.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingUsers: res.isLoading, isErrorUsers: res.isError, usersData: res.data };
};

export const useUsers = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([usersQueryKey, props], () => api.apis.User.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingUsers: res.isLoading, isErrorUsers: res.isError, usersData: res.data };
};

export const useUser = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userQueryKey, props], () => api.apis.User.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingUser: res.isLoading,
    isErrorUser: res.isError,
    userData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateUsers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.User.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateUsers: res.isLoading,
    isErrorCreateUsers: res.isError,
    createUsers: res.mutate,
    createdUsers: res.data,
  };
};

export const useCreateListUsers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.User.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListUsers: res.isLoading,
    isErrorCreateListUsers: res.isError,
    createListUsers: res.mutate,
    createdListUsers: res.data,
  };
};

export const useCreateUser = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.User.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateUser: res.isLoading,
    isErrorCreateUser: res.isError,
    createUser: res.mutate,
    createdUser: res.data,
  };
};

export const useUpdateUsers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.User.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUsers: res.isLoading,
    isErrorUpdateUsers: res.isError,
    updateUsers: res.mutate,
    updatedUsers: res.data,
  };
};

export const useUpdateListUsers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.User.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListUsers: res.isLoading,
    isErrorUpdateListUsers: res.isError,
    updateListUsers: res.mutate,
    updatedListUsers: res.data,
  };
};

export const useUpdateUsersList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.User.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUsersList: res.isLoading,
    isErrorUpdateUsersList: res.isError,
    updateUsersList: res.mutate,
    updatedUsersList: res.data,
  };
};

export const useUpdateUser = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.User.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUser: res.isLoading,
    isErrorUpdateUser: res.isError,
    updateUser: res.mutate,
    updatedUser: res.data,
  };
};

export const useDeleteUsers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.User.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteUsers: res.isLoading,
    isErrorDeleteUsers: res.isError,
    deleteUsers: res.mutate,
  };
};

export const useDeleteAllUsers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.User.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllUsers: res.isLoading,
    isErrorDeleteAllUsers: res.isError,
    deleteAllUsers: res.mutate,
  };
};

export const useDeleteUser = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.User.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteUserFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteUser: res.isLoading,
    isErrorDeleteUser: res.isError,
    deleteUser: res.mutate,
    deleteUserFromTable,
  };
};
