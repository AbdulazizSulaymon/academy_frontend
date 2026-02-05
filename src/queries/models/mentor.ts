import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const mentorsQueryKey = 'mentors';
export const mentorQueryKey = 'mentor';
export const mentorExistQueryKey = 'exist-mentor';
export const mentorsCountQueryKey = 'count-mentors';

export const mentorsAggregateQueryKey = 'aggregate-mentors';

export const useAggregateMentors = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [mentorsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/mentor/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateMentor: res.isLoading,
    isError: res.isError,
    isErrorAggregateMentor: res.isError,
    aggregateMentors: res.data,
  };
};

export const useCountMentors = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [mentorsCountQueryKey, props],
    queryFn: () => api.apis.Mentor.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountMentor: res.isLoading,
    isError: res.isError,
    isErrorCountMentor: res.isError,
    countMentors: res.data,
  };
};

export const useExistMentor = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [mentorExistQueryKey, props],
    queryFn: () => api.apis.Mentor.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistMentor: res.isLoading,
    isError: res.isError,
    isErrorExistMentor: res.isError,
    existMentor: res.data,
  };
};

export const useMentorsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [mentorsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Mentor.findMany({
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
    isLoadingMentors: res.isLoading,
    isError: res.isError,
    isErrorMentors: res.isError,
    mentorsData: res.data,
  };
};

export const useMentors = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [mentorsQueryKey, props],
    queryFn: () => api.apis.Mentor.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingMentors: res.isLoading,
    isError: res.isError,
    isErrorMentors: res.isError,
    mentorsData: res.data,
  };
};

export const useMentor = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [mentorQueryKey, props],
    queryFn: () => api.apis.Mentor.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingMentor: res.isLoading,
    isError: res.isError,
    isErrorMentor: res.isError,
    mentorData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Mentor.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateMentors: res.isPending,
    isError: res.isError,
    isErrorCreateMentors: res.isError,
    createMentors: res.mutate,
    createdMentors: res.data,
  };
};

export const useCreateListMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Mentor.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListMentors: res.isPending,
    isError: res.isError,
    isErrorCreateListMentors: res.isError,
    createListMentors: res.mutate,
    createdListMentors: res.data,
  };
};

export const useCreateMentor = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Mentor.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateMentor: res.isPending,
    isError: res.isError,
    isErrorCreateMentor: res.isError,
    createMentor: res.mutate,
    createdMentor: res.data,
  };
};

export const useUpdateMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Mentor.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateMentors: res.isPending,
    isError: res.isError,
    isErrorUpdateMentors: res.isError,
    updateMentors: res.mutate,
    updatedMentors: res.data,
  };
};

export const useUpdateListMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Mentor.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListMentors: res.isPending,
    isError: res.isError,
    isErrorUpdateListMentors: res.isError,
    updateListMentors: res.mutate,
    updatedListMentors: res.data,
  };
};

export const useUpdateMentorsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Mentor.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateMentorsList: res.isPending,
    isError: res.isError,
    isErrorUpdateMentorsList: res.isError,
    updateMentorsList: res.mutate,
    updatedMentorsList: res.data,
  };
};

export const useUpdateMentor = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Mentor.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateMentor: res.isPending,
    isError: res.isError,
    isErrorUpdateMentor: res.isError,
    updateMentor: res.mutate,
    updatedMentor: res.data,
  };
};

export const useDeleteMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Mentor.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteMentors: res.isPending,
    isError: res.isError,
    isErrorDeleteMentors: res.isError,
    deleteMentors: res.mutate,
  };
};

export const useDeleteAllMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Mentor.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllMentors: res.isPending,
    isError: res.isError,
    isErrorDeleteAllMentors: res.isError,
    deleteAllMentors: res.mutate,
  };
};

export const useDeleteMentor = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Mentor.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteMentorFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteMentor: res.isPending,
    isError: res.isError,
    isErrorDeleteMentor: res.isError,
    deleteMentor: res.mutate,
    deleteMentorFromTable,
  };
};
