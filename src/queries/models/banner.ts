import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const bannersQueryKey = 'banners';
export const bannerQueryKey = 'banner';
export const bannerExistQueryKey = 'exist-banner';
export const bannersCountQueryKey = 'count-banners';

export const bannersAggregateQueryKey = 'aggregate-banners';

export const useAggregateBanners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [bannersAggregateQueryKey, props],
    () => api.instance.post('/api/banner/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateBanner: res.isLoading,
    isErrorAggregateBanner: res.isError,
    aggregateBanners: res.data,
  };
};

export const useCountBanners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bannersCountQueryKey, props], () => api.apis.Banner.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountBanner: res.isLoading,
    isErrorCountBanner: res.isError,
    countBanners: res.data,
  };
};

export const useExistBanner = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bannerExistQueryKey, props], () => api.apis.Banner.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistBanner: res.isLoading,
    isErrorExistBanner: res.isError,
    existBanner: res.data,
  };
};

export const useBannersWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [bannersQueryKey, tableFetchProps, props],
    () =>
      api.apis.Banner.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingBanners: res.isLoading, isErrorBanners: res.isError, bannersData: res.data };
};

export const useBanners = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bannersQueryKey, props], () => api.apis.Banner.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingBanners: res.isLoading, isErrorBanners: res.isError, bannersData: res.data };
};

export const useBanner = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bannerQueryKey, props], () => api.apis.Banner.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingBanner: res.isLoading,
    isErrorBanner: res.isError,
    bannerData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateBanners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Banner.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateBanners: res.isLoading,
    isErrorCreateBanners: res.isError,
    createBanners: res.mutate,
    createdBanners: res.data,
  };
};

export const useCreateListBanners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Banner.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListBanners: res.isLoading,
    isErrorCreateListBanners: res.isError,
    createListBanners: res.mutate,
    createdListBanners: res.data,
  };
};

export const useCreateBanner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Banner.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateBanner: res.isLoading,
    isErrorCreateBanner: res.isError,
    createBanner: res.mutate,
    createdBanner: res.data,
  };
};

export const useUpdateBanners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Banner.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBanners: res.isLoading,
    isErrorUpdateBanners: res.isError,
    updateBanners: res.mutate,
    updatedBanners: res.data,
  };
};

export const useUpdateListBanners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Banner.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListBanners: res.isLoading,
    isErrorUpdateListBanners: res.isError,
    updateListBanners: res.mutate,
    updatedListBanners: res.data,
  };
};

export const useUpdateBannersList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Banner.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBannersList: res.isLoading,
    isErrorUpdateBannersList: res.isError,
    updateBannersList: res.mutate,
    updatedBannersList: res.data,
  };
};

export const useUpdateBanner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Banner.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBanner: res.isLoading,
    isErrorUpdateBanner: res.isError,
    updateBanner: res.mutate,
    updatedBanner: res.data,
  };
};

export const useDeleteBanners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Banner.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteBanners: res.isLoading,
    isErrorDeleteBanners: res.isError,
    deleteBanners: res.mutate,
  };
};

export const useDeleteAllBanners = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Banner.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllBanners: res.isLoading,
    isErrorDeleteAllBanners: res.isError,
    deleteAllBanners: res.mutate,
  };
};

export const useDeleteBanner = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Banner.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteBannerFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteBanner: res.isLoading,
    isErrorDeleteBanner: res.isError,
    deleteBanner: res.mutate,
    deleteBannerFromTable,
  };
};
