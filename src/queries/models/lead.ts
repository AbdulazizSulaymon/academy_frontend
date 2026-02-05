import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const leadsQueryKey = 'leads';
export const leadQueryKey = 'lead';
export const leadExistQueryKey = 'exist-lead';
export const leadsCountQueryKey = 'count-leads';

export const leadsAggregateQueryKey = 'aggregate-leads';

export const useAggregateLeads = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/lead/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateLead: res.isLoading,
    isError: res.isError,
    isErrorAggregateLead: res.isError,
    aggregateLeads: res.data,
  };
};

export const useCountLeads = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadsCountQueryKey, props],
    queryFn: () => api.apis.Lead.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountLead: res.isLoading,
    isError: res.isError,
    isErrorCountLead: res.isError,
    countLeads: res.data,
  };
};

export const useExistLead = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadExistQueryKey, props],
    queryFn: () => api.apis.Lead.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistLead: res.isLoading,
    isError: res.isError,
    isErrorExistLead: res.isError,
    existLead: res.data,
  };
};

export const useLeadsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [leadsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Lead.findMany({
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
    isLoadingLeads: res.isLoading,
    isError: res.isError,
    isErrorLeads: res.isError,
    leadsData: res.data,
  };
};

export const useLeads = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadsQueryKey, props],
    queryFn: () => api.apis.Lead.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLeads: res.isLoading,
    isError: res.isError,
    isErrorLeads: res.isError,
    leadsData: res.data,
  };
};

export const useLead = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [leadQueryKey, props],
    queryFn: () => api.apis.Lead.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingLead: res.isLoading,
    isError: res.isError,
    isErrorLead: res.isError,
    leadData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Lead.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLeads: res.isPending,
    isError: res.isError,
    isErrorCreateLeads: res.isError,
    createLeads: res.mutate,
    createdLeads: res.data,
  };
};

export const useCreateListLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Lead.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListLeads: res.isPending,
    isError: res.isError,
    isErrorCreateListLeads: res.isError,
    createListLeads: res.mutate,
    createdListLeads: res.data,
  };
};

export const useCreateLead = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Lead.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateLead: res.isPending,
    isError: res.isError,
    isErrorCreateLead: res.isError,
    createLead: res.mutate,
    createdLead: res.data,
  };
};

export const useUpdateLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Lead.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeads: res.isPending,
    isError: res.isError,
    isErrorUpdateLeads: res.isError,
    updateLeads: res.mutate,
    updatedLeads: res.data,
  };
};

export const useUpdateListLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Lead.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListLeads: res.isPending,
    isError: res.isError,
    isErrorUpdateListLeads: res.isError,
    updateListLeads: res.mutate,
    updatedListLeads: res.data,
  };
};

export const useUpdateLeadsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Lead.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLeadsList: res.isPending,
    isError: res.isError,
    isErrorUpdateLeadsList: res.isError,
    updateLeadsList: res.mutate,
    updatedLeadsList: res.data,
  };
};

export const useUpdateLead = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Lead.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateLead: res.isPending,
    isError: res.isError,
    isErrorUpdateLead: res.isError,
    updateLead: res.mutate,
    updatedLead: res.data,
  };
};

export const useDeleteLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Lead.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLeads: res.isPending,
    isError: res.isError,
    isErrorDeleteLeads: res.isError,
    deleteLeads: res.mutate,
  };
};

export const useDeleteAllLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Lead.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllLeads: res.isPending,
    isError: res.isError,
    isErrorDeleteAllLeads: res.isError,
    deleteAllLeads: res.mutate,
  };
};

export const useDeleteLead = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Lead.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteLeadFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteLead: res.isPending,
    isError: res.isError,
    isErrorDeleteLead: res.isError,
    deleteLead: res.mutate,
    deleteLeadFromTable,
  };
};
