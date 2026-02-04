import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const lessonsQueryKey = 'lessons';
export const lessonQueryKey = 'lesson';
export const lessonExistQueryKey = 'exist-lesson';
export const lessonsCountQueryKey = 'count-lessons';

export const lessonsAggregateQueryKey = 'aggregate-lessons';

export const useAggregateLessons = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [lessonsAggregateQueryKey, props],
    () => api.instance.post('/api/lesson/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateLesson: res.isLoading,
    isErrorAggregateLesson: res.isError,
    aggregateLessons: res.data,
  };
};

export const useCountLessons = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([lessonsCountQueryKey, props], () => api.apis.Lesson.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountLesson: res.isLoading,
    isErrorCountLesson: res.isError,
    countLessons: res.data,
  };
};

export const useExistLesson = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([lessonExistQueryKey, props], () => api.apis.Lesson.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistLesson: res.isLoading,
    isErrorExistLesson: res.isError,
    existLesson: res.data,
  };
};

export const useLessonsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [lessonsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Lesson.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingLessons: res.isLoading, isErrorLessons: res.isError, lessonsData: res.data };
};

export const useLessons = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([lessonsQueryKey, props], () => api.apis.Lesson.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingLessons: res.isLoading, isErrorLessons: res.isError, lessonsData: res.data };
};

export const useLesson = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([lessonQueryKey, props], () => api.apis.Lesson.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingLesson: res.isLoading,
    isErrorLesson: res.isError,
    lessonData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLessons = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Lesson.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateLessons: res.isLoading,
    isErrorCreateLessons: res.isError,
    createLessons: res.mutate,
    createdLessons: res.data,
  };
};

export const useCreateListLessons = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Lesson.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListLessons: res.isLoading,
    isErrorCreateListLessons: res.isError,
    createListLessons: res.mutate,
    createdListLessons: res.data,
  };
};

export const useCreateLesson = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Lesson.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateLesson: res.isLoading,
    isErrorCreateLesson: res.isError,
    createLesson: res.mutate,
    createdLesson: res.data,
  };
};

export const useUpdateLessons = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lesson.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLessons: res.isLoading,
    isErrorUpdateLessons: res.isError,
    updateLessons: res.mutate,
    updatedLessons: res.data,
  };
};

export const useUpdateListLessons = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lesson.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListLessons: res.isLoading,
    isErrorUpdateListLessons: res.isError,
    updateListLessons: res.mutate,
    updatedListLessons: res.data,
  };
};

export const useUpdateLessonsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lesson.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLessonsList: res.isLoading,
    isErrorUpdateLessonsList: res.isError,
    updateLessonsList: res.mutate,
    updatedLessonsList: res.data,
  };
};

export const useUpdateLesson = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lesson.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLesson: res.isLoading,
    isErrorUpdateLesson: res.isError,
    updateLesson: res.mutate,
    updatedLesson: res.data,
  };
};

export const useDeleteLessons = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Lesson.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteLessons: res.isLoading,
    isErrorDeleteLessons: res.isError,
    deleteLessons: res.mutate,
  };
};

export const useDeleteAllLessons = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Lesson.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllLessons: res.isLoading,
    isErrorDeleteAllLessons: res.isError,
    deleteAllLessons: res.mutate,
  };
};

export const useDeleteLesson = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Lesson.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteLessonFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteLesson: res.isLoading,
    isErrorDeleteLesson: res.isError,
    deleteLesson: res.mutate,
    deleteLessonFromTable,
  };
};
