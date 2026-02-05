import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const partnersQueryKey = 'partners';
export const partnerQueryKey = 'partner';
export const partnerExistQueryKey = 'exist-partner';
export const partnersCountQueryKey = 'count-partners';

export const partnersAggregateQueryKey = 'aggregate-partners';

export const useAggregatePartners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [partnersAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/partner/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregatePartner: res.isLoading,
    isError: res.isError,
    isErrorAggregatePartner: res.isError,
    aggregatePartners: res.data,
  };
};

export const useCountPartners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [partnersCountQueryKey, props],
    queryFn: () => api.apis.Partner.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountPartner: res.isLoading,
    isError: res.isError,
    isErrorCountPartner: res.isError,
    countPartners: res.data,
  };
};

export const useExistPartner = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [partnerExistQueryKey, props],
    queryFn: () => api.apis.Partner.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistPartner: res.isLoading,
    isError: res.isError,
    isErrorExistPartner: res.isError,
    existPartner: res.data,
  };
};

export const usePartnersWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [partnersQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Partner.findMany({
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
    isLoadingPartners: res.isLoading,
    isError: res.isError,
    isErrorPartners: res.isError,
    partnersData: res.data,
  };
};

export const usePartners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [partnersQueryKey, props],
    queryFn: () => api.apis.Partner.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPartners: res.isLoading,
    isError: res.isError,
    isErrorPartners: res.isError,
    partnersData: res.data,
  };
};

export const usePartner = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [partnerQueryKey, props],
    queryFn: () => api.apis.Partner.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPartner: res.isLoading,
    isError: res.isError,
    isErrorPartner: res.isError,
    partnerData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Partner.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePartners: res.isPending,
    isError: res.isError,
    isErrorCreatePartners: res.isError,
    createPartners: res.mutate,
    createdPartners: res.data,
  };
};

export const useCreateListPartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Partner.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListPartners: res.isPending,
    isError: res.isError,
    isErrorCreateListPartners: res.isError,
    createListPartners: res.mutate,
    createdListPartners: res.data,
  };
};

export const useCreatePartner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Partner.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePartner: res.isPending,
    isError: res.isError,
    isErrorCreatePartner: res.isError,
    createPartner: res.mutate,
    createdPartner: res.data,
  };
};

export const useUpdatePartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Partner.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePartners: res.isPending,
    isError: res.isError,
    isErrorUpdatePartners: res.isError,
    updatePartners: res.mutate,
    updatedPartners: res.data,
  };
};

export const useUpdateListPartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Partner.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListPartners: res.isPending,
    isError: res.isError,
    isErrorUpdateListPartners: res.isError,
    updateListPartners: res.mutate,
    updatedListPartners: res.data,
  };
};

export const useUpdatePartnersList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Partner.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePartnersList: res.isPending,
    isError: res.isError,
    isErrorUpdatePartnersList: res.isError,
    updatePartnersList: res.mutate,
    updatedPartnersList: res.data,
  };
};

export const useUpdatePartner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Partner.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePartner: res.isPending,
    isError: res.isError,
    isErrorUpdatePartner: res.isError,
    updatePartner: res.mutate,
    updatedPartner: res.data,
  };
};

export const useDeletePartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Partner.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePartners: res.isPending,
    isError: res.isError,
    isErrorDeletePartners: res.isError,
    deletePartners: res.mutate,
  };
};

export const useDeleteAllPartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Partner.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllPartners: res.isPending,
    isError: res.isError,
    isErrorDeleteAllPartners: res.isError,
    deleteAllPartners: res.mutate,
  };
};

export const useDeletePartner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Partner.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deletePartnerFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePartner: res.isPending,
    isError: res.isError,
    isErrorDeletePartner: res.isError,
    deletePartner: res.mutate,
    deletePartnerFromTable,
  };
};
