import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const employeesQueryKey = 'employees';
export const employeeQueryKey = 'employee';
export const employeeExistQueryKey = 'exist-employee';
export const employeesCountQueryKey = 'count-employees';

export const employeesAggregateQueryKey = 'aggregate-employees';

export const useAggregateEmployees = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [employeesAggregateQueryKey, props],
    () => api.instance.post('/api/employee/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateEmployee: res.isLoading,
    isErrorAggregateEmployee: res.isError,
    aggregateEmployees: res.data,
  };
};

export const useCountEmployees = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([employeesCountQueryKey, props], () => api.apis.Employee.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountEmployee: res.isLoading,
    isErrorCountEmployee: res.isError,
    countEmployees: res.data,
  };
};

export const useExistEmployee = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([employeeExistQueryKey, props], () => api.apis.Employee.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistEmployee: res.isLoading,
    isErrorExistEmployee: res.isError,
    existEmployee: res.data,
  };
};

export const useEmployeesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [employeesQueryKey, tableFetchProps, props],
    () =>
      api.apis.Employee.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingEmployees: res.isLoading, isErrorEmployees: res.isError, employeesData: res.data };
};

export const useEmployees = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([employeesQueryKey, props], () => api.apis.Employee.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingEmployees: res.isLoading, isErrorEmployees: res.isError, employeesData: res.data };
};

export const useEmployee = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([employeeQueryKey, props], () => api.apis.Employee.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingEmployee: res.isLoading,
    isErrorEmployee: res.isError,
    employeeData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateEmployees = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Employee.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateEmployees: res.isLoading,
    isErrorCreateEmployees: res.isError,
    createEmployees: res.mutate,
    createdEmployees: res.data,
  };
};

export const useCreateListEmployees = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Employee.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListEmployees: res.isLoading,
    isErrorCreateListEmployees: res.isError,
    createListEmployees: res.mutate,
    createdListEmployees: res.data,
  };
};

export const useCreateEmployee = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Employee.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateEmployee: res.isLoading,
    isErrorCreateEmployee: res.isError,
    createEmployee: res.mutate,
    createdEmployee: res.data,
  };
};

export const useUpdateEmployees = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Employee.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateEmployees: res.isLoading,
    isErrorUpdateEmployees: res.isError,
    updateEmployees: res.mutate,
    updatedEmployees: res.data,
  };
};

export const useUpdateListEmployees = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Employee.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListEmployees: res.isLoading,
    isErrorUpdateListEmployees: res.isError,
    updateListEmployees: res.mutate,
    updatedListEmployees: res.data,
  };
};

export const useUpdateEmployeesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Employee.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateEmployeesList: res.isLoading,
    isErrorUpdateEmployeesList: res.isError,
    updateEmployeesList: res.mutate,
    updatedEmployeesList: res.data,
  };
};

export const useUpdateEmployee = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Employee.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateEmployee: res.isLoading,
    isErrorUpdateEmployee: res.isError,
    updateEmployee: res.mutate,
    updatedEmployee: res.data,
  };
};

export const useDeleteEmployees = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Employee.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteEmployees: res.isLoading,
    isErrorDeleteEmployees: res.isError,
    deleteEmployees: res.mutate,
  };
};

export const useDeleteAllEmployees = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Employee.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllEmployees: res.isLoading,
    isErrorDeleteAllEmployees: res.isError,
    deleteAllEmployees: res.mutate,
  };
};

export const useDeleteEmployee = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Employee.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteEmployeeFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteEmployee: res.isLoading,
    isErrorDeleteEmployee: res.isError,
    deleteEmployee: res.mutate,
    deleteEmployeeFromTable,
  };
};
