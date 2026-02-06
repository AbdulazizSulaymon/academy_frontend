import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const testsQueryKey = 'tests';
export const testQueryKey = 'test';
export const testExistQueryKey = 'exist-test';
export const testsCountQueryKey = 'count-tests';

export const testsAggregateQueryKey = 'aggregate-tests';

export const useAggregateTests = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [testsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/test/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateTest: res.isLoading,
    isError: res.isError,
    isErrorAggregateTest: res.isError,
    aggregateTests: res.data,
  };
};

export const useCountTests = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [testsCountQueryKey, props],
    queryFn: () => api.apis.Test.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountTest: res.isLoading,
    isError: res.isError,
    isErrorCountTest: res.isError,
    countTests: res.data,
  };
};

export const useExistTest = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [testExistQueryKey, props],
    queryFn: () => api.apis.Test.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistTest: res.isLoading,
    isError: res.isError,
    isErrorExistTest: res.isError,
    existTest: res.data,
  };
};

export const useTestsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [testsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Test.findMany({
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
    isLoadingTests: res.isLoading,
    isError: res.isError,
    isErrorTests: res.isError,
    testsData: res.data,
  };
};

export const useTests = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [testsQueryKey, props],
    queryFn: () => api.apis.Test.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingTests: res.isLoading,
    isError: res.isError,
    isErrorTests: res.isError,
    testsData: res.data,
  };
};

export const useTest = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [testQueryKey, props],
    queryFn: () => api.apis.Test.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingTest: res.isLoading,
    isError: res.isError,
    isErrorTest: res.isError,
    testData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateTests = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Test.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateTests: res.isPending,
    isError: res.isError,
    isErrorCreateTests: res.isError,
    createTests: res.mutate,
    createdTests: res.data,
  };
};

export const useCreateListTests = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Test.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListTests: res.isPending,
    isError: res.isError,
    isErrorCreateListTests: res.isError,
    createListTests: res.mutate,
    createdListTests: res.data,
  };
};

export const useCreateTest = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Test.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateTest: res.isPending,
    isError: res.isError,
    isErrorCreateTest: res.isError,
    createTest: res.mutate,
    createdTest: res.data,
  };
};

export const useUpdateTests = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Test.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTests: res.isPending,
    isError: res.isError,
    isErrorUpdateTests: res.isError,
    updateTests: res.mutate,
    updatedTests: res.data,
  };
};

export const useUpdateListTests = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Test.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListTests: res.isPending,
    isError: res.isError,
    isErrorUpdateListTests: res.isError,
    updateListTests: res.mutate,
    updatedListTests: res.data,
  };
};

export const useUpdateTestsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Test.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTestsList: res.isPending,
    isError: res.isError,
    isErrorUpdateTestsList: res.isError,
    updateTestsList: res.mutate,
    updatedTestsList: res.data,
  };
};

export const useUpdateTest = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Test.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTest: res.isPending,
    isError: res.isError,
    isErrorUpdateTest: res.isError,
    updateTest: res.mutate,
    updatedTest: res.data,
  };
};

export const useDeleteTests = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Test.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteTests: res.isPending,
    isError: res.isError,
    isErrorDeleteTests: res.isError,
    deleteTests: res.mutate,
  };
};

export const useDeleteAllTests = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Test.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllTests: res.isPending,
    isError: res.isError,
    isErrorDeleteAllTests: res.isError,
    deleteAllTests: res.mutate,
  };
};

export const useDeleteTest = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Test.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteTestFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteTest: res.isPending,
    isError: res.isError,
    isErrorDeleteTest: res.isError,
    deleteTest: res.mutate,
    deleteTestFromTable,
  };
};
