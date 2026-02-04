import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const pagesQueryKey = 'pages';
export const pageQueryKey = 'page';
export const pageExistQueryKey = 'exist-page';
export const pagesCountQueryKey = 'count-pages';

export const pagesAggregateQueryKey = 'aggregate-pages';

export const useAggregatePages = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pagesAggregateQueryKey, props], () => api.instance.post('/api/page/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregatePages: res.isLoading,
    isErrorAggregatePages: res.isError,
    aggregatePages: res.data,
  };
};

export const useCountPages = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pagesCountQueryKey, props], () => api.apis.Pages.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountPages: res.isLoading,
    isErrorCountPages: res.isError,
    countPages: res.data,
  };
};

export const useExistPage = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pageExistQueryKey, props], () => api.apis.Pages.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistPages: res.isLoading,
    isErrorExistPages: res.isError,
    existPage: res.data,
  };
};

export const usePagesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [pagesQueryKey, tableFetchProps, props],
    () =>
      api.apis.Pages.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingPages: res.isLoading, isErrorPages: res.isError, pagesData: res.data };
};

export const usePages = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pagesQueryKey, props], () => api.apis.Pages.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingPages: res.isLoading, isErrorPages: res.isError, pagesData: res.data };
};

export const usePage = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([pageQueryKey, props], () => api.apis.Pages.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingPage: res.isLoading,
    isErrorPage: res.isError,
    pageData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Pages.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreatePages: res.isLoading,
    isErrorCreatePages: res.isError,
    createPages: res.mutate,
    createdPages: res.data,
  };
};

export const useCreateListPages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Pages.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListPages: res.isLoading,
    isErrorCreateListPages: res.isError,
    createListPages: res.mutate,
    createdListPages: res.data,
  };
};

export const useCreatePage = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Pages.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreatePage: res.isLoading,
    isErrorCreatePage: res.isError,
    createPage: res.mutate,
    createdPage: res.data,
  };
};

export const useUpdatePages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Pages.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePages: res.isLoading,
    isErrorUpdatePages: res.isError,
    updatePages: res.mutate,
    updatedPages: res.data,
  };
};

export const useUpdateListPages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Pages.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListPages: res.isLoading,
    isErrorUpdateListPages: res.isError,
    updateListPages: res.mutate,
    updatedListPages: res.data,
  };
};

export const useUpdatePagesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Pages.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePagesList: res.isLoading,
    isErrorUpdatePagesList: res.isError,
    updatePagesList: res.mutate,
    updatedPagesList: res.data,
  };
};

export const useUpdatePage = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Pages.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePage: res.isLoading,
    isErrorUpdatePage: res.isError,
    updatePage: res.mutate,
    updatedPage: res.data,
  };
};

export const useDeletePages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Pages.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeletePages: res.isLoading,
    isErrorDeletePages: res.isError,
    deletePages: res.mutate,
  };
};

export const useDeleteAllPages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Pages.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllPages: res.isLoading,
    isErrorDeleteAllPages: res.isError,
    deleteAllPages: res.mutate,
  };
};

export const useDeletePage = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Pages.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deletePageFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeletePage: res.isLoading,
    isErrorDeletePage: res.isError,
    deletePage: res.mutate,
    deletePageFromTable,
  };
};
