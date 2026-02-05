import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const tasksQueryKey = 'tasks';
export const taskQueryKey = 'task';
export const taskExistQueryKey = 'exist-task';
export const tasksCountQueryKey = 'count-tasks';

export const tasksAggregateQueryKey = 'aggregate-tasks';

export const useAggregateTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tasksAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/task/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateTask: res.isLoading,
    isError: res.isError,
    isErrorAggregateTask: res.isError,
    aggregateTasks: res.data,
  };
};

export const useCountTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tasksCountQueryKey, props],
    queryFn: () => api.apis.Task.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountTask: res.isLoading,
    isError: res.isError,
    isErrorCountTask: res.isError,
    countTasks: res.data,
  };
};

export const useExistTask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [taskExistQueryKey, props],
    queryFn: () => api.apis.Task.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistTask: res.isLoading,
    isError: res.isError,
    isErrorExistTask: res.isError,
    existTask: res.data,
  };
};

export const useTasksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [tasksQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Task.findMany({
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
    isLoadingTasks: res.isLoading,
    isError: res.isError,
    isErrorTasks: res.isError,
    tasksData: res.data,
  };
};

export const useTasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tasksQueryKey, props],
    queryFn: () => api.apis.Task.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingTasks: res.isLoading,
    isError: res.isError,
    isErrorTasks: res.isError,
    tasksData: res.data,
  };
};

export const useTask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [taskQueryKey, props],
    queryFn: () => api.apis.Task.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingTask: res.isLoading,
    isError: res.isError,
    isErrorTask: res.isError,
    taskData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Task.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateTasks: res.isPending,
    isError: res.isError,
    isErrorCreateTasks: res.isError,
    createTasks: res.mutate,
    createdTasks: res.data,
  };
};

export const useCreateListTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Task.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListTasks: res.isPending,
    isError: res.isError,
    isErrorCreateListTasks: res.isError,
    createListTasks: res.mutate,
    createdListTasks: res.data,
  };
};

export const useCreateTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Task.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateTask: res.isPending,
    isError: res.isError,
    isErrorCreateTask: res.isError,
    createTask: res.mutate,
    createdTask: res.data,
  };
};

export const useUpdateTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Task.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTasks: res.isPending,
    isError: res.isError,
    isErrorUpdateTasks: res.isError,
    updateTasks: res.mutate,
    updatedTasks: res.data,
  };
};

export const useUpdateListTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Task.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListTasks: res.isPending,
    isError: res.isError,
    isErrorUpdateListTasks: res.isError,
    updateListTasks: res.mutate,
    updatedListTasks: res.data,
  };
};

export const useUpdateTasksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Task.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTasksList: res.isPending,
    isError: res.isError,
    isErrorUpdateTasksList: res.isError,
    updateTasksList: res.mutate,
    updatedTasksList: res.data,
  };
};

export const useUpdateTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Task.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTask: res.isPending,
    isError: res.isError,
    isErrorUpdateTask: res.isError,
    updateTask: res.mutate,
    updatedTask: res.data,
  };
};

export const useDeleteTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Task.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteTasks: res.isPending,
    isError: res.isError,
    isErrorDeleteTasks: res.isError,
    deleteTasks: res.mutate,
  };
};

export const useDeleteAllTasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Task.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllTasks: res.isPending,
    isError: res.isError,
    isErrorDeleteAllTasks: res.isError,
    deleteAllTasks: res.mutate,
  };
};

export const useDeleteTask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Task.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteTaskFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteTask: res.isPending,
    isError: res.isError,
    isErrorDeleteTask: res.isError,
    deleteTask: res.mutate,
    deleteTaskFromTable,
  };
};
