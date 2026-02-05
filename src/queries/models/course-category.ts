import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const courseCategoriesQueryKey = 'course-categories';
export const courseCategoryQueryKey = 'course-category';
export const courseCategoryExistQueryKey = 'exist-course-category';
export const courseCategoriesCountQueryKey = 'count-course-categories';

export const courseCategoriesAggregateQueryKey = 'aggregate-course-categories';

export const useAggregateCourseCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseCategoriesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/courseCategory/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateCourseCategory: res.isLoading,
    isError: res.isError,
    isErrorAggregateCourseCategory: res.isError,
    aggregateCourseCategories: res.data,
  };
};

export const useCountCourseCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseCategoriesCountQueryKey, props],
    queryFn: () => api.apis.CourseCategory.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountCourseCategory: res.isLoading,
    isError: res.isError,
    isErrorCountCourseCategory: res.isError,
    countCourseCategories: res.data,
  };
};

export const useExistCourseCategory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseCategoryExistQueryKey, props],
    queryFn: () => api.apis.CourseCategory.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistCourseCategory: res.isLoading,
    isError: res.isError,
    isErrorExistCourseCategory: res.isError,
    existCourseCategory: res.data,
  };
};

export const useCourseCategoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [courseCategoriesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.CourseCategory.findMany({
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
    isLoadingCourseCategories: res.isLoading,
    isError: res.isError,
    isErrorCourseCategories: res.isError,
    courseCategoriesData: res.data,
  };
};

export const useCourseCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseCategoriesQueryKey, props],
    queryFn: () => api.apis.CourseCategory.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCourseCategories: res.isLoading,
    isError: res.isError,
    isErrorCourseCategories: res.isError,
    courseCategoriesData: res.data,
  };
};

export const useCourseCategory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [courseCategoryQueryKey, props],
    queryFn: () => api.apis.CourseCategory.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCourseCategory: res.isLoading,
    isError: res.isError,
    isErrorCourseCategory: res.isError,
    courseCategoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CourseCategory.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateCourseCategories: res.isPending,
    isError: res.isError,
    isErrorCreateCourseCategories: res.isError,
    createCourseCategories: res.mutate,
    createdCourseCategories: res.data,
  };
};

export const useCreateListCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CourseCategory.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListCourseCategories: res.isPending,
    isError: res.isError,
    isErrorCreateListCourseCategories: res.isError,
    createListCourseCategories: res.mutate,
    createdListCourseCategories: res.data,
  };
};

export const useCreateCourseCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.CourseCategory.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateCourseCategory: res.isPending,
    isError: res.isError,
    isErrorCreateCourseCategory: res.isError,
    createCourseCategory: res.mutate,
    createdCourseCategory: res.data,
  };
};

export const useUpdateCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseCategory.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourseCategories: res.isPending,
    isError: res.isError,
    isErrorUpdateCourseCategories: res.isError,
    updateCourseCategories: res.mutate,
    updatedCourseCategories: res.data,
  };
};

export const useUpdateListCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseCategory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListCourseCategories: res.isPending,
    isError: res.isError,
    isErrorUpdateListCourseCategories: res.isError,
    updateListCourseCategories: res.mutate,
    updatedListCourseCategories: res.data,
  };
};

export const useUpdateCourseCategoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseCategory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourseCategoriesList: res.isPending,
    isError: res.isError,
    isErrorUpdateCourseCategoriesList: res.isError,
    updateCourseCategoriesList: res.mutate,
    updatedCourseCategoriesList: res.data,
  };
};

export const useUpdateCourseCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.CourseCategory.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateCourseCategory: res.isPending,
    isError: res.isError,
    isErrorUpdateCourseCategory: res.isError,
    updateCourseCategory: res.mutate,
    updatedCourseCategory: res.data,
  };
};

export const useDeleteCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.CourseCategory.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteCourseCategories: res.isPending,
    isError: res.isError,
    isErrorDeleteCourseCategories: res.isError,
    deleteCourseCategories: res.mutate,
  };
};

export const useDeleteAllCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.CourseCategory.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllCourseCategories: res.isPending,
    isError: res.isError,
    isErrorDeleteAllCourseCategories: res.isError,
    deleteAllCourseCategories: res.mutate,
  };
};

export const useDeleteCourseCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.CourseCategory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteCourseCategoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteCourseCategory: res.isPending,
    isError: res.isError,
    isErrorDeleteCourseCategory: res.isError,
    deleteCourseCategory: res.mutate,
    deleteCourseCategoryFromTable,
  };
};
