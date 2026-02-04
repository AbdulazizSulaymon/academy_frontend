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
  const res = useQuery(
    [leadHistoriesAggregateQueryKey, props],
    () => api.instance.post('/api/leadHistory/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateLeadHistory: res.isLoading,
    isErrorAggregateLeadHistory: res.isError,
    aggregateLeadHistories: res.data,
  };
};

export const useCountLeadHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadHistoriesCountQueryKey, props], () => api.apis.LeadHistory.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountLeadHistory: res.isLoading,
    isErrorCountLeadHistory: res.isError,
    countLeadHistories: res.data,
  };
};

export const useExistLeadHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadHistoryExistQueryKey, props], () => api.apis.LeadHistory.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistLeadHistory: res.isLoading,
    isErrorExistLeadHistory: res.isError,
    existLeadHistory: res.data,
  };
};

export const useLeadHistoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [leadHistoriesQueryKey, tableFetchProps, props],
    () =>
      api.apis.LeadHistory.findMany({
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
    isLoadingLeadHistories: res.isLoading,
    isErrorLeadHistories: res.isError,
    leadHistoriesData: res.data,
  };
};

export const useLeadHistories = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadHistoriesQueryKey, props], () => api.apis.LeadHistory.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingLeadHistories: res.isLoading,
    isErrorLeadHistories: res.isError,
    leadHistoriesData: res.data,
  };
};

export const useLeadHistory = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadHistoryQueryKey, props], () => api.apis.LeadHistory.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingLeadHistory: res.isLoading,
    isErrorLeadHistory: res.isError,
    leadHistoryData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadHistory.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateLeadHistories: res.isLoading,
    isErrorCreateLeadHistories: res.isError,
    createLeadHistories: res.mutate,
    createdLeadHistories: res.data,
  };
};

export const useCreateListLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadHistory.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListLeadHistories: res.isLoading,
    isErrorCreateListLeadHistories: res.isError,
    createListLeadHistories: res.mutate,
    createdListLeadHistories: res.data,
  };
};

export const useCreateLeadHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.LeadHistory.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateLeadHistory: res.isLoading,
    isErrorCreateLeadHistory: res.isError,
    createLeadHistory: res.mutate,
    createdLeadHistory: res.data,
  };
};

export const useUpdateLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadHistory.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadHistories: res.isLoading,
    isErrorUpdateLeadHistories: res.isError,
    updateLeadHistories: res.mutate,
    updatedLeadHistories: res.data,
  };
};

export const useUpdateListLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListLeadHistories: res.isLoading,
    isErrorUpdateListLeadHistories: res.isError,
    updateListLeadHistories: res.mutate,
    updatedListLeadHistories: res.data,
  };
};

export const useUpdateLeadHistoriesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadHistory.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadHistoriesList: res.isLoading,
    isErrorUpdateLeadHistoriesList: res.isError,
    updateLeadHistoriesList: res.mutate,
    updatedLeadHistoriesList: res.data,
  };
};

export const useUpdateLeadHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.LeadHistory.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadHistory: res.isLoading,
    isErrorUpdateLeadHistory: res.isError,
    updateLeadHistory: res.mutate,
    updatedLeadHistory: res.data,
  };
};

export const useDeleteLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.LeadHistory.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteLeadHistories: res.isLoading,
    isErrorDeleteLeadHistories: res.isError,
    deleteLeadHistories: res.mutate,
  };
};

export const useDeleteAllLeadHistories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.LeadHistory.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllLeadHistories: res.isLoading,
    isErrorDeleteAllLeadHistories: res.isError,
    deleteAllLeadHistories: res.mutate,
  };
};

export const useDeleteLeadHistory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.LeadHistory.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteLeadHistoryFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteLeadHistory: res.isLoading,
    isErrorDeleteLeadHistory: res.isError,
    deleteLeadHistory: res.mutate,
    deleteLeadHistoryFromTable,
  };
};
