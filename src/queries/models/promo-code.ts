import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const promoCodesQueryKey = 'promo-codes';
export const promoCodeQueryKey = 'promo-code';
export const promoCodeExistQueryKey = 'exist-promo-code';
export const promoCodesCountQueryKey = 'count-promo-codes';

export const promoCodesAggregateQueryKey = 'aggregate-promo-codes';

export const useAggregatePromoCodes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [promoCodesAggregateQueryKey, props],
    () => api.instance.post('/api/promoCode/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregatePromoCode: res.isLoading,
    isErrorAggregatePromoCode: res.isError,
    aggregatePromoCodes: res.data,
  };
};

export const useCountPromoCodes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([promoCodesCountQueryKey, props], () => api.apis.PromoCode.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountPromoCode: res.isLoading,
    isErrorCountPromoCode: res.isError,
    countPromoCodes: res.data,
  };
};

export const useExistPromoCode = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([promoCodeExistQueryKey, props], () => api.apis.PromoCode.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistPromoCode: res.isLoading,
    isErrorExistPromoCode: res.isError,
    existPromoCode: res.data,
  };
};

export const usePromoCodesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [promoCodesQueryKey, tableFetchProps, props],
    () =>
      api.apis.PromoCode.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingPromoCodes: res.isLoading, isErrorPromoCodes: res.isError, promoCodesData: res.data };
};

export const usePromoCodes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([promoCodesQueryKey, props], () => api.apis.PromoCode.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingPromoCodes: res.isLoading, isErrorPromoCodes: res.isError, promoCodesData: res.data };
};

export const usePromoCode = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([promoCodeQueryKey, props], () => api.apis.PromoCode.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingPromoCode: res.isLoading,
    isErrorPromoCode: res.isError,
    promoCodeData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePromoCodes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.PromoCode.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreatePromoCodes: res.isLoading,
    isErrorCreatePromoCodes: res.isError,
    createPromoCodes: res.mutate,
    createdPromoCodes: res.data,
  };
};

export const useCreateListPromoCodes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.PromoCode.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListPromoCodes: res.isLoading,
    isErrorCreateListPromoCodes: res.isError,
    createListPromoCodes: res.mutate,
    createdListPromoCodes: res.data,
  };
};

export const useCreatePromoCode = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.PromoCode.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreatePromoCode: res.isLoading,
    isErrorCreatePromoCode: res.isError,
    createPromoCode: res.mutate,
    createdPromoCode: res.data,
  };
};

export const useUpdatePromoCodes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PromoCode.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePromoCodes: res.isLoading,
    isErrorUpdatePromoCodes: res.isError,
    updatePromoCodes: res.mutate,
    updatedPromoCodes: res.data,
  };
};

export const useUpdateListPromoCodes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PromoCode.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListPromoCodes: res.isLoading,
    isErrorUpdateListPromoCodes: res.isError,
    updateListPromoCodes: res.mutate,
    updatedListPromoCodes: res.data,
  };
};

export const useUpdatePromoCodesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PromoCode.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePromoCodesList: res.isLoading,
    isErrorUpdatePromoCodesList: res.isError,
    updatePromoCodesList: res.mutate,
    updatedPromoCodesList: res.data,
  };
};

export const useUpdatePromoCode = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PromoCode.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePromoCode: res.isLoading,
    isErrorUpdatePromoCode: res.isError,
    updatePromoCode: res.mutate,
    updatedPromoCode: res.data,
  };
};

export const useDeletePromoCodes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.PromoCode.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeletePromoCodes: res.isLoading,
    isErrorDeletePromoCodes: res.isError,
    deletePromoCodes: res.mutate,
  };
};

export const useDeleteAllPromoCodes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.PromoCode.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllPromoCodes: res.isLoading,
    isErrorDeleteAllPromoCodes: res.isError,
    deleteAllPromoCodes: res.mutate,
  };
};

export const useDeletePromoCode = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.PromoCode.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deletePromoCodeFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeletePromoCode: res.isLoading,
    isErrorDeletePromoCode: res.isError,
    deletePromoCode: res.mutate,
    deletePromoCodeFromTable,
  };
};
