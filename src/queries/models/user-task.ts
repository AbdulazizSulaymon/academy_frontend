import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const userTasksQueryKey = 'user-tasks';
export const userTaskQueryKey = 'user-task';
export const userTaskExistQueryKey = 'exist-user-task';
export const userTasksCountQueryKey = 'count-user-tasks';

export const userTasksAggregateQueryKey = 'aggregate-user-tasks';

export const useAggregateUserTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTasksAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/userTask/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoadingAggregateUserTask: res.isLoading,
    isErrorAggregateUserTask: res.isError,
    aggregateUserTasks: res.data,
  };
};

export const useCountUserTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTasksCountQueryKey, props],
    queryFn: () => api.apis.UserTask.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingCountUserTask: res.isLoading,
    isErrorCountUserTask: res.isError,
    countUserTasks: res.data,
  };
};

export const useExistUserTask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTaskExistQueryKey, props],
    queryFn: () => api.apis.UserTask.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingExistUserTask: res.isLoading,
    isErrorExistUserTask: res.isError,
    existUserTask: res.data,
  };
};

export const useUserTasksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [userTasksQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.UserTask.findMany({
        ...tableFetchProps,
        ...props,
      }),
    enabled:
      typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    ...options,
  });

  return { ...res, isLoadingUserTasks: res.isLoading, isErrorUserTasks: res.isError, userTasksData: res.data };
};

export const useUserTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTasksQueryKey, props],
    queryFn: () => api.apis.UserTask.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return { ...res, isLoadingUserTasks: res.isLoading, isErrorUserTasks: res.isError, userTasksData: res.data };
};

export const useUserTask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTaskQueryKey, props],
    queryFn: () => api.apis.UserTask.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoadingUserTask: res.isLoading,
    isErrorUserTask: res.isError,
    userTaskData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserTask.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateUserTasks: res.isPending,
    isErrorCreateUserTasks: res.isError,
    createUserTasks: res.mutate,
    createdUserTasks: res.data,
  };
};

export const useCreateListUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserTask.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateListUserTasks: res.isPending,
    isErrorCreateListUserTasks: res.isError,
    createListUserTasks: res.mutate,
    createdListUserTasks: res.data,
  };
};

export const useCreateUserTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserTask.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingCreateUserTask: res.isPending,
    isErrorCreateUserTask: res.isError,
    createUserTask: res.mutate,
    createdUserTask: res.data,
  };
};

export const useUpdateUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTask.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateUserTasks: res.isPending,
    isErrorUpdateUserTasks: res.isError,
    updateUserTasks: res.mutate,
    updatedUserTasks: res.data,
  };
};

export const useUpdateListUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTask.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateListUserTasks: res.isPending,
    isErrorUpdateListUserTasks: res.isError,
    updateListUserTasks: res.mutate,
    updatedListUserTasks: res.data,
  };
};

export const useUpdateUserTasksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTask.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateUserTasksList: res.isPending,
    isErrorUpdateUserTasksList: res.isError,
    updateUserTasksList: res.mutate,
    updatedUserTasksList: res.data,
  };
};

export const useUpdateUserTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTask.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateUserTask: res.isPending,
    isErrorUpdateUserTask: res.isError,
    updateUserTask: res.mutate,
    updatedUserTask: res.data,
  };
};

export const useDeleteUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.UserTask.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteUserTasks: res.isPending,
    isErrorDeleteUserTasks: res.isError,
    deleteUserTasks: res.mutate,
  };
};

export const useDeleteAllUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.UserTask.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteAllUserTasks: res.isPending,
    isErrorDeleteAllUserTasks: res.isError,
    deleteAllUserTasks: res.mutate,
  };
};

export const useDeleteUserTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.UserTask.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteUserTaskFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteUserTask: res.isPending,
    isErrorDeleteUserTask: res.isError,
    deleteUserTask: res.mutate,
    deleteUserTaskFromTable,
  };
};
