import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const coursesQueryKey = 'courses';
export const courseQueryKey = 'course';
export const courseExistQueryKey = 'exist-course';
export const coursesCountQueryKey = 'count-courses';

export const coursesAggregateQueryKey = 'aggregate-courses';

export const useAggregateCourses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [coursesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/course/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateCourse: res.isLoading,
    isError: res.isError,
    isErrorAggregateCourse: res.isError,
    aggregateCourses: res.data,
  };
};

export const useCountCourses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [coursesCountQueryKey, props],
    queryFn: () => api.apis.Course.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountCourse: res.isLoading,
    isError: res.isError,
    isErrorCountCourse: res.isError,
    countCourses: res.data,
  };
};

export const useExistCourse = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseExistQueryKey, props],
    queryFn: () => api.apis.Course.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistCourse: res.isLoading,
    isError: res.isError,
    isErrorExistCourse: res.isError,
    existCourse: res.data,
  };
};

export const useCoursesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [coursesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Course.findMany({
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
    isLoadingCourses: res.isLoading,
    isError: res.isError,
    isErrorCourses: res.isError,
    coursesData: res.data,
  };
};

export const useCourses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [coursesQueryKey, props],
    queryFn: () => api.apis.Course.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCourses: res.isLoading,
    isError: res.isError,
    isErrorCourses: res.isError,
    coursesData: res.data,
  };
};

export const useCourse = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseQueryKey, props],
    queryFn: () => api.apis.Course.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCourse: res.isLoading,
    isError: res.isError,
    isErrorCourse: res.isError,
    courseData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateCourses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Course.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateCourses: res.isPending,
    isError: res.isError,
    isErrorCreateCourses: res.isError,
    createCourses: res.mutate,
    createdCourses: res.data,
  };
};

export const useCreateListCourses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Course.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListCourses: res.isPending,
    isError: res.isError,
    isErrorCreateListCourses: res.isError,
    createListCourses: res.mutate,
    createdListCourses: res.data,
  };
};

export const useCreateCourse = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Course.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateCourse: res.isPending,
    isError: res.isError,
    isErrorCreateCourse: res.isError,
    createCourse: res.mutate,
    createdCourse: res.data,
  };
};

export const useUpdateCourses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Course.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourses: res.isPending,
    isError: res.isError,
    isErrorUpdateCourses: res.isError,
    updateCourses: res.mutate,
    updatedCourses: res.data,
  };
};

export const useUpdateListCourses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Course.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListCourses: res.isPending,
    isError: res.isError,
    isErrorUpdateListCourses: res.isError,
    updateListCourses: res.mutate,
    updatedListCourses: res.data,
  };
};

export const useUpdateCoursesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Course.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCoursesList: res.isPending,
    isError: res.isError,
    isErrorUpdateCoursesList: res.isError,
    updateCoursesList: res.mutate,
    updatedCoursesList: res.data,
  };
};

export const useUpdateCourse = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Course.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourse: res.isPending,
    isError: res.isError,
    isErrorUpdateCourse: res.isError,
    updateCourse: res.mutate,
    updatedCourse: res.data,
  };
};

export const useDeleteCourses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Course.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteCourses: res.isPending,
    isError: res.isError,
    isErrorDeleteCourses: res.isError,
    deleteCourses: res.mutate,
  };
};

export const useDeleteAllCourses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Course.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllCourses: res.isPending,
    isError: res.isError,
    isErrorDeleteAllCourses: res.isError,
    deleteAllCourses: res.mutate,
  };
};

export const useDeleteCourse = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Course.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteCourseFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteCourse: res.isPending,
    isError: res.isError,
    isErrorDeleteCourse: res.isError,
    deleteCourse: res.mutate,
    deleteCourseFromTable,
  };
};
