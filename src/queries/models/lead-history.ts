import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const leadHistoriesQueryKey = 'lead-histories';
export const leadHistoryQueryKey = 'lead-history';
export const leadHistoryExistQueryKey = 'exist-lead-history';
export const leadHistoriesCountQueryKey = 'count-lead-histories';

export const leadHistoriesAggregateQueryKey = 'aggregate-lead-histories';

export const useAggregateLeadHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadHistoriesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/leadHistory/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateLeadHistory: res.isLoading,
    isError: res.isError,
    isErrorAggregateLeadHistory: res.isError,
    aggregateLeadHistories: res.data,
  };
};

export const useCountLeadHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadHistoriesCountQueryKey, props],
    queryFn: () => api.apis.LeadHistory.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountLeadHistory: res.isLoading,
    isError: res.isError,
    isErrorCountLeadHistory: res.isError,
    countLeadHistories: res.data,
  };
};

export const useExistLeadHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadHistoryExistQueryKey, props],
    queryFn: () => api.apis.LeadHistory.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistLeadHistory: res.isLoading,
    isError: res.isError,
    isErrorExistLeadHistory: res.isError,
    existLeadHistory: res.data,
  };
};

export const useLeadHistoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [leadHistoriesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.LeadHistory.findMany({
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
    isLoadingLeadHistories: res.isLoading,
    isError: res.isError,
    isErrorLeadHistories: res.isError,
    leadHistoriesData: res.data,
  };
};

export const useLeadHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadHistoriesQueryKey, props],
    queryFn: () => api.apis.LeadHistory.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLeadHistories: res.isLoading,
    isError: res.isError,
    isErrorLeadHistories: res.isError,
    leadHistoriesData: res.data,
  };
};

export const useLeadHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadHistoryQueryKey, props],
    queryFn: () => api.apis.LeadHistory.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLeadHistory: res.isLoading,
    isError: res.isError,
    isErrorLeadHistory: res.isError,
    leadHistoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadHistory.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLeadHistories: res.isPending,
    isError: res.isError,
    isErrorCreateLeadHistories: res.isError,
    createLeadHistories: res.mutate,
    createdLeadHistories: res.data,
  };
};

export const useCreateListLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadHistory.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListLeadHistories: res.isPending,
    isError: res.isError,
    isErrorCreateListLeadHistories: res.isError,
    createListLeadHistories: res.mutate,
    createdListLeadHistories: res.data,
  };
};

export const useCreateLeadHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadHistory.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLeadHistory: res.isPending,
    isError: res.isError,
    isErrorCreateLeadHistory: res.isError,
    createLeadHistory: res.mutate,
    createdLeadHistory: res.data,
  };
};

export const useUpdateLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadHistory.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadHistories: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadHistories: res.isError,
    updateLeadHistories: res.mutate,
    updatedLeadHistories: res.data,
  };
};

export const useUpdateListLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadHistory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListLeadHistories: res.isPending,
    isError: res.isError,
    isErrorUpdateListLeadHistories: res.isError,
    updateListLeadHistories: res.mutate,
    updatedListLeadHistories: res.data,
  };
};

export const useUpdateLeadHistoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadHistory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadHistoriesList: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadHistoriesList: res.isError,
    updateLeadHistoriesList: res.mutate,
    updatedLeadHistoriesList: res.data,
  };
};

export const useUpdateLeadHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadHistory.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadHistory: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadHistory: res.isError,
    updateLeadHistory: res.mutate,
    updatedLeadHistory: res.data,
  };
};

export const useDeleteLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.LeadHistory.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLeadHistories: res.isPending,
    isError: res.isError,
    isErrorDeleteLeadHistories: res.isError,
    deleteLeadHistories: res.mutate,
  };
};

export const useDeleteAllLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.LeadHistory.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllLeadHistories: res.isPending,
    isError: res.isError,
    isErrorDeleteAllLeadHistories: res.isError,
    deleteAllLeadHistories: res.mutate,
  };
};

export const useDeleteLeadHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.LeadHistory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteLeadHistoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLeadHistory: res.isPending,
    isError: res.isError,
    isErrorDeleteLeadHistory: res.isError,
    deleteLeadHistory: res.mutate,
    deleteLeadHistoryFromTable,
  };
};
