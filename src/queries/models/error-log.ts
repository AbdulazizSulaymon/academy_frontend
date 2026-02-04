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
  const res = useQuery(
    [errorLogsAggregateQueryKey, props],
    () => api.instance.post('/api/errorLog/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateErrorLog: res.isLoading,
    isErrorAggregateErrorLog: res.isError,
    aggregateErrorLogs: res.data,
  };
};

export const useCountErrorLogs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([errorLogsCountQueryKey, props], () => api.apis.ErrorLog.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountErrorLog: res.isLoading,
    isErrorCountErrorLog: res.isError,
    countErrorLogs: res.data,
  };
};

export const useExistErrorLog = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([errorLogExistQueryKey, props], () => api.apis.ErrorLog.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistErrorLog: res.isLoading,
    isErrorExistErrorLog: res.isError,
    existErrorLog: res.data,
  };
};

export const useErrorLogsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [errorLogsQueryKey, tableFetchProps, props],
    () =>
      api.apis.ErrorLog.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingErrorLogs: res.isLoading, isErrorErrorLogs: res.isError, errorLogsData: res.data };
};

export const useErrorLogs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([errorLogsQueryKey, props], () => api.apis.ErrorLog.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingErrorLogs: res.isLoading, isErrorErrorLogs: res.isError, errorLogsData: res.data };
};

export const useErrorLog = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([errorLogQueryKey, props], () => api.apis.ErrorLog.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingErrorLog: res.isLoading,
    isErrorErrorLog: res.isError,
    errorLogData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ErrorLog.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateErrorLogs: res.isLoading,
    isErrorCreateErrorLogs: res.isError,
    createErrorLogs: res.mutate,
    createdErrorLogs: res.data,
  };
};

export const useCreateListErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ErrorLog.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListErrorLogs: res.isLoading,
    isErrorCreateListErrorLogs: res.isError,
    createListErrorLogs: res.mutate,
    createdListErrorLogs: res.data,
  };
};

export const useCreateErrorLog = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ErrorLog.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateErrorLog: res.isLoading,
    isErrorCreateErrorLog: res.isError,
    createErrorLog: res.mutate,
    createdErrorLog: res.data,
  };
};

export const useUpdateErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorLog.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateErrorLogs: res.isLoading,
    isErrorUpdateErrorLogs: res.isError,
    updateErrorLogs: res.mutate,
    updatedErrorLogs: res.data,
  };
};

export const useUpdateListErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorLog.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListErrorLogs: res.isLoading,
    isErrorUpdateListErrorLogs: res.isError,
    updateListErrorLogs: res.mutate,
    updatedListErrorLogs: res.data,
  };
};

export const useUpdateErrorLogsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorLog.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateErrorLogsList: res.isLoading,
    isErrorUpdateErrorLogsList: res.isError,
    updateErrorLogsList: res.mutate,
    updatedErrorLogsList: res.data,
  };
};

export const useUpdateErrorLog = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorLog.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateErrorLog: res.isLoading,
    isErrorUpdateErrorLog: res.isError,
    updateErrorLog: res.mutate,
    updatedErrorLog: res.data,
  };
};

export const useDeleteErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.ErrorLog.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteErrorLogs: res.isLoading,
    isErrorDeleteErrorLogs: res.isError,
    deleteErrorLogs: res.mutate,
  };
};

export const useDeleteAllErrorLogs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.ErrorLog.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllErrorLogs: res.isLoading,
    isErrorDeleteAllErrorLogs: res.isError,
    deleteAllErrorLogs: res.mutate,
  };
};

export const useDeleteErrorLog = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.ErrorLog.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteErrorLogFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteErrorLog: res.isLoading,
    isErrorDeleteErrorLog: res.isError,
    deleteErrorLog: res.mutate,
    deleteErrorLogFromTable,
  };
};
