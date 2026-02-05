import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const leadStatusHistoriesQueryKey = 'lead-status-histories';
export const leadStatusHistoryQueryKey = 'lead-status-history';
export const leadStatusHistoryExistQueryKey = 'exist-lead-status-history';
export const leadStatusHistoriesCountQueryKey = 'count-lead-status-histories';

export const leadStatusHistoriesAggregateQueryKey = 'aggregate-lead-status-histories';

export const useAggregateLeadStatusHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusHistoriesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/leadStatusHistory/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateLeadStatusHistory: res.isLoading,
    isError: res.isError,
    isErrorAggregateLeadStatusHistory: res.isError,
    aggregateLeadStatusHistories: res.data,
  };
};

export const useCountLeadStatusHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusHistoriesCountQueryKey, props],
    queryFn: () => api.apis.LeadStatusHistory.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountLeadStatusHistory: res.isLoading,
    isError: res.isError,
    isErrorCountLeadStatusHistory: res.isError,
    countLeadStatusHistories: res.data,
  };
};

export const useExistLeadStatusHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusHistoryExistQueryKey, props],
    queryFn: () => api.apis.LeadStatusHistory.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistLeadStatusHistory: res.isLoading,
    isError: res.isError,
    isErrorExistLeadStatusHistory: res.isError,
    existLeadStatusHistory: res.data,
  };
};

export const useLeadStatusHistoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [leadStatusHistoriesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.LeadStatusHistory.findMany({
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
    isLoadingLeadStatusHistories: res.isLoading,
    isError: res.isError,
    isErrorLeadStatusHistories: res.isError,
    leadStatusHistoriesData: res.data,
  };
};

export const useLeadStatusHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusHistoriesQueryKey, props],
    queryFn: () => api.apis.LeadStatusHistory.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLeadStatusHistories: res.isLoading,
    isError: res.isError,
    isErrorLeadStatusHistories: res.isError,
    leadStatusHistoriesData: res.data,
  };
};

export const useLeadStatusHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusHistoryQueryKey, props],
    queryFn: () => api.apis.LeadStatusHistory.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLeadStatusHistory: res.isLoading,
    isError: res.isError,
    isErrorLeadStatusHistory: res.isError,
    leadStatusHistoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadStatusHistory.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLeadStatusHistories: res.isPending,
    isError: res.isError,
    isErrorCreateLeadStatusHistories: res.isError,
    createLeadStatusHistories: res.mutate,
    createdLeadStatusHistories: res.data,
  };
};

export const useCreateListLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadStatusHistory.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListLeadStatusHistories: res.isPending,
    isError: res.isError,
    isErrorCreateListLeadStatusHistories: res.isError,
    createListLeadStatusHistories: res.mutate,
    createdListLeadStatusHistories: res.data,
  };
};

export const useCreateLeadStatusHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadStatusHistory.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLeadStatusHistory: res.isPending,
    isError: res.isError,
    isErrorCreateLeadStatusHistory: res.isError,
    createLeadStatusHistory: res.mutate,
    createdLeadStatusHistory: res.data,
  };
};

export const useUpdateLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatusHistory.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadStatusHistories: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadStatusHistories: res.isError,
    updateLeadStatusHistories: res.mutate,
    updatedLeadStatusHistories: res.data,
  };
};

export const useUpdateListLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatusHistory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListLeadStatusHistories: res.isPending,
    isError: res.isError,
    isErrorUpdateListLeadStatusHistories: res.isError,
    updateListLeadStatusHistories: res.mutate,
    updatedListLeadStatusHistories: res.data,
  };
};

export const useUpdateLeadStatusHistoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatusHistory.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadStatusHistoriesList: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadStatusHistoriesList: res.isError,
    updateLeadStatusHistoriesList: res.mutate,
    updatedLeadStatusHistoriesList: res.data,
  };
};

export const useUpdateLeadStatusHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatusHistory.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadStatusHistory: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadStatusHistory: res.isError,
    updateLeadStatusHistory: res.mutate,
    updatedLeadStatusHistory: res.data,
  };
};

export const useDeleteLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.LeadStatusHistory.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLeadStatusHistories: res.isPending,
    isError: res.isError,
    isErrorDeleteLeadStatusHistories: res.isError,
    deleteLeadStatusHistories: res.mutate,
  };
};

export const useDeleteAllLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.LeadStatusHistory.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllLeadStatusHistories: res.isPending,
    isError: res.isError,
    isErrorDeleteAllLeadStatusHistories: res.isError,
    deleteAllLeadStatusHistories: res.mutate,
  };
};

export const useDeleteLeadStatusHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.LeadStatusHistory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteLeadStatusHistoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLeadStatusHistory: res.isPending,
    isError: res.isError,
    isErrorDeleteLeadStatusHistory: res.isError,
    deleteLeadStatusHistory: res.mutate,
    deleteLeadStatusHistoryFromTable,
  };
};
