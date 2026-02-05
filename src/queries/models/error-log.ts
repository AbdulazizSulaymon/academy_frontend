import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const errorLogsQueryKey = 'error-logs';
export const errorLogQueryKey = 'error-log';
export const errorLogExistQueryKey = 'exist-error-log';
export const errorLogsCountQueryKey = 'count-error-logs';

export const errorLogsAggregateQueryKey = 'aggregate-error-logs';

export const useAggregateErrorLogs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorLogsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/errorLog/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateErrorLog: res.isLoading,
    isError: res.isError,
    isErrorAggregateErrorLog: res.isError,
    aggregateErrorLogs: res.data,
  };
};

export const useCountErrorLogs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorLogsCountQueryKey, props],
    queryFn: () => api.apis.ErrorLog.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountErrorLog: res.isLoading,
    isError: res.isError,
    isErrorCountErrorLog: res.isError,
    countErrorLogs: res.data,
  };
};

export const useExistErrorLog = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorLogExistQueryKey, props],
    queryFn: () => api.apis.ErrorLog.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistErrorLog: res.isLoading,
    isError: res.isError,
    isErrorExistErrorLog: res.isError,
    existErrorLog: res.data,
  };
};

export const useErrorLogsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [errorLogsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.ErrorLog.findMany({
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
    isLoadingErrorLogs: res.isLoading,
    isError: res.isError,
    isErrorErrorLogs: res.isError,
    errorLogsData: res.data,
  };
};

export const useErrorLogs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorLogsQueryKey, props],
    queryFn: () => api.apis.ErrorLog.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingErrorLogs: res.isLoading,
    isError: res.isError,
    isErrorErrorLogs: res.isError,
    errorLogsData: res.data,
  };
};

export const useErrorLog = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorLogQueryKey, props],
    queryFn: () => api.apis.ErrorLog.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingErrorLog: res.isLoading,
    isError: res.isError,
    isErrorErrorLog: res.isError,
    errorLogData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ErrorLog.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateErrorLogs: res.isPending,
    isError: res.isError,
    isErrorCreateErrorLogs: res.isError,
    createErrorLogs: res.mutate,
    createdErrorLogs: res.data,
  };
};

export const useCreateListErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ErrorLog.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListErrorLogs: res.isPending,
    isError: res.isError,
    isErrorCreateListErrorLogs: res.isError,
    createListErrorLogs: res.mutate,
    createdListErrorLogs: res.data,
  };
};

export const useCreateErrorLog = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ErrorLog.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateErrorLog: res.isPending,
    isError: res.isError,
    isErrorCreateErrorLog: res.isError,
    createErrorLog: res.mutate,
    createdErrorLog: res.data,
  };
};

export const useUpdateErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorLog.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateErrorLogs: res.isPending,
    isError: res.isError,
    isErrorUpdateErrorLogs: res.isError,
    updateErrorLogs: res.mutate,
    updatedErrorLogs: res.data,
  };
};

export const useUpdateListErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorLog.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListErrorLogs: res.isPending,
    isError: res.isError,
    isErrorUpdateListErrorLogs: res.isError,
    updateListErrorLogs: res.mutate,
    updatedListErrorLogs: res.data,
  };
};

export const useUpdateErrorLogsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorLog.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateErrorLogsList: res.isPending,
    isError: res.isError,
    isErrorUpdateErrorLogsList: res.isError,
    updateErrorLogsList: res.mutate,
    updatedErrorLogsList: res.data,
  };
};

export const useUpdateErrorLog = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorLog.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateErrorLog: res.isPending,
    isError: res.isError,
    isErrorUpdateErrorLog: res.isError,
    updateErrorLog: res.mutate,
    updatedErrorLog: res.data,
  };
};

export const useDeleteErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.ErrorLog.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteErrorLogs: res.isPending,
    isError: res.isError,
    isErrorDeleteErrorLogs: res.isError,
    deleteErrorLogs: res.mutate,
  };
};

export const useDeleteAllErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.ErrorLog.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllErrorLogs: res.isPending,
    isError: res.isError,
    isErrorDeleteAllErrorLogs: res.isError,
    deleteAllErrorLogs: res.mutate,
  };
};

export const useDeleteErrorLog = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.ErrorLog.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteErrorLogFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteErrorLog: res.isPending,
    isError: res.isError,
    isErrorDeleteErrorLog: res.isError,
    deleteErrorLog: res.mutate,
    deleteErrorLogFromTable,
  };
};
