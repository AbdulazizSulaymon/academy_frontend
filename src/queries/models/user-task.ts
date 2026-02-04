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
  const res = useQuery(
    [userTasksAggregateQueryKey, props],
    () => api.instance.post('/api/userTask/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateUserTask: res.isLoading,
    isErrorAggregateUserTask: res.isError,
    aggregateUserTasks: res.data,
  };
};

export const useCountUserTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userTasksCountQueryKey, props], () => api.apis.UserTask.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountUserTask: res.isLoading,
    isErrorCountUserTask: res.isError,
    countUserTasks: res.data,
  };
};

export const useExistUserTask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userTaskExistQueryKey, props], () => api.apis.UserTask.exist({ ...props }), options);
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
  const res = useQuery(
    [userTasksQueryKey, tableFetchProps, props],
    () =>
      api.apis.UserTask.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingUserTasks: res.isLoading, isErrorUserTasks: res.isError, userTasksData: res.data };
};

export const useUserTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userTasksQueryKey, props], () => api.apis.UserTask.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingUserTasks: res.isLoading, isErrorUserTasks: res.isError, userTasksData: res.data };
};

export const useUserTask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userTaskQueryKey, props], () => api.apis.UserTask.findOne({ ...props }), options as any);
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
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserTask.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateUserTasks: res.isLoading,
    isErrorCreateUserTasks: res.isError,
    createUserTasks: res.mutate,
    createdUserTasks: res.data,
  };
};

export const useCreateListUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserTask.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListUserTasks: res.isLoading,
    isErrorCreateListUserTasks: res.isError,
    createListUserTasks: res.mutate,
    createdListUserTasks: res.data,
  };
};

export const useCreateUserTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserTask.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateUserTask: res.isLoading,
    isErrorCreateUserTask: res.isError,
    createUserTask: res.mutate,
    createdUserTask: res.data,
  };
};

export const useUpdateUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserTask.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserTasks: res.isLoading,
    isErrorUpdateUserTasks: res.isError,
    updateUserTasks: res.mutate,
    updatedUserTasks: res.data,
  };
};

export const useUpdateListUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserTask.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListUserTasks: res.isLoading,
    isErrorUpdateListUserTasks: res.isError,
    updateListUserTasks: res.mutate,
    updatedListUserTasks: res.data,
  };
};

export const useUpdateUserTasksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserTask.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserTasksList: res.isLoading,
    isErrorUpdateUserTasksList: res.isError,
    updateUserTasksList: res.mutate,
    updatedUserTasksList: res.data,
  };
};

export const useUpdateUserTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserTask.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserTask: res.isLoading,
    isErrorUpdateUserTask: res.isError,
    updateUserTask: res.mutate,
    updatedUserTask: res.data,
  };
};

export const useDeleteUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.UserTask.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteUserTasks: res.isLoading,
    isErrorDeleteUserTasks: res.isError,
    deleteUserTasks: res.mutate,
  };
};

export const useDeleteAllUserTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.UserTask.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllUserTasks: res.isLoading,
    isErrorDeleteAllUserTasks: res.isError,
    deleteAllUserTasks: res.mutate,
  };
};

export const useDeleteUserTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.UserTask.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteUserTaskFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteUserTask: res.isLoading,
    isErrorDeleteUserTask: res.isError,
    deleteUserTask: res.mutate,
    deleteUserTaskFromTable,
  };
};
