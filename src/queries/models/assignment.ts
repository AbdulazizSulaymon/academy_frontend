import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const assignmentsQueryKey = 'assignments';
export const assignmentQueryKey = 'assignment';
export const assignmentExistQueryKey = 'exist-assignment';
export const assignmentsCountQueryKey = 'count-assignments';

export const assignmentsAggregateQueryKey = 'aggregate-assignments';

export const useAggregateAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [assignmentsAggregateQueryKey, props],
    () => api.instance.post('/api/assignment/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateAssignment: res.isLoading,
    isErrorAggregateAssignment: res.isError,
    aggregateAssignments: res.data,
  };
};

export const useCountAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([assignmentsCountQueryKey, props], () => api.apis.Assignment.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountAssignment: res.isLoading,
    isErrorCountAssignment: res.isError,
    countAssignments: res.data,
  };
};

export const useExistAssignment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([assignmentExistQueryKey, props], () => api.apis.Assignment.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistAssignment: res.isLoading,
    isErrorExistAssignment: res.isError,
    existAssignment: res.data,
  };
};

export const useAssignmentsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [assignmentsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Assignment.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingAssignments: res.isLoading, isErrorAssignments: res.isError, assignmentsData: res.data };
};

export const useAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([assignmentsQueryKey, props], () => api.apis.Assignment.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingAssignments: res.isLoading, isErrorAssignments: res.isError, assignmentsData: res.data };
};

export const useAssignment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([assignmentQueryKey, props], () => api.apis.Assignment.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingAssignment: res.isLoading,
    isErrorAssignment: res.isError,
    assignmentData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Assignment.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateAssignments: res.isLoading,
    isErrorCreateAssignments: res.isError,
    createAssignments: res.mutate,
    createdAssignments: res.data,
  };
};

export const useCreateListAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Assignment.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListAssignments: res.isLoading,
    isErrorCreateListAssignments: res.isError,
    createListAssignments: res.mutate,
    createdListAssignments: res.data,
  };
};

export const useCreateAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Assignment.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateAssignment: res.isLoading,
    isErrorCreateAssignment: res.isError,
    createAssignment: res.mutate,
    createdAssignment: res.data,
  };
};

export const useUpdateAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Assignment.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateAssignments: res.isLoading,
    isErrorUpdateAssignments: res.isError,
    updateAssignments: res.mutate,
    updatedAssignments: res.data,
  };
};

export const useUpdateListAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Assignment.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListAssignments: res.isLoading,
    isErrorUpdateListAssignments: res.isError,
    updateListAssignments: res.mutate,
    updatedListAssignments: res.data,
  };
};

export const useUpdateAssignmentsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Assignment.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateAssignmentsList: res.isLoading,
    isErrorUpdateAssignmentsList: res.isError,
    updateAssignmentsList: res.mutate,
    updatedAssignmentsList: res.data,
  };
};

export const useUpdateAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Assignment.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateAssignment: res.isLoading,
    isErrorUpdateAssignment: res.isError,
    updateAssignment: res.mutate,
    updatedAssignment: res.data,
  };
};

export const useDeleteAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Assignment.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAssignments: res.isLoading,
    isErrorDeleteAssignments: res.isError,
    deleteAssignments: res.mutate,
  };
};

export const useDeleteAllAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Assignment.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllAssignments: res.isLoading,
    isErrorDeleteAllAssignments: res.isError,
    deleteAllAssignments: res.mutate,
  };
};

export const useDeleteAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Assignment.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteAssignmentFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteAssignment: res.isLoading,
    isErrorDeleteAssignment: res.isError,
    deleteAssignment: res.mutate,
    deleteAssignmentFromTable,
  };
};
