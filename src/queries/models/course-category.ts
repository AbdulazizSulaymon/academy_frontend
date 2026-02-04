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
  const res = useQuery(
    [courseCategoriesAggregateQueryKey, props],
    () => api.instance.post('/api/courseCategory/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateCourseCategory: res.isLoading,
    isErrorAggregateCourseCategory: res.isError,
    aggregateCourseCategories: res.data,
  };
};

export const useCountCourseCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [courseCategoriesCountQueryKey, props],
    () => api.apis.CourseCategory.count({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingCountCourseCategory: res.isLoading,
    isErrorCountCourseCategory: res.isError,
    countCourseCategories: res.data,
  };
};

export const useExistCourseCategory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [courseCategoryExistQueryKey, props],
    () => api.apis.CourseCategory.exist({ ...props }),
    options,
  );
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
  const res = useQuery(
    [courseCategoriesQueryKey, tableFetchProps, props],
    () =>
      api.apis.CourseCategory.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return {
    ...res,
    isLoadingCourseCategories: res.isLoading,
    isErrorCourseCategories: res.isError,
    courseCategoriesData: res.data,
  };
};

export const useCourseCategories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([courseCategoriesQueryKey, props], () => api.apis.CourseCategory.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
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
  const res = useQuery(
    [courseCategoryQueryKey, props],
    () => api.apis.CourseCategory.findOne({ ...props }),
    options as any,
  );
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
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CourseCategory.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateCourseCategories: res.isLoading,
    isErrorCreateCourseCategories: res.isError,
    createCourseCategories: res.mutate,
    createdCourseCategories: res.data,
  };
};

export const useCreateListCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CourseCategory.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListCourseCategories: res.isLoading,
    isErrorCreateListCourseCategories: res.isError,
    createListCourseCategories: res.mutate,
    createdListCourseCategories: res.data,
  };
};

export const useCreateCourseCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.CourseCategory.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateCourseCategory: res.isLoading,
    isErrorCreateCourseCategory: res.isError,
    createCourseCategory: res.mutate,
    createdCourseCategory: res.data,
  };
};

export const useUpdateCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CourseCategory.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCourseCategories: res.isLoading,
    isErrorUpdateCourseCategories: res.isError,
    updateCourseCategories: res.mutate,
    updatedCourseCategories: res.data,
  };
};

export const useUpdateListCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CourseCategory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListCourseCategories: res.isLoading,
    isErrorUpdateListCourseCategories: res.isError,
    updateListCourseCategories: res.mutate,
    updatedListCourseCategories: res.data,
  };
};

export const useUpdateCourseCategoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CourseCategory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCourseCategoriesList: res.isLoading,
    isErrorUpdateCourseCategoriesList: res.isError,
    updateCourseCategoriesList: res.mutate,
    updatedCourseCategoriesList: res.data,
  };
};

export const useUpdateCourseCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.CourseCategory.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateCourseCategory: res.isLoading,
    isErrorUpdateCourseCategory: res.isError,
    updateCourseCategory: res.mutate,
    updatedCourseCategory: res.data,
  };
};

export const useDeleteCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.CourseCategory.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteCourseCategories: res.isLoading,
    isErrorDeleteCourseCategories: res.isError,
    deleteCourseCategories: res.mutate,
  };
};

export const useDeleteAllCourseCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.CourseCategory.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllCourseCategories: res.isLoading,
    isErrorDeleteAllCourseCategories: res.isError,
    deleteAllCourseCategories: res.mutate,
  };
};

export const useDeleteCourseCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.CourseCategory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteCourseCategoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteCourseCategory: res.isLoading,
    isErrorDeleteCourseCategory: res.isError,
    deleteCourseCategory: res.mutate,
    deleteCourseCategoryFromTable,
  };
};
