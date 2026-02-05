import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const userAnswersQueryKey = 'user-answers';
export const userAnswerQueryKey = 'user-answer';
export const userAnswerExistQueryKey = 'exist-user-answer';
export const userAnswersCountQueryKey = 'count-user-answers';

export const userAnswersAggregateQueryKey = 'aggregate-user-answers';

export const useAggregateUserAnswers = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAnswersAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/userAnswer/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateUserAnswer: res.isLoading,
    isError: res.isError,
    isErrorAggregateUserAnswer: res.isError,
    aggregateUserAnswers: res.data,
  };
};

export const useCountUserAnswers = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAnswersCountQueryKey, props],
    queryFn: () => api.apis.UserAnswer.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountUserAnswer: res.isLoading,
    isError: res.isError,
    isErrorCountUserAnswer: res.isError,
    countUserAnswers: res.data,
  };
};

export const useExistUserAnswer = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAnswerExistQueryKey, props],
    queryFn: () => api.apis.UserAnswer.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistUserAnswer: res.isLoading,
    isError: res.isError,
    isErrorExistUserAnswer: res.isError,
    existUserAnswer: res.data,
  };
};

export const useUserAnswersWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [userAnswersQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.UserAnswer.findMany({
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
    isLoadingUserAnswers: res.isLoading,
    isError: res.isError,
    isErrorUserAnswers: res.isError,
    userAnswersData: res.data,
  };
};

export const useUserAnswers = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAnswersQueryKey, props],
    queryFn: () => api.apis.UserAnswer.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserAnswers: res.isLoading,
    isError: res.isError,
    isErrorUserAnswers: res.isError,
    userAnswersData: res.data,
  };
};

export const useUserAnswer = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAnswerQueryKey, props],
    queryFn: () => api.apis.UserAnswer.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserAnswer: res.isLoading,
    isError: res.isError,
    isErrorUserAnswer: res.isError,
    userAnswerData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateUserAnswers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserAnswer.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserAnswers: res.isPending,
    isError: res.isError,
    isErrorCreateUserAnswers: res.isError,
    createUserAnswers: res.mutate,
    createdUserAnswers: res.data,
  };
};

export const useCreateListUserAnswers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserAnswer.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListUserAnswers: res.isPending,
    isError: res.isError,
    isErrorCreateListUserAnswers: res.isError,
    createListUserAnswers: res.mutate,
    createdListUserAnswers: res.data,
  };
};

export const useCreateUserAnswer = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserAnswer.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserAnswer: res.isPending,
    isError: res.isError,
    isErrorCreateUserAnswer: res.isError,
    createUserAnswer: res.mutate,
    createdUserAnswer: res.data,
  };
};

export const useUpdateUserAnswers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAnswer.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserAnswers: res.isPending,
    isError: res.isError,
    isErrorUpdateUserAnswers: res.isError,
    updateUserAnswers: res.mutate,
    updatedUserAnswers: res.data,
  };
};

export const useUpdateListUserAnswers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAnswer.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListUserAnswers: res.isPending,
    isError: res.isError,
    isErrorUpdateListUserAnswers: res.isError,
    updateListUserAnswers: res.mutate,
    updatedListUserAnswers: res.data,
  };
};

export const useUpdateUserAnswersList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAnswer.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserAnswersList: res.isPending,
    isError: res.isError,
    isErrorUpdateUserAnswersList: res.isError,
    updateUserAnswersList: res.mutate,
    updatedUserAnswersList: res.data,
  };
};

export const useUpdateUserAnswer = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAnswer.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserAnswer: res.isPending,
    isError: res.isError,
    isErrorUpdateUserAnswer: res.isError,
    updateUserAnswer: res.mutate,
    updatedUserAnswer: res.data,
  };
};

export const useDeleteUserAnswers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.UserAnswer.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserAnswers: res.isPending,
    isError: res.isError,
    isErrorDeleteUserAnswers: res.isError,
    deleteUserAnswers: res.mutate,
  };
};

export const useDeleteAllUserAnswers = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.UserAnswer.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllUserAnswers: res.isPending,
    isError: res.isError,
    isErrorDeleteAllUserAnswers: res.isError,
    deleteAllUserAnswers: res.mutate,
  };
};

export const useDeleteUserAnswer = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.UserAnswer.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteUserAnswerFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserAnswer: res.isPending,
    isError: res.isError,
    isErrorDeleteUserAnswer: res.isError,
    deleteUserAnswer: res.mutate,
    deleteUserAnswerFromTable,
  };
};
