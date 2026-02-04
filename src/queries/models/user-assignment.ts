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
  const res = useQuery(
    [userAssignmentsAggregateQueryKey, props],
    () => api.instance.post('/api/userAssignment/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateUserAssignment: res.isLoading,
    isErrorAggregateUserAssignment: res.isError,
    aggregateUserAssignments: res.data,
  };
};

export const useCountUserAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [userAssignmentsCountQueryKey, props],
    () => api.apis.UserAssignment.count({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingCountUserAssignment: res.isLoading,
    isErrorCountUserAssignment: res.isError,
    countUserAssignments: res.data,
  };
};

export const useExistUserAssignment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [userAssignmentExistQueryKey, props],
    () => api.apis.UserAssignment.exist({ ...props }),
    options,
  );
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
  const res = useQuery(
    [userAssignmentsQueryKey, tableFetchProps, props],
    () =>
      api.apis.UserAssignment.findMany({
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
    isLoadingUserAssignments: res.isLoading,
    isErrorUserAssignments: res.isError,
    userAssignmentsData: res.data,
  };
};

export const useUserAssignments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([userAssignmentsQueryKey, props], () => api.apis.UserAssignment.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
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
  const res = useQuery(
    [userAssignmentQueryKey, props],
    () => api.apis.UserAssignment.findOne({ ...props }),
    options as any,
  );
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
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserAssignment.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateUserAssignments: res.isLoading,
    isErrorCreateUserAssignments: res.isError,
    createUserAssignments: res.mutate,
    createdUserAssignments: res.data,
  };
};

export const useCreateListUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserAssignment.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListUserAssignments: res.isLoading,
    isErrorCreateListUserAssignments: res.isError,
    createListUserAssignments: res.mutate,
    createdListUserAssignments: res.data,
  };
};

export const useCreateUserAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.UserAssignment.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateUserAssignment: res.isLoading,
    isErrorCreateUserAssignment: res.isError,
    createUserAssignment: res.mutate,
    createdUserAssignment: res.data,
  };
};

export const useUpdateUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserAssignment.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserAssignments: res.isLoading,
    isErrorUpdateUserAssignments: res.isError,
    updateUserAssignments: res.mutate,
    updatedUserAssignments: res.data,
  };
};

export const useUpdateListUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserAssignment.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListUserAssignments: res.isLoading,
    isErrorUpdateListUserAssignments: res.isError,
    updateListUserAssignments: res.mutate,
    updatedListUserAssignments: res.data,
  };
};

export const useUpdateUserAssignmentsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserAssignment.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserAssignmentsList: res.isLoading,
    isErrorUpdateUserAssignmentsList: res.isError,
    updateUserAssignmentsList: res.mutate,
    updatedUserAssignmentsList: res.data,
  };
};

export const useUpdateUserAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.UserAssignment.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateUserAssignment: res.isLoading,
    isErrorUpdateUserAssignment: res.isError,
    updateUserAssignment: res.mutate,
    updatedUserAssignment: res.data,
  };
};

export const useDeleteUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.UserAssignment.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteUserAssignments: res.isLoading,
    isErrorDeleteUserAssignments: res.isError,
    deleteUserAssignments: res.mutate,
  };
};

export const useDeleteAllUserAssignments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.UserAssignment.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllUserAssignments: res.isLoading,
    isErrorDeleteAllUserAssignments: res.isError,
    deleteAllUserAssignments: res.mutate,
  };
};

export const useDeleteUserAssignment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.UserAssignment.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteUserAssignmentFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteUserAssignment: res.isLoading,
    isErrorDeleteUserAssignment: res.isError,
    deleteUserAssignment: res.mutate,
    deleteUserAssignmentFromTable,
  };
};
