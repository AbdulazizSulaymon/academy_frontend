import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const questionsQueryKey = 'questions';
export const questionQueryKey = 'question';
export const questionExistQueryKey = 'exist-question';
export const questionsCountQueryKey = 'count-questions';

export const questionsAggregateQueryKey = 'aggregate-questions';

export const useAggregateQuestions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/question/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateQuestion: res.isLoading,
    isError: res.isError,
    isErrorAggregateQuestion: res.isError,
    aggregateQuestions: res.data,
  };
};

export const useCountQuestions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionsCountQueryKey, props],
    queryFn: () => api.apis.Question.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountQuestion: res.isLoading,
    isError: res.isError,
    isErrorCountQuestion: res.isError,
    countQuestions: res.data,
  };
};

export const useExistQuestion = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionExistQueryKey, props],
    queryFn: () => api.apis.Question.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistQuestion: res.isLoading,
    isError: res.isError,
    isErrorExistQuestion: res.isError,
    existQuestion: res.data,
  };
};

export const useQuestionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [questionsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Question.findMany({
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
    isLoadingQuestions: res.isLoading,
    isError: res.isError,
    isErrorQuestions: res.isError,
    questionsData: res.data,
  };
};

export const useQuestions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionsQueryKey, props],
    queryFn: () => api.apis.Question.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingQuestions: res.isLoading,
    isError: res.isError,
    isErrorQuestions: res.isError,
    questionsData: res.data,
  };
};

export const useQuestion = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [questionQueryKey, props],
    queryFn: () => api.apis.Question.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingQuestion: res.isLoading,
    isError: res.isError,
    isErrorQuestion: res.isError,
    questionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateQuestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Question.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateQuestions: res.isPending,
    isError: res.isError,
    isErrorCreateQuestions: res.isError,
    createQuestions: res.mutate,
    createdQuestions: res.data,
  };
};

export const useCreateListQuestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Question.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListQuestions: res.isPending,
    isError: res.isError,
    isErrorCreateListQuestions: res.isError,
    createListQuestions: res.mutate,
    createdListQuestions: res.data,
  };
};

export const useCreateQuestion = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Question.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateQuestion: res.isPending,
    isError: res.isError,
    isErrorCreateQuestion: res.isError,
    createQuestion: res.mutate,
    createdQuestion: res.data,
  };
};

export const useUpdateQuestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Question.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateQuestions: res.isPending,
    isError: res.isError,
    isErrorUpdateQuestions: res.isError,
    updateQuestions: res.mutate,
    updatedQuestions: res.data,
  };
};

export const useUpdateListQuestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Question.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListQuestions: res.isPending,
    isError: res.isError,
    isErrorUpdateListQuestions: res.isError,
    updateListQuestions: res.mutate,
    updatedListQuestions: res.data,
  };
};

export const useUpdateQuestionsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Question.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateQuestionsList: res.isPending,
    isError: res.isError,
    isErrorUpdateQuestionsList: res.isError,
    updateQuestionsList: res.mutate,
    updatedQuestionsList: res.data,
  };
};

export const useUpdateQuestion = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Question.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateQuestion: res.isPending,
    isError: res.isError,
    isErrorUpdateQuestion: res.isError,
    updateQuestion: res.mutate,
    updatedQuestion: res.data,
  };
};

export const useDeleteQuestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Question.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteQuestions: res.isPending,
    isError: res.isError,
    isErrorDeleteQuestions: res.isError,
    deleteQuestions: res.mutate,
  };
};

export const useDeleteAllQuestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Question.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllQuestions: res.isPending,
    isError: res.isError,
    isErrorDeleteAllQuestions: res.isError,
    deleteAllQuestions: res.mutate,
  };
};

export const useDeleteQuestion = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Question.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteQuestionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteQuestion: res.isPending,
    isError: res.isError,
    isErrorDeleteQuestion: res.isError,
    deleteQuestion: res.mutate,
    deleteQuestionFromTable,
  };
};
