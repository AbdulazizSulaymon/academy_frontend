import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const userTestResultsQueryKey = 'user-test-results';
export const userTestResultQueryKey = 'user-test-result';
export const userTestResultExistQueryKey = 'exist-user-test-result';
export const userTestResultsCountQueryKey = 'count-user-test-results';

export const userTestResultsAggregateQueryKey = 'aggregate-user-test-results';

export const useAggregateUserTestResults = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTestResultsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/userTestResult/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateUserTestResult: res.isLoading,
    isError: res.isError,
    isErrorAggregateUserTestResult: res.isError,
    aggregateUserTestResults: res.data,
  };
};

export const useCountUserTestResults = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTestResultsCountQueryKey, props],
    queryFn: () => api.apis.UserTestResult.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountUserTestResult: res.isLoading,
    isError: res.isError,
    isErrorCountUserTestResult: res.isError,
    countUserTestResults: res.data,
  };
};

export const useExistUserTestResult = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTestResultExistQueryKey, props],
    queryFn: () => api.apis.UserTestResult.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistUserTestResult: res.isLoading,
    isError: res.isError,
    isErrorExistUserTestResult: res.isError,
    existUserTestResult: res.data,
  };
};

export const useUserTestResultsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [userTestResultsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.UserTestResult.findMany({
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
    isLoadingUserTestResults: res.isLoading,
    isError: res.isError,
    isErrorUserTestResults: res.isError,
    userTestResultsData: res.data,
  };
};

export const useUserTestResults = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTestResultsQueryKey, props],
    queryFn: () => api.apis.UserTestResult.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserTestResults: res.isLoading,
    isError: res.isError,
    isErrorUserTestResults: res.isError,
    userTestResultsData: res.data,
  };
};

export const useUserTestResult = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userTestResultQueryKey, props],
    queryFn: () => api.apis.UserTestResult.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserTestResult: res.isLoading,
    isError: res.isError,
    isErrorUserTestResult: res.isError,
    userTestResultData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateUserTestResults = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserTestResult.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserTestResults: res.isPending,
    isError: res.isError,
    isErrorCreateUserTestResults: res.isError,
    createUserTestResults: res.mutate,
    createdUserTestResults: res.data,
  };
};

export const useCreateListUserTestResults = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserTestResult.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListUserTestResults: res.isPending,
    isError: res.isError,
    isErrorCreateListUserTestResults: res.isError,
    createListUserTestResults: res.mutate,
    createdListUserTestResults: res.data,
  };
};

export const useCreateUserTestResult = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserTestResult.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserTestResult: res.isPending,
    isError: res.isError,
    isErrorCreateUserTestResult: res.isError,
    createUserTestResult: res.mutate,
    createdUserTestResult: res.data,
  };
};

export const useUpdateUserTestResults = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTestResult.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserTestResults: res.isPending,
    isError: res.isError,
    isErrorUpdateUserTestResults: res.isError,
    updateUserTestResults: res.mutate,
    updatedUserTestResults: res.data,
  };
};

export const useUpdateListUserTestResults = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTestResult.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListUserTestResults: res.isPending,
    isError: res.isError,
    isErrorUpdateListUserTestResults: res.isError,
    updateListUserTestResults: res.mutate,
    updatedListUserTestResults: res.data,
  };
};

export const useUpdateUserTestResultsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTestResult.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserTestResultsList: res.isPending,
    isError: res.isError,
    isErrorUpdateUserTestResultsList: res.isError,
    updateUserTestResultsList: res.mutate,
    updatedUserTestResultsList: res.data,
  };
};

export const useUpdateUserTestResult = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserTestResult.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserTestResult: res.isPending,
    isError: res.isError,
    isErrorUpdateUserTestResult: res.isError,
    updateUserTestResult: res.mutate,
    updatedUserTestResult: res.data,
  };
};

export const useDeleteUserTestResults = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.UserTestResult.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserTestResults: res.isPending,
    isError: res.isError,
    isErrorDeleteUserTestResults: res.isError,
    deleteUserTestResults: res.mutate,
  };
};

export const useDeleteAllUserTestResults = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.UserTestResult.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllUserTestResults: res.isPending,
    isError: res.isError,
    isErrorDeleteAllUserTestResults: res.isError,
    deleteAllUserTestResults: res.mutate,
  };
};

export const useDeleteUserTestResult = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.UserTestResult.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteUserTestResultFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserTestResult: res.isPending,
    isError: res.isError,
    isErrorDeleteUserTestResult: res.isError,
    deleteUserTestResult: res.mutate,
    deleteUserTestResultFromTable,
  };
};
