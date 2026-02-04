import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const taskListsQueryKey = 'task-lists';
export const taskListQueryKey = 'task-list';
export const taskListExistQueryKey = 'exist-task-list';
export const taskListsCountQueryKey = 'count-task-lists';

export const taskListsAggregateQueryKey = 'aggregate-task-lists';

export const useAggregateTaskLists = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [taskListsAggregateQueryKey, props],
    () => api.instance.post('/api/taskList/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateTaskList: res.isLoading,
    isErrorAggregateTaskList: res.isError,
    aggregateTaskLists: res.data,
  };
};

export const useCountTaskLists = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([taskListsCountQueryKey, props], () => api.apis.TaskList.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountTaskList: res.isLoading,
    isErrorCountTaskList: res.isError,
    countTaskLists: res.data,
  };
};

export const useExistTaskList = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([taskListExistQueryKey, props], () => api.apis.TaskList.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistTaskList: res.isLoading,
    isErrorExistTaskList: res.isError,
    existTaskList: res.data,
  };
};

export const useTaskListsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [taskListsQueryKey, tableFetchProps, props],
    () =>
      api.apis.TaskList.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingTaskLists: res.isLoading, isErrorTaskLists: res.isError, taskListsData: res.data };
};

export const useTaskLists = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([taskListsQueryKey, props], () => api.apis.TaskList.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingTaskLists: res.isLoading, isErrorTaskLists: res.isError, taskListsData: res.data };
};

export const useTaskList = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([taskListQueryKey, props], () => api.apis.TaskList.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingTaskList: res.isLoading,
    isErrorTaskList: res.isError,
    taskListData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateTaskLists = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.TaskList.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateTaskLists: res.isLoading,
    isErrorCreateTaskLists: res.isError,
    createTaskLists: res.mutate,
    createdTaskLists: res.data,
  };
};

export const useCreateListTaskLists = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.TaskList.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListTaskLists: res.isLoading,
    isErrorCreateListTaskLists: res.isError,
    createListTaskLists: res.mutate,
    createdListTaskLists: res.data,
  };
};

export const useCreateTaskList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.TaskList.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateTaskList: res.isLoading,
    isErrorCreateTaskList: res.isError,
    createTaskList: res.mutate,
    createdTaskList: res.data,
  };
};

export const useUpdateTaskLists = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TaskList.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateTaskLists: res.isLoading,
    isErrorUpdateTaskLists: res.isError,
    updateTaskLists: res.mutate,
    updatedTaskLists: res.data,
  };
};

export const useUpdateListTaskLists = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TaskList.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListTaskLists: res.isLoading,
    isErrorUpdateListTaskLists: res.isError,
    updateListTaskLists: res.mutate,
    updatedListTaskLists: res.data,
  };
};

export const useUpdateTaskListsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TaskList.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateTaskListsList: res.isLoading,
    isErrorUpdateTaskListsList: res.isError,
    updateTaskListsList: res.mutate,
    updatedTaskListsList: res.data,
  };
};

export const useUpdateTaskList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TaskList.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateTaskList: res.isLoading,
    isErrorUpdateTaskList: res.isError,
    updateTaskList: res.mutate,
    updatedTaskList: res.data,
  };
};

export const useDeleteTaskLists = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.TaskList.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteTaskLists: res.isLoading,
    isErrorDeleteTaskLists: res.isError,
    deleteTaskLists: res.mutate,
  };
};

export const useDeleteAllTaskLists = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.TaskList.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllTaskLists: res.isLoading,
    isErrorDeleteAllTaskLists: res.isError,
    deleteAllTaskLists: res.mutate,
  };
};

export const useDeleteTaskList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.TaskList.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteTaskListFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteTaskList: res.isLoading,
    isErrorDeleteTaskList: res.isError,
    deleteTaskList: res.mutate,
    deleteTaskListFromTable,
  };
};
