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
  const res = useQuery([leadsAggregateQueryKey, props], () => api.instance.post('/api/lead/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregateLead: res.isLoading,
    isErrorAggregateLead: res.isError,
    aggregateLeads: res.data,
  };
};

export const useCountLeads = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadsCountQueryKey, props], () => api.apis.Lead.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountLead: res.isLoading,
    isErrorCountLead: res.isError,
    countLeads: res.data,
  };
};

export const useExistLead = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadExistQueryKey, props], () => api.apis.Lead.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistLead: res.isLoading,
    isErrorExistLead: res.isError,
    existLead: res.data,
  };
};

export const useLeadsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [leadsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Lead.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingLeads: res.isLoading, isErrorLeads: res.isError, leadsData: res.data };
};

export const useLeads = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadsQueryKey, props], () => api.apis.Lead.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingLeads: res.isLoading, isErrorLeads: res.isError, leadsData: res.data };
};

export const useLead = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([leadQueryKey, props], () => api.apis.Lead.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingLead: res.isLoading,
    isErrorLead: res.isError,
    leadData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Lead.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateLeads: res.isLoading,
    isErrorCreateLeads: res.isError,
    createLeads: res.mutate,
    createdLeads: res.data,
  };
};

export const useCreateListLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Lead.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListLeads: res.isLoading,
    isErrorCreateListLeads: res.isError,
    createListLeads: res.mutate,
    createdListLeads: res.data,
  };
};

export const useCreateLead = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Lead.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateLead: res.isLoading,
    isErrorCreateLead: res.isError,
    createLead: res.mutate,
    createdLead: res.data,
  };
};

export const useUpdateLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lead.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeads: res.isLoading,
    isErrorUpdateLeads: res.isError,
    updateLeads: res.mutate,
    updatedLeads: res.data,
  };
};

export const useUpdateListLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lead.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListLeads: res.isLoading,
    isErrorUpdateListLeads: res.isError,
    updateListLeads: res.mutate,
    updatedListLeads: res.data,
  };
};

export const useUpdateLeadsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lead.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLeadsList: res.isLoading,
    isErrorUpdateLeadsList: res.isError,
    updateLeadsList: res.mutate,
    updatedLeadsList: res.data,
  };
};

export const useUpdateLead = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Lead.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateLead: res.isLoading,
    isErrorUpdateLead: res.isError,
    updateLead: res.mutate,
    updatedLead: res.data,
  };
};

export const useDeleteLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Lead.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteLeads: res.isLoading,
    isErrorDeleteLeads: res.isError,
    deleteLeads: res.mutate,
  };
};

export const useDeleteAllLeads = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Lead.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllLeads: res.isLoading,
    isErrorDeleteAllLeads: res.isError,
    deleteAllLeads: res.mutate,
  };
};

export const useDeleteLead = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Lead.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteLeadFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteLead: res.isLoading,
    isErrorDeleteLead: res.isError,
    deleteLead: res.mutate,
    deleteLeadFromTable,
  };
};
