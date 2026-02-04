import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const departmentsQueryKey = 'departments';
export const departmentQueryKey = 'department';
export const departmentExistQueryKey = 'exist-department';
export const departmentsCountQueryKey = 'count-departments';

export const departmentsAggregateQueryKey = 'aggregate-departments';

export const useAggregateDepartments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [departmentsAggregateQueryKey, props],
    () => api.instance.post('/api/department/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateDepartment: res.isLoading,
    isErrorAggregateDepartment: res.isError,
    aggregateDepartments: res.data,
  };
};

export const useCountDepartments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([departmentsCountQueryKey, props], () => api.apis.Department.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountDepartment: res.isLoading,
    isErrorCountDepartment: res.isError,
    countDepartments: res.data,
  };
};

export const useExistDepartment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([departmentExistQueryKey, props], () => api.apis.Department.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistDepartment: res.isLoading,
    isErrorExistDepartment: res.isError,
    existDepartment: res.data,
  };
};

export const useDepartmentsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [departmentsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Department.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingDepartments: res.isLoading, isErrorDepartments: res.isError, departmentsData: res.data };
};

export const useDepartments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([departmentsQueryKey, props], () => api.apis.Department.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingDepartments: res.isLoading, isErrorDepartments: res.isError, departmentsData: res.data };
};

export const useDepartment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([departmentQueryKey, props], () => api.apis.Department.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingDepartment: res.isLoading,
    isErrorDepartment: res.isError,
    departmentData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateDepartments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Department.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateDepartments: res.isLoading,
    isErrorCreateDepartments: res.isError,
    createDepartments: res.mutate,
    createdDepartments: res.data,
  };
};

export const useCreateListDepartments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Department.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListDepartments: res.isLoading,
    isErrorCreateListDepartments: res.isError,
    createListDepartments: res.mutate,
    createdListDepartments: res.data,
  };
};

export const useCreateDepartment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Department.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateDepartment: res.isLoading,
    isErrorCreateDepartment: res.isError,
    createDepartment: res.mutate,
    createdDepartment: res.data,
  };
};

export const useUpdateDepartments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Department.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateDepartments: res.isLoading,
    isErrorUpdateDepartments: res.isError,
    updateDepartments: res.mutate,
    updatedDepartments: res.data,
  };
};

export const useUpdateListDepartments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Department.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListDepartments: res.isLoading,
    isErrorUpdateListDepartments: res.isError,
    updateListDepartments: res.mutate,
    updatedListDepartments: res.data,
  };
};

export const useUpdateDepartmentsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Department.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateDepartmentsList: res.isLoading,
    isErrorUpdateDepartmentsList: res.isError,
    updateDepartmentsList: res.mutate,
    updatedDepartmentsList: res.data,
  };
};

export const useUpdateDepartment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Department.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateDepartment: res.isLoading,
    isErrorUpdateDepartment: res.isError,
    updateDepartment: res.mutate,
    updatedDepartment: res.data,
  };
};

export const useDeleteDepartments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Department.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteDepartments: res.isLoading,
    isErrorDeleteDepartments: res.isError,
    deleteDepartments: res.mutate,
  };
};

export const useDeleteAllDepartments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Department.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllDepartments: res.isLoading,
    isErrorDeleteAllDepartments: res.isError,
    deleteAllDepartments: res.mutate,
  };
};

export const useDeleteDepartment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Department.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteDepartmentFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteDepartment: res.isLoading,
    isErrorDeleteDepartment: res.isError,
    deleteDepartment: res.mutate,
    deleteDepartmentFromTable,
  };
};
