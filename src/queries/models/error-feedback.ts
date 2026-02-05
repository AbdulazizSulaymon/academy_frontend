import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const errorFeedbacksQueryKey = 'error-feedbacks';
export const errorFeedbackQueryKey = 'error-feedback';
export const errorFeedbackExistQueryKey = 'exist-error-feedback';
export const errorFeedbacksCountQueryKey = 'count-error-feedbacks';

export const errorFeedbacksAggregateQueryKey = 'aggregate-error-feedbacks';

export const useAggregateErrorFeedbacks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorFeedbacksAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/errorFeedback/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateErrorFeedback: res.isLoading,
    isError: res.isError,
    isErrorAggregateErrorFeedback: res.isError,
    aggregateErrorFeedbacks: res.data,
  };
};

export const useCountErrorFeedbacks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorFeedbacksCountQueryKey, props],
    queryFn: () => api.apis.ErrorFeedback.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountErrorFeedback: res.isLoading,
    isError: res.isError,
    isErrorCountErrorFeedback: res.isError,
    countErrorFeedbacks: res.data,
  };
};

export const useExistErrorFeedback = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorFeedbackExistQueryKey, props],
    queryFn: () => api.apis.ErrorFeedback.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistErrorFeedback: res.isLoading,
    isError: res.isError,
    isErrorExistErrorFeedback: res.isError,
    existErrorFeedback: res.data,
  };
};

export const useErrorFeedbacksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [errorFeedbacksQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.ErrorFeedback.findMany({
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
    isLoadingErrorFeedbacks: res.isLoading,
    isError: res.isError,
    isErrorErrorFeedbacks: res.isError,
    errorFeedbacksData: res.data,
  };
};

export const useErrorFeedbacks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorFeedbacksQueryKey, props],
    queryFn: () => api.apis.ErrorFeedback.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingErrorFeedbacks: res.isLoading,
    isError: res.isError,
    isErrorErrorFeedbacks: res.isError,
    errorFeedbacksData: res.data,
  };
};

export const useErrorFeedback = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [errorFeedbackQueryKey, props],
    queryFn: () => api.apis.ErrorFeedback.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingErrorFeedback: res.isLoading,
    isError: res.isError,
    isErrorErrorFeedback: res.isError,
    errorFeedbackData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ErrorFeedback.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateErrorFeedbacks: res.isPending,
    isError: res.isError,
    isErrorCreateErrorFeedbacks: res.isError,
    createErrorFeedbacks: res.mutate,
    createdErrorFeedbacks: res.data,
  };
};

export const useCreateListErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ErrorFeedback.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListErrorFeedbacks: res.isPending,
    isError: res.isError,
    isErrorCreateListErrorFeedbacks: res.isError,
    createListErrorFeedbacks: res.mutate,
    createdListErrorFeedbacks: res.data,
  };
};

export const useCreateErrorFeedback = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.ErrorFeedback.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateErrorFeedback: res.isPending,
    isError: res.isError,
    isErrorCreateErrorFeedback: res.isError,
    createErrorFeedback: res.mutate,
    createdErrorFeedback: res.data,
  };
};

export const useUpdateErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorFeedback.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateErrorFeedbacks: res.isPending,
    isError: res.isError,
    isErrorUpdateErrorFeedbacks: res.isError,
    updateErrorFeedbacks: res.mutate,
    updatedErrorFeedbacks: res.data,
  };
};

export const useUpdateListErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorFeedback.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListErrorFeedbacks: res.isPending,
    isError: res.isError,
    isErrorUpdateListErrorFeedbacks: res.isError,
    updateListErrorFeedbacks: res.mutate,
    updatedListErrorFeedbacks: res.data,
  };
};

export const useUpdateErrorFeedbacksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorFeedback.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateErrorFeedbacksList: res.isPending,
    isError: res.isError,
    isErrorUpdateErrorFeedbacksList: res.isError,
    updateErrorFeedbacksList: res.mutate,
    updatedErrorFeedbacksList: res.data,
  };
};

export const useUpdateErrorFeedback = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.ErrorFeedback.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateErrorFeedback: res.isPending,
    isError: res.isError,
    isErrorUpdateErrorFeedback: res.isError,
    updateErrorFeedback: res.mutate,
    updatedErrorFeedback: res.data,
  };
};

export const useDeleteErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.ErrorFeedback.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteErrorFeedbacks: res.isPending,
    isError: res.isError,
    isErrorDeleteErrorFeedbacks: res.isError,
    deleteErrorFeedbacks: res.mutate,
  };
};

export const useDeleteAllErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.ErrorFeedback.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllErrorFeedbacks: res.isPending,
    isError: res.isError,
    isErrorDeleteAllErrorFeedbacks: res.isError,
    deleteAllErrorFeedbacks: res.mutate,
  };
};

export const useDeleteErrorFeedback = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.ErrorFeedback.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteErrorFeedbackFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteErrorFeedback: res.isPending,
    isError: res.isError,
    isErrorDeleteErrorFeedback: res.isError,
    deleteErrorFeedback: res.mutate,
    deleteErrorFeedbackFromTable,
  };
};
