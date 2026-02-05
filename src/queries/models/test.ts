import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';

export const testsQueryKey = 'tests';
export const testQueryKey = 'test';

/**
 * Get test for taking - includes questions but excludes correct answers
 */
export const useGetTestForTaking = (testId: string, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [testQueryKey, 'for-taking', testId],
    queryFn: () =>
      api.instance.post('/api/test/get-for-taking', {
        where: { id: testId },
      }),
    enabled: options.enabled != undefined ? !!options.enabled : !!testId,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isError: res.isError,
    testData: res.data?.data,
  };
};

/**
 * Start a new test attempt
 */
export const useStartTest = (options: QueryOptions = {}, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: { userId: string; testId: string }) => {
      return api.instance.post('/api/test/start', data);
    },
    onSuccess: secondaryOptions?.onSuccess,
    ...getQueryOptions(queryClient, options, {}),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isError: res.isError,
    startTest: res.mutate,
    testResult: res.data?.data,
  };
};

/**
 * Submit test answers
 */
export const useSubmitTest = (options: QueryOptions = {}, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: { userTestResultId: string; answers: any[] }) => {
      return api.instance.post('/api/test/submit', data);
    },
    onSuccess: secondaryOptions?.onSuccess,
    ...getQueryOptions(queryClient, options, {}),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isError: res.isError,
    submitTest: res.mutate,
    testResult: res.data?.data,
  };
};

/**
 * Get user's test results for a specific test
 */
export const useGetUserTestResults = (
  props: { userId: string; testId: string },
  options: QueryOptions = {},
) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [testsQueryKey, 'user-results', props.userId, props.testId],
    queryFn: () =>
      api.instance.post('/api/test/user-results', {
        userId: props.userId,
        testId: props.testId,
      }),
    enabled: options.enabled != undefined ? !!options.enabled : !!(props.userId && props.testId),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isError: res.isError,
    testResults: res.data?.data,
  };
};
