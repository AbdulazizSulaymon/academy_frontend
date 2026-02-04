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
  const res = useQuery(
    [errorFeedbacksAggregateQueryKey, props],
    () => api.instance.post('/api/errorFeedback/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateErrorFeedback: res.isLoading,
    isErrorAggregateErrorFeedback: res.isError,
    aggregateErrorFeedbacks: res.data,
  };
};

export const useCountErrorFeedbacks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([errorFeedbacksCountQueryKey, props], () => api.apis.ErrorFeedback.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountErrorFeedback: res.isLoading,
    isErrorCountErrorFeedback: res.isError,
    countErrorFeedbacks: res.data,
  };
};

export const useExistErrorFeedback = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([errorFeedbackExistQueryKey, props], () => api.apis.ErrorFeedback.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistErrorFeedback: res.isLoading,
    isErrorExistErrorFeedback: res.isError,
    existErrorFeedback: res.data,
  };
};

export const useErrorFeedbacksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [errorFeedbacksQueryKey, tableFetchProps, props],
    () =>
      api.apis.ErrorFeedback.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return {
    ...res,
    isLoadingErrorFeedbacks: res.isLoading,
    isErrorErrorFeedbacks: res.isError,
    errorFeedbacksData: res.data,
  };
};

export const useErrorFeedbacks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([errorFeedbacksQueryKey, props], () => api.apis.ErrorFeedback.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingErrorFeedbacks: res.isLoading,
    isErrorErrorFeedbacks: res.isError,
    errorFeedbacksData: res.data,
  };
};

export const useErrorFeedback = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [errorFeedbackQueryKey, props],
    () => api.apis.ErrorFeedback.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingErrorFeedback: res.isLoading,
    isErrorErrorFeedback: res.isError,
    errorFeedbackData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ErrorFeedback.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateErrorFeedbacks: res.isLoading,
    isErrorCreateErrorFeedbacks: res.isError,
    createErrorFeedbacks: res.mutate,
    createdErrorFeedbacks: res.data,
  };
};

export const useCreateListErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ErrorFeedback.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListErrorFeedbacks: res.isLoading,
    isErrorCreateListErrorFeedbacks: res.isError,
    createListErrorFeedbacks: res.mutate,
    createdListErrorFeedbacks: res.data,
  };
};

export const useCreateErrorFeedback = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.ErrorFeedback.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateErrorFeedback: res.isLoading,
    isErrorCreateErrorFeedback: res.isError,
    createErrorFeedback: res.mutate,
    createdErrorFeedback: res.data,
  };
};

export const useUpdateErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorFeedback.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateErrorFeedbacks: res.isLoading,
    isErrorUpdateErrorFeedbacks: res.isError,
    updateErrorFeedbacks: res.mutate,
    updatedErrorFeedbacks: res.data,
  };
};

export const useUpdateListErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorFeedback.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListErrorFeedbacks: res.isLoading,
    isErrorUpdateListErrorFeedbacks: res.isError,
    updateListErrorFeedbacks: res.mutate,
    updatedListErrorFeedbacks: res.data,
  };
};

export const useUpdateErrorFeedbacksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorFeedback.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateErrorFeedbacksList: res.isLoading,
    isErrorUpdateErrorFeedbacksList: res.isError,
    updateErrorFeedbacksList: res.mutate,
    updatedErrorFeedbacksList: res.data,
  };
};

export const useUpdateErrorFeedback = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.ErrorFeedback.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateErrorFeedback: res.isLoading,
    isErrorUpdateErrorFeedback: res.isError,
    updateErrorFeedback: res.mutate,
    updatedErrorFeedback: res.data,
  };
};

export const useDeleteErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.ErrorFeedback.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteErrorFeedbacks: res.isLoading,
    isErrorDeleteErrorFeedbacks: res.isError,
    deleteErrorFeedbacks: res.mutate,
  };
};

export const useDeleteAllErrorFeedbacks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.ErrorFeedback.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllErrorFeedbacks: res.isLoading,
    isErrorDeleteAllErrorFeedbacks: res.isError,
    deleteAllErrorFeedbacks: res.mutate,
  };
};

export const useDeleteErrorFeedback = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.ErrorFeedback.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteErrorFeedbackFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteErrorFeedback: res.isLoading,
    isErrorDeleteErrorFeedback: res.isError,
    deleteErrorFeedback: res.mutate,
    deleteErrorFeedbackFromTable,
  };
};
