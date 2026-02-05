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
    isLoadingAggregateCourseCategory: res.isLoading,
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
    isLoadingCountCourseCategory: res.isLoading,
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
    isLoadingExistCourseCategory: res.isLoading,
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
    isLoadingCourseCategories: res.isLoading,
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
    isLoadingCourseCategories: res.isLoading,
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
    isLoadingCourseCategory: res.isLoading,
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
    isLoadingCreateCourseCategories: res.isPending,
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
    isLoadingCreateListCourseCategories: res.isPending,
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
    isLoadingCreateCourseCategory: res.isPending,
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
    isLoadingUpdateCourseCategories: res.isPending,
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
    isLoadingUpdateListCourseCategories: res.isPending,
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
    isLoadingUpdateCourseCategoriesList: res.isPending,
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
    isLoadingUpdateCourseCategory: res.isPending,
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
    isLoadingDeleteCourseCategories: res.isPending,
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
    isLoadingDeleteAllCourseCategories: res.isPending,
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
    isLoadingDeleteCourseCategory: res.isPending,
    isErrorDeleteCourseCategory: res.isError,
    deleteCourseCategory: res.mutate,
    deleteCourseCategoryFromTable,
  };
};
