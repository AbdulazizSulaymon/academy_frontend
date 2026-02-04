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
  const res = useQuery(
    [leadStatusHistoriesAggregateQueryKey, props],
    () => api.instance.post('/api/leadStatusHistory/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateLeadStatusHistory: res.isLoading,
    isErrorAggregateLeadStatusHistory: res.isError,
    aggregateLeadStatusHistories: res.data,
  };
};

export const useCountLeadStatusHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [leadStatusHistoriesCountQueryKey, props],
    () => api.apis.LeadStatusHistory.count({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingCountLeadStatusHistory: res.isLoading,
    isErrorCountLeadStatusHistory: res.isError,
    countLeadStatusHistories: res.data,
  };
};

export const useExistLeadStatusHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [leadStatusHistoryExistQueryKey, props],
    () => api.apis.LeadStatusHistory.exist({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingExistLeadStatusHistory: res.isLoading,
    isErrorExistLeadStatusHistory: res.isError,
    existLeadStatusHistory: res.data,
  };
};

export const useLeadStatusHistoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [leadStatusHistoriesQueryKey, tableFetchProps, props],
    () =>
      api.apis.LeadStatusHistory.findMany({
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
    isLoadingLeadStatusHistories: res.isLoading,
    isErrorLeadStatusHistories: res.isError,
    leadStatusHistoriesData: res.data,
  };
};

export const useLeadStatusHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadStatusHistoriesQueryKey, props], () => api.apis.LeadStatusHistory.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingLeadStatusHistories: res.isLoading,
    isErrorLeadStatusHistories: res.isError,
    leadStatusHistoriesData: res.data,
  };
};

export const useLeadStatusHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [leadStatusHistoryQueryKey, props],
    () => api.apis.LeadStatusHistory.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingLeadStatusHistory: res.isLoading,
    isErrorLeadStatusHistory: res.isError,
    leadStatusHistoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadStatusHistory.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateLeadStatusHistories: res.isLoading,
    isErrorCreateLeadStatusHistories: res.isError,
    createLeadStatusHistories: res.mutate,
    createdLeadStatusHistories: res.data,
  };
};

export const useCreateListLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadStatusHistory.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListLeadStatusHistories: res.isLoading,
    isErrorCreateListLeadStatusHistories: res.isError,
    createListLeadStatusHistories: res.mutate,
    createdListLeadStatusHistories: res.data,
  };
};

export const useCreateLeadStatusHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadStatusHistory.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateLeadStatusHistory: res.isLoading,
    isErrorCreateLeadStatusHistory: res.isError,
    createLeadStatusHistory: res.mutate,
    createdLeadStatusHistory: res.data,
  };
};

export const useUpdateLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadStatusHistory.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadStatusHistories: res.isLoading,
    isErrorUpdateLeadStatusHistories: res.isError,
    updateLeadStatusHistories: res.mutate,
    updatedLeadStatusHistories: res.data,
  };
};

export const useUpdateListLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadStatusHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListLeadStatusHistories: res.isLoading,
    isErrorUpdateListLeadStatusHistories: res.isError,
    updateListLeadStatusHistories: res.mutate,
    updatedListLeadStatusHistories: res.data,
  };
};

export const useUpdateLeadStatusHistoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadStatusHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadStatusHistoriesList: res.isLoading,
    isErrorUpdateLeadStatusHistoriesList: res.isError,
    updateLeadStatusHistoriesList: res.mutate,
    updatedLeadStatusHistoriesList: res.data,
  };
};

export const useUpdateLeadStatusHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadStatusHistory.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadStatusHistory: res.isLoading,
    isErrorUpdateLeadStatusHistory: res.isError,
    updateLeadStatusHistory: res.mutate,
    updatedLeadStatusHistory: res.data,
  };
};

export const useDeleteLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.LeadStatusHistory.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteLeadStatusHistories: res.isLoading,
    isErrorDeleteLeadStatusHistories: res.isError,
    deleteLeadStatusHistories: res.mutate,
  };
};

export const useDeleteAllLeadStatusHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.LeadStatusHistory.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllLeadStatusHistories: res.isLoading,
    isErrorDeleteAllLeadStatusHistories: res.isError,
    deleteAllLeadStatusHistories: res.mutate,
  };
};

export const useDeleteLeadStatusHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.LeadStatusHistory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteLeadStatusHistoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteLeadStatusHistory: res.isLoading,
    isErrorDeleteLeadStatusHistory: res.isError,
    deleteLeadStatusHistory: res.mutate,
    deleteLeadStatusHistoryFromTable,
  };
};
