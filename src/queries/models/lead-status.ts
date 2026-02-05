import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const leadStatusesQueryKey = 'lead-statuses';
export const leadStatusQueryKey = 'lead-status';
export const leadStatusExistQueryKey = 'exist-lead-status';
export const leadStatusesCountQueryKey = 'count-lead-statuses';

export const leadStatusesAggregateQueryKey = 'aggregate-lead-statuses';

export const useAggregateLeadStatuses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/leadStatus/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoadingAggregateLeadStatus: res.isLoading,
    isErrorAggregateLeadStatus: res.isError,
    aggregateLeadStatuses: res.data,
  };
};

export const useCountLeadStatuses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusesCountQueryKey, props],
    queryFn: () => api.apis.LeadStatus.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingCountLeadStatus: res.isLoading,
    isErrorCountLeadStatus: res.isError,
    countLeadStatuses: res.data,
  };
};

export const useExistLeadStatus = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusExistQueryKey, props],
    queryFn: () => api.apis.LeadStatus.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoadingExistLeadStatus: res.isLoading,
    isErrorExistLeadStatus: res.isError,
    existLeadStatus: res.data,
  };
};

export const useLeadStatusesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [leadStatusesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.LeadStatus.findMany({
        ...tableFetchProps,
        ...props,
      }),
    enabled:
      typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    ...options,
  });

  return { ...res, isLoadingLeadStatuses: res.isLoading, isErrorLeadStatuses: res.isError, leadStatusesData: res.data };
};

export const useLeadStatuses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusesQueryKey, props],
    queryFn: () => api.apis.LeadStatus.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return { ...res, isLoadingLeadStatuses: res.isLoading, isErrorLeadStatuses: res.isError, leadStatusesData: res.data };
};

export const useLeadStatus = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadStatusQueryKey, props],
    queryFn: () => api.apis.LeadStatus.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoadingLeadStatus: res.isLoading,
    isErrorLeadStatus: res.isError,
    leadStatusData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeadStatuses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadStatus.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateLeadStatuses: res.isPending,
    isErrorCreateLeadStatuses: res.isError,
    createLeadStatuses: res.mutate,
    createdLeadStatuses: res.data,
  };
};

export const useCreateListLeadStatuses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadStatus.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateListLeadStatuses: res.isPending,
    isErrorCreateListLeadStatuses: res.isError,
    createListLeadStatuses: res.mutate,
    createdListLeadStatuses: res.data,
  };
};

export const useCreateLeadStatus = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.LeadStatus.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingCreateLeadStatus: res.isPending,
    isErrorCreateLeadStatus: res.isError,
    createLeadStatus: res.mutate,
    createdLeadStatus: res.data,
  };
};

export const useUpdateLeadStatuses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatus.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateLeadStatuses: res.isPending,
    isErrorUpdateLeadStatuses: res.isError,
    updateLeadStatuses: res.mutate,
    updatedLeadStatuses: res.data,
  };
};

export const useUpdateListLeadStatuses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatus.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateListLeadStatuses: res.isPending,
    isErrorUpdateListLeadStatuses: res.isError,
    updateListLeadStatuses: res.mutate,
    updatedListLeadStatuses: res.data,
  };
};

export const useUpdateLeadStatusesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatus.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateLeadStatusesList: res.isPending,
    isErrorUpdateLeadStatusesList: res.isError,
    updateLeadStatusesList: res.mutate,
    updatedLeadStatusesList: res.data,
  };
};

export const useUpdateLeadStatus = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.LeadStatus.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateLeadStatus: res.isPending,
    isErrorUpdateLeadStatus: res.isError,
    updateLeadStatus: res.mutate,
    updatedLeadStatus: res.data,
  };
};

export const useDeleteLeadStatuses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.LeadStatus.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteLeadStatuses: res.isPending,
    isErrorDeleteLeadStatuses: res.isError,
    deleteLeadStatuses: res.mutate,
  };
};

export const useDeleteAllLeadStatuses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.LeadStatus.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteAllLeadStatuses: res.isPending,
    isErrorDeleteAllLeadStatuses: res.isError,
    deleteAllLeadStatuses: res.mutate,
  };
};

export const useDeleteLeadStatus = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.LeadStatus.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteLeadStatusFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteLeadStatus: res.isPending,
    isErrorDeleteLeadStatus: res.isError,
    deleteLeadStatus: res.mutate,
    deleteLeadStatusFromTable,
  };
};
