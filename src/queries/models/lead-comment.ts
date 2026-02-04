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
  const res = useQuery(
    [leadCommentsAggregateQueryKey, props],
    () => api.instance.post('/api/leadComment/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateLeadComment: res.isLoading,
    isErrorAggregateLeadComment: res.isError,
    aggregateLeadComments: res.data,
  };
};

export const useCountLeadComments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadCommentsCountQueryKey, props], () => api.apis.LeadComment.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountLeadComment: res.isLoading,
    isErrorCountLeadComment: res.isError,
    countLeadComments: res.data,
  };
};

export const useExistLeadComment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadCommentExistQueryKey, props], () => api.apis.LeadComment.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistLeadComment: res.isLoading,
    isErrorExistLeadComment: res.isError,
    existLeadComment: res.data,
  };
};

export const useLeadCommentsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [leadCommentsQueryKey, tableFetchProps, props],
    () =>
      api.apis.LeadComment.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingLeadComments: res.isLoading, isErrorLeadComments: res.isError, leadCommentsData: res.data };
};

export const useLeadComments = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadCommentsQueryKey, props], () => api.apis.LeadComment.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingLeadComments: res.isLoading, isErrorLeadComments: res.isError, leadCommentsData: res.data };
};

export const useLeadComment = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadCommentQueryKey, props], () => api.apis.LeadComment.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingLeadComment: res.isLoading,
    isErrorLeadComment: res.isError,
    leadCommentData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadComment.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateLeadComments: res.isLoading,
    isErrorCreateLeadComments: res.isError,
    createLeadComments: res.mutate,
    createdLeadComments: res.data,
  };
};

export const useCreateListLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadComment.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListLeadComments: res.isLoading,
    isErrorCreateListLeadComments: res.isError,
    createListLeadComments: res.mutate,
    createdListLeadComments: res.data,
  };
};

export const useCreateLeadComment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadComment.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateLeadComment: res.isLoading,
    isErrorCreateLeadComment: res.isError,
    createLeadComment: res.mutate,
    createdLeadComment: res.data,
  };
};

export const useUpdateLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadComment.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadComments: res.isLoading,
    isErrorUpdateLeadComments: res.isError,
    updateLeadComments: res.mutate,
    updatedLeadComments: res.data,
  };
};

export const useUpdateListLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadComment.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListLeadComments: res.isLoading,
    isErrorUpdateListLeadComments: res.isError,
    updateListLeadComments: res.mutate,
    updatedListLeadComments: res.data,
  };
};

export const useUpdateLeadCommentsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadComment.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadCommentsList: res.isLoading,
    isErrorUpdateLeadCommentsList: res.isError,
    updateLeadCommentsList: res.mutate,
    updatedLeadCommentsList: res.data,
  };
};

export const useUpdateLeadComment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadComment.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadComment: res.isLoading,
    isErrorUpdateLeadComment: res.isError,
    updateLeadComment: res.mutate,
    updatedLeadComment: res.data,
  };
};

export const useDeleteLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.LeadComment.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteLeadComments: res.isLoading,
    isErrorDeleteLeadComments: res.isError,
    deleteLeadComments: res.mutate,
  };
};

export const useDeleteAllLeadComments = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.LeadComment.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllLeadComments: res.isLoading,
    isErrorDeleteAllLeadComments: res.isError,
    deleteAllLeadComments: res.mutate,
  };
};

export const useDeleteLeadComment = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.LeadComment.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteLeadCommentFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteLeadComment: res.isLoading,
    isErrorDeleteLeadComment: res.isError,
    deleteLeadComment: res.mutate,
    deleteLeadCommentFromTable,
  };
};
