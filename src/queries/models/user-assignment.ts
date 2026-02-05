import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const userAssignmentsQueryKey = 'user-assignments';
export const userAssignmentQueryKey = 'user-assignment';
export const userAssignmentExistQueryKey = 'exist-user-assignment';
export const userAssignmentsCountQueryKey = 'count-user-assignments';

export const userAssignmentsAggregateQueryKey = 'aggregate-user-assignments';

export const useAggregateUserAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAssignmentsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/userAssignment/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateUserAssignment: res.isLoading,
    isError: res.isError,
    isErrorAggregateUserAssignment: res.isError,
    aggregateUserAssignments: res.data,
  };
};

export const useCountUserAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAssignmentsCountQueryKey, props],
    queryFn: () => api.apis.UserAssignment.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountUserAssignment: res.isLoading,
    isError: res.isError,
    isErrorCountUserAssignment: res.isError,
    countUserAssignments: res.data,
  };
};

export const useExistUserAssignment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAssignmentExistQueryKey, props],
    queryFn: () => api.apis.UserAssignment.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistUserAssignment: res.isLoading,
    isError: res.isError,
    isErrorExistUserAssignment: res.isError,
    existUserAssignment: res.data,
  };
};

export const useUserAssignmentsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [userAssignmentsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.UserAssignment.findMany({
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
    isLoadingUserAssignments: res.isLoading,
    isError: res.isError,
    isErrorUserAssignments: res.isError,
    userAssignmentsData: res.data,
  };
};

export const useUserAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAssignmentsQueryKey, props],
    queryFn: () => api.apis.UserAssignment.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserAssignments: res.isLoading,
    isError: res.isError,
    isErrorUserAssignments: res.isError,
    userAssignmentsData: res.data,
  };
};

export const useUserAssignment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [userAssignmentQueryKey, props],
    queryFn: () => api.apis.UserAssignment.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingUserAssignment: res.isLoading,
    isError: res.isError,
    isErrorUserAssignment: res.isError,
    userAssignmentData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserAssignment.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserAssignments: res.isPending,
    isError: res.isError,
    isErrorCreateUserAssignments: res.isError,
    createUserAssignments: res.mutate,
    createdUserAssignments: res.data,
  };
};

export const useCreateListUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserAssignment.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListUserAssignments: res.isPending,
    isError: res.isError,
    isErrorCreateListUserAssignments: res.isError,
    createListUserAssignments: res.mutate,
    createdListUserAssignments: res.data,
  };
};

export const useCreateUserAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.UserAssignment.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateUserAssignment: res.isPending,
    isError: res.isError,
    isErrorCreateUserAssignment: res.isError,
    createUserAssignment: res.mutate,
    createdUserAssignment: res.data,
  };
};

export const useUpdateUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAssignment.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserAssignments: res.isPending,
    isError: res.isError,
    isErrorUpdateUserAssignments: res.isError,
    updateUserAssignments: res.mutate,
    updatedUserAssignments: res.data,
  };
};

export const useUpdateListUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAssignment.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListUserAssignments: res.isPending,
    isError: res.isError,
    isErrorUpdateListUserAssignments: res.isError,
    updateListUserAssignments: res.mutate,
    updatedListUserAssignments: res.data,
  };
};

export const useUpdateUserAssignmentsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAssignment.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserAssignmentsList: res.isPending,
    isError: res.isError,
    isErrorUpdateUserAssignmentsList: res.isError,
    updateUserAssignmentsList: res.mutate,
    updatedUserAssignmentsList: res.data,
  };
};

export const useUpdateUserAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.UserAssignment.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateUserAssignment: res.isPending,
    isError: res.isError,
    isErrorUpdateUserAssignment: res.isError,
    updateUserAssignment: res.mutate,
    updatedUserAssignment: res.data,
  };
};

export const useDeleteUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.UserAssignment.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserAssignments: res.isPending,
    isError: res.isError,
    isErrorDeleteUserAssignments: res.isError,
    deleteUserAssignments: res.mutate,
  };
};

export const useDeleteAllUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.UserAssignment.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllUserAssignments: res.isPending,
    isError: res.isError,
    isErrorDeleteAllUserAssignments: res.isError,
    deleteAllUserAssignments: res.mutate,
  };
};

export const useDeleteUserAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.UserAssignment.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteUserAssignmentFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteUserAssignment: res.isPending,
    isError: res.isError,
    isErrorDeleteUserAssignment: res.isError,
    deleteUserAssignment: res.mutate,
    deleteUserAssignmentFromTable,
  };
};
