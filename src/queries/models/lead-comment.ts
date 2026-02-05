import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const leadCommentsQueryKey = 'lead-comments';
export const leadCommentQueryKey = 'lead-comment';
export const leadCommentExistQueryKey = 'exist-lead-comment';
export const leadCommentsCountQueryKey = 'count-lead-comments';

export const leadCommentsAggregateQueryKey = 'aggregate-lead-comments';

export const useAggregateLeadComments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadCommentsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/leadComment/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateLeadComment: res.isLoading,
    isError: res.isError,
    isErrorAggregateLeadComment: res.isError,
    aggregateLeadComments: res.data,
  };
};

export const useCountLeadComments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadCommentsCountQueryKey, props],
    queryFn: () => api.apis.LeadComment.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountLeadComment: res.isLoading,
    isError: res.isError,
    isErrorCountLeadComment: res.isError,
    countLeadComments: res.data,
  };
};

export const useExistLeadComment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadCommentExistQueryKey, props],
    queryFn: () => api.apis.LeadComment.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistLeadComment: res.isLoading,
    isError: res.isError,
    isErrorExistLeadComment: res.isError,
    existLeadComment: res.data,
  };
};

export const useLeadCommentsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [leadCommentsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.LeadComment.findMany({
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
    isLoadingLeadComments: res.isLoading,
    isError: res.isError,
    isErrorLeadComments: res.isError,
    leadCommentsData: res.data,
  };
};

export const useLeadComments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadCommentsQueryKey, props],
    queryFn: () => api.apis.LeadComment.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLeadComments: res.isLoading,
    isError: res.isError,
    isErrorLeadComments: res.isError,
    leadCommentsData: res.data,
  };
};

export const useLeadComment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadCommentQueryKey, props],
    queryFn: () => api.apis.LeadComment.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLeadComment: res.isLoading,
    isError: res.isError,
    isErrorLeadComment: res.isError,
    leadCommentData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadComment.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLeadComments: res.isPending,
    isError: res.isError,
    isErrorCreateLeadComments: res.isError,
    createLeadComments: res.mutate,
    createdLeadComments: res.data,
  };
};

export const useCreateListLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadComment.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListLeadComments: res.isPending,
    isError: res.isError,
    isErrorCreateListLeadComments: res.isError,
    createListLeadComments: res.mutate,
    createdListLeadComments: res.data,
  };
};

export const useCreateLeadComment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadComment.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLeadComment: res.isPending,
    isError: res.isError,
    isErrorCreateLeadComment: res.isError,
    createLeadComment: res.mutate,
    createdLeadComment: res.data,
  };
};

export const useUpdateLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadComment.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadComments: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadComments: res.isError,
    updateLeadComments: res.mutate,
    updatedLeadComments: res.data,
  };
};

export const useUpdateListLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadComment.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListLeadComments: res.isPending,
    isError: res.isError,
    isErrorUpdateListLeadComments: res.isError,
    updateListLeadComments: res.mutate,
    updatedListLeadComments: res.data,
  };
};

export const useUpdateLeadCommentsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadComment.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadCommentsList: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadCommentsList: res.isError,
    updateLeadCommentsList: res.mutate,
    updatedLeadCommentsList: res.data,
  };
};

export const useUpdateLeadComment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadComment.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadComment: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadComment: res.isError,
    updateLeadComment: res.mutate,
    updatedLeadComment: res.data,
  };
};

export const useDeleteLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.LeadComment.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLeadComments: res.isPending,
    isError: res.isError,
    isErrorDeleteLeadComments: res.isError,
    deleteLeadComments: res.mutate,
  };
};

export const useDeleteAllLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.LeadComment.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllLeadComments: res.isPending,
    isError: res.isError,
    isErrorDeleteAllLeadComments: res.isError,
    deleteAllLeadComments: res.mutate,
  };
};

export const useDeleteLeadComment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.LeadComment.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteLeadCommentFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLeadComment: res.isPending,
    isError: res.isError,
    isErrorDeleteLeadComment: res.isError,
    deleteLeadComment: res.mutate,
    deleteLeadCommentFromTable,
  };
};
