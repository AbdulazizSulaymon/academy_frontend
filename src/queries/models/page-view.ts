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
  const res = useQuery(
    [pageViewsAggregateQueryKey, props],
    () => api.instance.post('/api/pageView/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregatePageView: res.isLoading,
    isErrorAggregatePageView: res.isError,
    aggregatePageViews: res.data,
  };
};

export const useCountPageViews = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pageViewsCountQueryKey, props], () => api.apis.PageView.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountPageView: res.isLoading,
    isErrorCountPageView: res.isError,
    countPageViews: res.data,
  };
};

export const useExistPageView = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pageViewExistQueryKey, props], () => api.apis.PageView.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistPageView: res.isLoading,
    isErrorExistPageView: res.isError,
    existPageView: res.data,
  };
};

export const usePageViewsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [pageViewsQueryKey, tableFetchProps, props],
    () =>
      api.apis.PageView.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingPageViews: res.isLoading, isErrorPageViews: res.isError, pageViewsData: res.data };
};

export const usePageViews = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pageViewsQueryKey, props], () => api.apis.PageView.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingPageViews: res.isLoading, isErrorPageViews: res.isError, pageViewsData: res.data };
};

export const usePageView = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pageViewQueryKey, props], () => api.apis.PageView.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingPageView: res.isLoading,
    isErrorPageView: res.isError,
    pageViewData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.PageView.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreatePageViews: res.isLoading,
    isErrorCreatePageViews: res.isError,
    createPageViews: res.mutate,
    createdPageViews: res.data,
  };
};

export const useCreateListPageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.PageView.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListPageViews: res.isLoading,
    isErrorCreateListPageViews: res.isError,
    createListPageViews: res.mutate,
    createdListPageViews: res.data,
  };
};

export const useCreatePageView = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.PageView.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreatePageView: res.isLoading,
    isErrorCreatePageView: res.isError,
    createPageView: res.mutate,
    createdPageView: res.data,
  };
};

export const useUpdatePageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PageView.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePageViews: res.isLoading,
    isErrorUpdatePageViews: res.isError,
    updatePageViews: res.mutate,
    updatedPageViews: res.data,
  };
};

export const useUpdateListPageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PageView.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListPageViews: res.isLoading,
    isErrorUpdateListPageViews: res.isError,
    updateListPageViews: res.mutate,
    updatedListPageViews: res.data,
  };
};

export const useUpdatePageViewsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PageView.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePageViewsList: res.isLoading,
    isErrorUpdatePageViewsList: res.isError,
    updatePageViewsList: res.mutate,
    updatedPageViewsList: res.data,
  };
};

export const useUpdatePageView = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.PageView.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePageView: res.isLoading,
    isErrorUpdatePageView: res.isError,
    updatePageView: res.mutate,
    updatedPageView: res.data,
  };
};

export const useDeletePageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.PageView.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeletePageViews: res.isLoading,
    isErrorDeletePageViews: res.isError,
    deletePageViews: res.mutate,
  };
};

export const useDeleteAllPageViews = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.PageView.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllPageViews: res.isLoading,
    isErrorDeleteAllPageViews: res.isError,
    deleteAllPageViews: res.mutate,
  };
};

export const useDeletePageView = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.PageView.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deletePageViewFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeletePageView: res.isLoading,
    isErrorDeletePageView: res.isError,
    deletePageView: res.mutate,
    deletePageViewFromTable,
  };
};
