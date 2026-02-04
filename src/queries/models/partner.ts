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
  const res = useQuery(
    [partnersAggregateQueryKey, props],
    () => api.instance.post('/api/partner/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregatePartner: res.isLoading,
    isErrorAggregatePartner: res.isError,
    aggregatePartners: res.data,
  };
};

export const useCountPartners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([partnersCountQueryKey, props], () => api.apis.Partner.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountPartner: res.isLoading,
    isErrorCountPartner: res.isError,
    countPartners: res.data,
  };
};

export const useExistPartner = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([partnerExistQueryKey, props], () => api.apis.Partner.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistPartner: res.isLoading,
    isErrorExistPartner: res.isError,
    existPartner: res.data,
  };
};

export const usePartnersWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [partnersQueryKey, tableFetchProps, props],
    () =>
      api.apis.Partner.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingPartners: res.isLoading, isErrorPartners: res.isError, partnersData: res.data };
};

export const usePartners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([partnersQueryKey, props], () => api.apis.Partner.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingPartners: res.isLoading, isErrorPartners: res.isError, partnersData: res.data };
};

export const usePartner = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([partnerQueryKey, props], () => api.apis.Partner.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingPartner: res.isLoading,
    isErrorPartner: res.isError,
    partnerData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Partner.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreatePartners: res.isLoading,
    isErrorCreatePartners: res.isError,
    createPartners: res.mutate,
    createdPartners: res.data,
  };
};

export const useCreateListPartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Partner.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListPartners: res.isLoading,
    isErrorCreateListPartners: res.isError,
    createListPartners: res.mutate,
    createdListPartners: res.data,
  };
};

export const useCreatePartner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Partner.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreatePartner: res.isLoading,
    isErrorCreatePartner: res.isError,
    createPartner: res.mutate,
    createdPartner: res.data,
  };
};

export const useUpdatePartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Partner.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePartners: res.isLoading,
    isErrorUpdatePartners: res.isError,
    updatePartners: res.mutate,
    updatedPartners: res.data,
  };
};

export const useUpdateListPartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Partner.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListPartners: res.isLoading,
    isErrorUpdateListPartners: res.isError,
    updateListPartners: res.mutate,
    updatedListPartners: res.data,
  };
};

export const useUpdatePartnersList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Partner.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePartnersList: res.isLoading,
    isErrorUpdatePartnersList: res.isError,
    updatePartnersList: res.mutate,
    updatedPartnersList: res.data,
  };
};

export const useUpdatePartner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Partner.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePartner: res.isLoading,
    isErrorUpdatePartner: res.isError,
    updatePartner: res.mutate,
    updatedPartner: res.data,
  };
};

export const useDeletePartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Partner.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeletePartners: res.isLoading,
    isErrorDeletePartners: res.isError,
    deletePartners: res.mutate,
  };
};

export const useDeleteAllPartners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Partner.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllPartners: res.isLoading,
    isErrorDeleteAllPartners: res.isError,
    deleteAllPartners: res.mutate,
  };
};

export const useDeletePartner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Partner.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deletePartnerFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeletePartner: res.isLoading,
    isErrorDeletePartner: res.isError,
    deletePartner: res.mutate,
    deletePartnerFromTable,
  };
};
