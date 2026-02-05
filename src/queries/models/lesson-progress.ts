import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const lessonProgressesQueryKey = 'lesson-progresses';
export const lessonProgressQueryKey = 'lesson-progress';
export const lessonProgressExistQueryKey = 'exist-lesson-progress';
export const lessonProgressesCountQueryKey = 'count-lesson-progresses';

export const lessonProgressesAggregateQueryKey = 'aggregate-lesson-progresses';

export const useAggregateLessonProgresses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [lessonProgressesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/lessonProgress/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateLessonProgress: res.isLoading,
    isError: res.isError,
    isErrorAggregateLessonProgress: res.isError,
    aggregateLessonProgresses: res.data,
  };
};

export const useCountLessonProgresses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [lessonProgressesCountQueryKey, props],
    queryFn: () => api.apis.LessonProgress.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountLessonProgress: res.isLoading,
    isError: res.isError,
    isErrorCountLessonProgress: res.isError,
    countLessonProgresses: res.data,
  };
};

export const useExistLessonProgress = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [lessonProgressExistQueryKey, props],
    queryFn: () => api.apis.LessonProgress.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistLessonProgress: res.isLoading,
    isError: res.isError,
    isErrorExistLessonProgress: res.isError,
    existLessonProgress: res.data,
  };
};

export const useLessonProgressesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [lessonProgressesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.LessonProgress.findMany({
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
    isLoadingLessonProgresses: res.isLoading,
    isError: res.isError,
    isErrorLessonProgresses: res.isError,
    lessonProgressesData: res.data,
  };
};

export const useLessonProgresses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [lessonProgressesQueryKey, props],
    queryFn: () => api.apis.LessonProgress.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLessonProgresses: res.isLoading,
    isError: res.isError,
    isErrorLessonProgresses: res.isError,
    lessonProgressesData: res.data,
  };
};

export const useLessonProgress = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [lessonProgressQueryKey, props],
    queryFn: () => api.apis.LessonProgress.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLessonProgress: res.isLoading,
    isError: res.isError,
    isErrorLessonProgress: res.isError,
    lessonProgressData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLessonProgresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LessonProgress.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLessonProgresses: res.isPending,
    isError: res.isError,
    isErrorCreateLessonProgresses: res.isError,
    createLessonProgresses: res.mutate,
    createdLessonProgresses: res.data,
  };
};

export const useCreateListLessonProgresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LessonProgress.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListLessonProgresses: res.isPending,
    isError: res.isError,
    isErrorCreateListLessonProgresses: res.isError,
    createListLessonProgresses: res.mutate,
    createdListLessonProgresses: res.data,
  };
};

export const useCreateLessonProgress = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LessonProgress.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLessonProgress: res.isPending,
    isError: res.isError,
    isErrorCreateLessonProgress: res.isError,
    createLessonProgress: res.mutate,
    createdLessonProgress: res.data,
  };
};

export const useUpdateLessonProgresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LessonProgress.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLessonProgresses: res.isPending,
    isError: res.isError,
    isErrorUpdateLessonProgresses: res.isError,
    updateLessonProgresses: res.mutate,
    updatedLessonProgresses: res.data,
  };
};

export const useUpdateListLessonProgresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LessonProgress.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListLessonProgresses: res.isPending,
    isError: res.isError,
    isErrorUpdateListLessonProgresses: res.isError,
    updateListLessonProgresses: res.mutate,
    updatedListLessonProgresses: res.data,
  };
};

export const useUpdateLessonProgressesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LessonProgress.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLessonProgressesList: res.isPending,
    isError: res.isError,
    isErrorUpdateLessonProgressesList: res.isError,
    updateLessonProgressesList: res.mutate,
    updatedLessonProgressesList: res.data,
  };
};

export const useUpdateLessonProgress = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LessonProgress.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLessonProgress: res.isPending,
    isError: res.isError,
    isErrorUpdateLessonProgress: res.isError,
    updateLessonProgress: res.mutate,
    updatedLessonProgress: res.data,
  };
};

export const useDeleteLessonProgresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.LessonProgress.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLessonProgresses: res.isPending,
    isError: res.isError,
    isErrorDeleteLessonProgresses: res.isError,
    deleteLessonProgresses: res.mutate,
  };
};

export const useDeleteAllLessonProgresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.LessonProgress.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllLessonProgresses: res.isPending,
    isError: res.isError,
    isErrorDeleteAllLessonProgresses: res.isError,
    deleteAllLessonProgresses: res.mutate,
  };
};

export const useDeleteLessonProgress = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.LessonProgress.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteLessonProgressFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLessonProgress: res.isPending,
    isError: res.isError,
    isErrorDeleteLessonProgress: res.isError,
    deleteLessonProgress: res.mutate,
    deleteLessonProgressFromTable,
  };
};
