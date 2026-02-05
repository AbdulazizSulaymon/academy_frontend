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
    isLoadingAggregateUserAssignment: res.isLoading,
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
    isLoadingCountUserAssignment: res.isLoading,
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
    isLoadingExistUserAssignment: res.isLoading,
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
    isLoadingUserAssignments: res.isLoading,
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
    isLoadingUserAssignments: res.isLoading,
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
    isLoadingUserAssignment: res.isLoading,
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
    isLoadingCreateUserAssignments: res.isPending,
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
    isLoadingCreateListUserAssignments: res.isPending,
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
    isLoadingCreateUserAssignment: res.isPending,
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
    isLoadingUpdateUserAssignments: res.isPending,
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
    isLoadingUpdateListUserAssignments: res.isPending,
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
    isLoadingUpdateUserAssignmentsList: res.isPending,
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
    isLoadingUpdateUserAssignment: res.isPending,
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
    isLoadingDeleteUserAssignments: res.isPending,
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
    isLoadingDeleteAllUserAssignments: res.isPending,
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
    isLoadingDeleteUserAssignment: res.isPending,
    isErrorDeleteUserAssignment: res.isError,
    deleteUserAssignment: res.mutate,
    deleteUserAssignmentFromTable,
  };
};
