import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const boardtasksQueryKey = 'boardtasks';
export const boardtaskQueryKey = 'boardtask';
export const boardtaskExistQueryKey = 'exist-boardtask';
export const boardtasksCountQueryKey = 'count-boardtasks';

export const boardtasksAggregateQueryKey = 'aggregate-boardtasks';

export const useAggregateBoardtasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [boardtasksAggregateQueryKey, props],
    () => api.instance.post('/api/boardtask/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateBoardtask: res.isLoading,
    isErrorAggregateBoardtask: res.isError,
    aggregateBoardtasks: res.data,
  };
};

export const useCountBoardtasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([boardtasksCountQueryKey, props], () => api.apis.Boardtask.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountBoardtask: res.isLoading,
    isErrorCountBoardtask: res.isError,
    countBoardtasks: res.data,
  };
};

export const useExistBoardtask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([boardtaskExistQueryKey, props], () => api.apis.Boardtask.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistBoardtask: res.isLoading,
    isErrorExistBoardtask: res.isError,
    existBoardtask: res.data,
  };
};

export const useBoardtasksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [boardtasksQueryKey, tableFetchProps, props],
    () =>
      api.apis.Boardtask.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingBoardtasks: res.isLoading, isErrorBoardtasks: res.isError, boardtasksData: res.data };
};

export const useBoardtasks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([boardtasksQueryKey, props], () => api.apis.Boardtask.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingBoardtasks: res.isLoading, isErrorBoardtasks: res.isError, boardtasksData: res.data };
};

export const useBoardtask = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([boardtaskQueryKey, props], () => api.apis.Boardtask.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingBoardtask: res.isLoading,
    isErrorBoardtask: res.isError,
    boardtaskData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateBoardtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Boardtask.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateBoardtasks: res.isLoading,
    isErrorCreateBoardtasks: res.isError,
    createBoardtasks: res.mutate,
    createdBoardtasks: res.data,
  };
};

export const useCreateListBoardtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Boardtask.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListBoardtasks: res.isLoading,
    isErrorCreateListBoardtasks: res.isError,
    createListBoardtasks: res.mutate,
    createdListBoardtasks: res.data,
  };
};

export const useCreateBoardtask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Boardtask.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateBoardtask: res.isLoading,
    isErrorCreateBoardtask: res.isError,
    createBoardtask: res.mutate,
    createdBoardtask: res.data,
  };
};

export const useUpdateBoardtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Boardtask.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBoardtasks: res.isLoading,
    isErrorUpdateBoardtasks: res.isError,
    updateBoardtasks: res.mutate,
    updatedBoardtasks: res.data,
  };
};

export const useUpdateListBoardtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Boardtask.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListBoardtasks: res.isLoading,
    isErrorUpdateListBoardtasks: res.isError,
    updateListBoardtasks: res.mutate,
    updatedListBoardtasks: res.data,
  };
};

export const useUpdateBoardtasksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Boardtask.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBoardtasksList: res.isLoading,
    isErrorUpdateBoardtasksList: res.isError,
    updateBoardtasksList: res.mutate,
    updatedBoardtasksList: res.data,
  };
};

export const useUpdateBoardtask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Boardtask.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBoardtask: res.isLoading,
    isErrorUpdateBoardtask: res.isError,
    updateBoardtask: res.mutate,
    updatedBoardtask: res.data,
  };
};

export const useDeleteBoardtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Boardtask.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteBoardtasks: res.isLoading,
    isErrorDeleteBoardtasks: res.isError,
    deleteBoardtasks: res.mutate,
  };
};

export const useDeleteAllBoardtasks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Boardtask.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllBoardtasks: res.isLoading,
    isErrorDeleteAllBoardtasks: res.isError,
    deleteAllBoardtasks: res.mutate,
  };
};

export const useDeleteBoardtask = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Boardtask.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteBoardtaskFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteBoardtask: res.isLoading,
    isErrorDeleteBoardtask: res.isError,
    deleteBoardtask: res.mutate,
    deleteBoardtaskFromTable,
  };
};
