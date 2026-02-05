import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const courseEnrollmentsQueryKey = 'course-enrollments';
export const courseEnrollmentQueryKey = 'course-enrollment';
export const courseEnrollmentExistQueryKey = 'exist-course-enrollment';
export const courseEnrollmentsCountQueryKey = 'count-course-enrollments';

export const courseEnrollmentsAggregateQueryKey = 'aggregate-course-enrollments';

export const useAggregateCourseEnrollments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseEnrollmentsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/courseEnrollment/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateCourseEnrollment: res.isLoading,
    isError: res.isError,
    isErrorAggregateCourseEnrollment: res.isError,
    aggregateCourseEnrollments: res.data,
  };
};

export const useCountCourseEnrollments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseEnrollmentsCountQueryKey, props],
    queryFn: () => api.apis.CourseEnrollment.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountCourseEnrollment: res.isLoading,
    isError: res.isError,
    isErrorCountCourseEnrollment: res.isError,
    countCourseEnrollments: res.data,
  };
};

export const useExistCourseEnrollment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseEnrollmentExistQueryKey, props],
    queryFn: () => api.apis.CourseEnrollment.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistCourseEnrollment: res.isLoading,
    isError: res.isError,
    isErrorExistCourseEnrollment: res.isError,
    existCourseEnrollment: res.data,
  };
};

export const useCourseEnrollmentsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [courseEnrollmentsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.CourseEnrollment.findMany({
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
    isLoadingCourseEnrollments: res.isLoading,
    isError: res.isError,
    isErrorCourseEnrollments: res.isError,
    courseEnrollmentsData: res.data,
  };
};

export const useCourseEnrollments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseEnrollmentsQueryKey, props],
    queryFn: () => api.apis.CourseEnrollment.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCourseEnrollments: res.isLoading,
    isError: res.isError,
    isErrorCourseEnrollments: res.isError,
    courseEnrollmentsData: res.data,
  };
};

export const useCourseEnrollment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseEnrollmentQueryKey, props],
    queryFn: () => api.apis.CourseEnrollment.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCourseEnrollment: res.isLoading,
    isError: res.isError,
    isErrorCourseEnrollment: res.isError,
    courseEnrollmentData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateCourseEnrollments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CourseEnrollment.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateCourseEnrollments: res.isPending,
    isError: res.isError,
    isErrorCreateCourseEnrollments: res.isError,
    createCourseEnrollments: res.mutate,
    createdCourseEnrollments: res.data,
  };
};

export const useCreateListCourseEnrollments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CourseEnrollment.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListCourseEnrollments: res.isPending,
    isError: res.isError,
    isErrorCreateListCourseEnrollments: res.isError,
    createListCourseEnrollments: res.mutate,
    createdListCourseEnrollments: res.data,
  };
};

export const useCreateCourseEnrollment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CourseEnrollment.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateCourseEnrollment: res.isPending,
    isError: res.isError,
    isErrorCreateCourseEnrollment: res.isError,
    createCourseEnrollment: res.mutate,
    createdCourseEnrollment: res.data,
  };
};

export const useUpdateCourseEnrollments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseEnrollment.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourseEnrollments: res.isPending,
    isError: res.isError,
    isErrorUpdateCourseEnrollments: res.isError,
    updateCourseEnrollments: res.mutate,
    updatedCourseEnrollments: res.data,
  };
};

export const useUpdateListCourseEnrollments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseEnrollment.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListCourseEnrollments: res.isPending,
    isError: res.isError,
    isErrorUpdateListCourseEnrollments: res.isError,
    updateListCourseEnrollments: res.mutate,
    updatedListCourseEnrollments: res.data,
  };
};

export const useUpdateCourseEnrollmentsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseEnrollment.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourseEnrollmentsList: res.isPending,
    isError: res.isError,
    isErrorUpdateCourseEnrollmentsList: res.isError,
    updateCourseEnrollmentsList: res.mutate,
    updatedCourseEnrollmentsList: res.data,
  };
};

export const useUpdateCourseEnrollment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseEnrollment.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourseEnrollment: res.isPending,
    isError: res.isError,
    isErrorUpdateCourseEnrollment: res.isError,
    updateCourseEnrollment: res.mutate,
    updatedCourseEnrollment: res.data,
  };
};

export const useDeleteCourseEnrollments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.CourseEnrollment.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteCourseEnrollments: res.isPending,
    isError: res.isError,
    isErrorDeleteCourseEnrollments: res.isError,
    deleteCourseEnrollments: res.mutate,
  };
};

export const useDeleteAllCourseEnrollments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.CourseEnrollment.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllCourseEnrollments: res.isPending,
    isError: res.isError,
    isErrorDeleteAllCourseEnrollments: res.isError,
    deleteAllCourseEnrollments: res.mutate,
  };
};

export const useDeleteCourseEnrollment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.CourseEnrollment.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteCourseEnrollmentFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteCourseEnrollment: res.isPending,
    isError: res.isError,
    isErrorDeleteCourseEnrollment: res.isError,
    deleteCourseEnrollment: res.mutate,
    deleteCourseEnrollmentFromTable,
  };
};
