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
  const res = useQuery(
    [mentorsAggregateQueryKey, props],
    () => api.instance.post('/api/mentor/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateMentor: res.isLoading,
    isErrorAggregateMentor: res.isError,
    aggregateMentors: res.data,
  };
};

export const useCountMentors = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([mentorsCountQueryKey, props], () => api.apis.Mentor.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountMentor: res.isLoading,
    isErrorCountMentor: res.isError,
    countMentors: res.data,
  };
};

export const useExistMentor = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([mentorExistQueryKey, props], () => api.apis.Mentor.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistMentor: res.isLoading,
    isErrorExistMentor: res.isError,
    existMentor: res.data,
  };
};

export const useMentorsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [mentorsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Mentor.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingMentors: res.isLoading, isErrorMentors: res.isError, mentorsData: res.data };
};

export const useMentors = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([mentorsQueryKey, props], () => api.apis.Mentor.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingMentors: res.isLoading, isErrorMentors: res.isError, mentorsData: res.data };
};

export const useMentor = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([mentorQueryKey, props], () => api.apis.Mentor.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingMentor: res.isLoading,
    isErrorMentor: res.isError,
    mentorData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Mentor.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateMentors: res.isLoading,
    isErrorCreateMentors: res.isError,
    createMentors: res.mutate,
    createdMentors: res.data,
  };
};

export const useCreateListMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Mentor.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListMentors: res.isLoading,
    isErrorCreateListMentors: res.isError,
    createListMentors: res.mutate,
    createdListMentors: res.data,
  };
};

export const useCreateMentor = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Mentor.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateMentor: res.isLoading,
    isErrorCreateMentor: res.isError,
    createMentor: res.mutate,
    createdMentor: res.data,
  };
};

export const useUpdateMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Mentor.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateMentors: res.isLoading,
    isErrorUpdateMentors: res.isError,
    updateMentors: res.mutate,
    updatedMentors: res.data,
  };
};

export const useUpdateListMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Mentor.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListMentors: res.isLoading,
    isErrorUpdateListMentors: res.isError,
    updateListMentors: res.mutate,
    updatedListMentors: res.data,
  };
};

export const useUpdateMentorsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Mentor.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateMentorsList: res.isLoading,
    isErrorUpdateMentorsList: res.isError,
    updateMentorsList: res.mutate,
    updatedMentorsList: res.data,
  };
};

export const useUpdateMentor = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Mentor.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateMentor: res.isLoading,
    isErrorUpdateMentor: res.isError,
    updateMentor: res.mutate,
    updatedMentor: res.data,
  };
};

export const useDeleteMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Mentor.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteMentors: res.isLoading,
    isErrorDeleteMentors: res.isError,
    deleteMentors: res.mutate,
  };
};

export const useDeleteAllMentors = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Mentor.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllMentors: res.isLoading,
    isErrorDeleteAllMentors: res.isError,
    deleteAllMentors: res.mutate,
  };
};

export const useDeleteMentor = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Mentor.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteMentorFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteMentor: res.isLoading,
    isErrorDeleteMentor: res.isError,
    deleteMentor: res.mutate,
    deleteMentorFromTable,
  };
};
