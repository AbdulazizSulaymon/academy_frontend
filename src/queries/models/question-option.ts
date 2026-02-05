import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const questionOptionsQueryKey = 'question-options';
export const questionOptionQueryKey = 'question-option';
export const questionOptionExistQueryKey = 'exist-question-option';
export const questionOptionsCountQueryKey = 'count-question-options';

export const questionOptionsAggregateQueryKey = 'aggregate-question-options';

export const useAggregateQuestionOptions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionOptionsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/questionOption/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateQuestionOption: res.isLoading,
    isError: res.isError,
    isErrorAggregateQuestionOption: res.isError,
    aggregateQuestionOptions: res.data,
  };
};

export const useCountQuestionOptions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionOptionsCountQueryKey, props],
    queryFn: () => api.apis.QuestionOption.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountQuestionOption: res.isLoading,
    isError: res.isError,
    isErrorCountQuestionOption: res.isError,
    countQuestionOptions: res.data,
  };
};

export const useExistQuestionOption = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionOptionExistQueryKey, props],
    queryFn: () => api.apis.QuestionOption.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistQuestionOption: res.isLoading,
    isError: res.isError,
    isErrorExistQuestionOption: res.isError,
    existQuestionOption: res.data,
  };
};

export const useQuestionOptionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [questionOptionsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.QuestionOption.findMany({
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
    isLoadingQuestionOptions: res.isLoading,
    isError: res.isError,
    isErrorQuestionOptions: res.isError,
    questionOptionsData: res.data,
  };
};

export const useQuestionOptions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionOptionsQueryKey, props],
    queryFn: () => api.apis.QuestionOption.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingQuestionOptions: res.isLoading,
    isError: res.isError,
    isErrorQuestionOptions: res.isError,
    questionOptionsData: res.data,
  };
};

export const useQuestionOption = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionOptionQueryKey, props],
    queryFn: () => api.apis.QuestionOption.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingQuestionOption: res.isLoading,
    isError: res.isError,
    isErrorQuestionOption: res.isError,
    questionOptionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateQuestionOptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.QuestionOption.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateQuestionOptions: res.isPending,
    isError: res.isError,
    isErrorCreateQuestionOptions: res.isError,
    createQuestionOptions: res.mutate,
    createdQuestionOptions: res.data,
  };
};

export const useCreateListQuestionOptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.QuestionOption.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListQuestionOptions: res.isPending,
    isError: res.isError,
    isErrorCreateListQuestionOptions: res.isError,
    createListQuestionOptions: res.mutate,
    createdListQuestionOptions: res.data,
  };
};

export const useCreateQuestionOption = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.QuestionOption.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateQuestionOption: res.isPending,
    isError: res.isError,
    isErrorCreateQuestionOption: res.isError,
    createQuestionOption: res.mutate,
    createdQuestionOption: res.data,
  };
};

export const useUpdateQuestionOptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.QuestionOption.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateQuestionOptions: res.isPending,
    isError: res.isError,
    isErrorUpdateQuestionOptions: res.isError,
    updateQuestionOptions: res.mutate,
    updatedQuestionOptions: res.data,
  };
};

export const useUpdateListQuestionOptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.QuestionOption.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListQuestionOptions: res.isPending,
    isError: res.isError,
    isErrorUpdateListQuestionOptions: res.isError,
    updateListQuestionOptions: res.mutate,
    updatedListQuestionOptions: res.data,
  };
};

export const useUpdateQuestionOptionsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.QuestionOption.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateQuestionOptionsList: res.isPending,
    isError: res.isError,
    isErrorUpdateQuestionOptionsList: res.isError,
    updateQuestionOptionsList: res.mutate,
    updatedQuestionOptionsList: res.data,
  };
};

export const useUpdateQuestionOption = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.QuestionOption.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateQuestionOption: res.isPending,
    isError: res.isError,
    isErrorUpdateQuestionOption: res.isError,
    updateQuestionOption: res.mutate,
    updatedQuestionOption: res.data,
  };
};

export const useDeleteQuestionOptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.QuestionOption.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteQuestionOptions: res.isPending,
    isError: res.isError,
    isErrorDeleteQuestionOptions: res.isError,
    deleteQuestionOptions: res.mutate,
  };
};

export const useDeleteAllQuestionOptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.QuestionOption.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllQuestionOptions: res.isPending,
    isError: res.isError,
    isErrorDeleteAllQuestionOptions: res.isError,
    deleteAllQuestionOptions: res.mutate,
  };
};

export const useDeleteQuestionOption = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.QuestionOption.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteQuestionOptionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteQuestionOption: res.isPending,
    isError: res.isError,
    isErrorDeleteQuestionOption: res.isError,
    deleteQuestionOption: res.mutate,
    deleteQuestionOptionFromTable,
  };
};
