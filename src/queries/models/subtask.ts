import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const subtasksQueryKey = 'subtasks';
export const subtaskQueryKey = 'subtask';
export const subtaskExistQueryKey = 'exist-subtask';
export const subtasksCountQueryKey = 'count-subtasks';

export const subtasksAggregateQueryKey = 'aggregate-subtasks';

export const useAggregateSubtasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subtasksAggregateQueryKey, props],
    () => api.instance.post('/api/subtask/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateSubtask: res.isLoading,
    isErrorAggregateSubtask: res.isError,
    aggregateSubtasks: res.data,
  };
};

export const useCountSubtasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subtasksCountQueryKey, props], () => api.apis.Subtask.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountSubtask: res.isLoading,
    isErrorCountSubtask: res.isError,
    countSubtasks: res.data,
  };
};

export const useExistSubtask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subtaskExistQueryKey, props], () => api.apis.Subtask.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistSubtask: res.isLoading,
    isErrorExistSubtask: res.isError,
    existSubtask: res.data,
  };
};

export const useSubtasksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [subtasksQueryKey, tableFetchProps, props],
    () =>
      api.apis.Subtask.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingSubtasks: res.isLoading, isErrorSubtasks: res.isError, subtasksData: res.data };
};

export const useSubtasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subtasksQueryKey, props], () => api.apis.Subtask.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingSubtasks: res.isLoading, isErrorSubtasks: res.isError, subtasksData: res.data };
};

export const useSubtask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subtaskQueryKey, props], () => api.apis.Subtask.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingSubtask: res.isLoading,
    isErrorSubtask: res.isError,
    subtaskData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateSubtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Subtask.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateSubtasks: res.isLoading,
    isErrorCreateSubtasks: res.isError,
    createSubtasks: res.mutate,
    createdSubtasks: res.data,
  };
};

export const useCreateListSubtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Subtask.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListSubtasks: res.isLoading,
    isErrorCreateListSubtasks: res.isError,
    createListSubtasks: res.mutate,
    createdListSubtasks: res.data,
  };
};

export const useCreateSubtask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Subtask.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateSubtask: res.isLoading,
    isErrorCreateSubtask: res.isError,
    createSubtask: res.mutate,
    createdSubtask: res.data,
  };
};

export const useUpdateSubtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subtask.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubtasks: res.isLoading,
    isErrorUpdateSubtasks: res.isError,
    updateSubtasks: res.mutate,
    updatedSubtasks: res.data,
  };
};

export const useUpdateListSubtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subtask.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListSubtasks: res.isLoading,
    isErrorUpdateListSubtasks: res.isError,
    updateListSubtasks: res.mutate,
    updatedListSubtasks: res.data,
  };
};

export const useUpdateSubtasksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subtask.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubtasksList: res.isLoading,
    isErrorUpdateSubtasksList: res.isError,
    updateSubtasksList: res.mutate,
    updatedSubtasksList: res.data,
  };
};

export const useUpdateSubtask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subtask.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubtask: res.isLoading,
    isErrorUpdateSubtask: res.isError,
    updateSubtask: res.mutate,
    updatedSubtask: res.data,
  };
};

export const useDeleteSubtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Subtask.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteSubtasks: res.isLoading,
    isErrorDeleteSubtasks: res.isError,
    deleteSubtasks: res.mutate,
  };
};

export const useDeleteAllSubtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Subtask.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllSubtasks: res.isLoading,
    isErrorDeleteAllSubtasks: res.isError,
    deleteAllSubtasks: res.mutate,
  };
};

export const useDeleteSubtask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Subtask.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteSubtaskFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteSubtask: res.isLoading,
    isErrorDeleteSubtask: res.isError,
    deleteSubtask: res.mutate,
    deleteSubtaskFromTable,
  };
};
