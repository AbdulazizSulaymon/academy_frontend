import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const pageViewsQueryKey = 'page-views';
export const pageViewQueryKey = 'page-view';
export const pageViewExistQueryKey = 'exist-page-view';
export const pageViewsCountQueryKey = 'count-page-views';

export const pageViewsAggregateQueryKey = 'aggregate-page-views';

export const useAggregatePageViews = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pageViewsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/pageView/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregatePageView: res.isLoading,
    isError: res.isError,
    isErrorAggregatePageView: res.isError,
    aggregatePageViews: res.data,
  };
};

export const useCountPageViews = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pageViewsCountQueryKey, props],
    queryFn: () => api.apis.PageView.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountPageView: res.isLoading,
    isError: res.isError,
    isErrorCountPageView: res.isError,
    countPageViews: res.data,
  };
};

export const useExistPageView = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pageViewExistQueryKey, props],
    queryFn: () => api.apis.PageView.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistPageView: res.isLoading,
    isError: res.isError,
    isErrorExistPageView: res.isError,
    existPageView: res.data,
  };
};

export const usePageViewsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [pageViewsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.PageView.findMany({
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
    isLoadingPageViews: res.isLoading,
    isError: res.isError,
    isErrorPageViews: res.isError,
    pageViewsData: res.data,
  };
};

export const usePageViews = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pageViewsQueryKey, props],
    queryFn: () => api.apis.PageView.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPageViews: res.isLoading,
    isError: res.isError,
    isErrorPageViews: res.isError,
    pageViewsData: res.data,
  };
};

export const usePageView = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pageViewQueryKey, props],
    queryFn: () => api.apis.PageView.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPageView: res.isLoading,
    isError: res.isError,
    isErrorPageView: res.isError,
    pageViewData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.PageView.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePageViews: res.isPending,
    isError: res.isError,
    isErrorCreatePageViews: res.isError,
    createPageViews: res.mutate,
    createdPageViews: res.data,
  };
};

export const useCreateListPageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.PageView.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListPageViews: res.isPending,
    isError: res.isError,
    isErrorCreateListPageViews: res.isError,
    createListPageViews: res.mutate,
    createdListPageViews: res.data,
  };
};

export const useCreatePageView = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.PageView.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePageView: res.isPending,
    isError: res.isError,
    isErrorCreatePageView: res.isError,
    createPageView: res.mutate,
    createdPageView: res.data,
  };
};

export const useUpdatePageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.PageView.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePageViews: res.isPending,
    isError: res.isError,
    isErrorUpdatePageViews: res.isError,
    updatePageViews: res.mutate,
    updatedPageViews: res.data,
  };
};

export const useUpdateListPageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.PageView.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListPageViews: res.isPending,
    isError: res.isError,
    isErrorUpdateListPageViews: res.isError,
    updateListPageViews: res.mutate,
    updatedListPageViews: res.data,
  };
};

export const useUpdatePageViewsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.PageView.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePageViewsList: res.isPending,
    isError: res.isError,
    isErrorUpdatePageViewsList: res.isError,
    updatePageViewsList: res.mutate,
    updatedPageViewsList: res.data,
  };
};

export const useUpdatePageView = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.PageView.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePageView: res.isPending,
    isError: res.isError,
    isErrorUpdatePageView: res.isError,
    updatePageView: res.mutate,
    updatedPageView: res.data,
  };
};

export const useDeletePageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.PageView.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePageViews: res.isPending,
    isError: res.isError,
    isErrorDeletePageViews: res.isError,
    deletePageViews: res.mutate,
  };
};

export const useDeleteAllPageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.PageView.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllPageViews: res.isPending,
    isError: res.isError,
    isErrorDeleteAllPageViews: res.isError,
    deleteAllPageViews: res.mutate,
  };
};

export const useDeletePageView = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.PageView.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deletePageViewFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePageView: res.isPending,
    isError: res.isError,
    isErrorDeletePageView: res.isError,
    deletePageView: res.mutate,
    deletePageViewFromTable,
  };
};
