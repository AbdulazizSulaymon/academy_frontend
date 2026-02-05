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
  const res = useQuery({
    queryKey: [pagesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/page/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregatePages: res.isLoading,
    isError: res.isError,
    isErrorAggregatePages: res.isError,
    aggregatePages: res.data,
  };
};

export const useCountPages = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pagesCountQueryKey, props],
    queryFn: () => api.apis.Pages.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountPages: res.isLoading,
    isError: res.isError,
    isErrorCountPages: res.isError,
    countPages: res.data,
  };
};

export const useExistPage = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pageExistQueryKey, props],
    queryFn: () => api.apis.Pages.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistPages: res.isLoading,
    isError: res.isError,
    isErrorExistPages: res.isError,
    existPage: res.data,
  };
};

export const usePagesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [pagesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Pages.findMany({
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
    isLoadingPages: res.isLoading,
    isError: res.isError,
    isErrorPages: res.isError,
    pagesData: res.data,
  };
};

export const usePages = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pagesQueryKey, props],
    queryFn: () => api.apis.Pages.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPages: res.isLoading,
    isError: res.isError,
    isErrorPages: res.isError,
    pagesData: res.data,
  };
};

export const usePage = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [pageQueryKey, props],
    queryFn: () => api.apis.Pages.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingPage: res.isLoading,
    isError: res.isError,
    isErrorPage: res.isError,
    pageData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Pages.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePages: res.isPending,
    isError: res.isError,
    isErrorCreatePages: res.isError,
    createPages: res.mutate,
    createdPages: res.data,
  };
};

export const useCreateListPages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Pages.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListPages: res.isPending,
    isError: res.isError,
    isErrorCreateListPages: res.isError,
    createListPages: res.mutate,
    createdListPages: res.data,
  };
};

export const useCreatePage = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Pages.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreatePage: res.isPending,
    isError: res.isError,
    isErrorCreatePage: res.isError,
    createPage: res.mutate,
    createdPage: res.data,
  };
};

export const useUpdatePages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Pages.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePages: res.isPending,
    isError: res.isError,
    isErrorUpdatePages: res.isError,
    updatePages: res.mutate,
    updatedPages: res.data,
  };
};

export const useUpdateListPages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Pages.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListPages: res.isPending,
    isError: res.isError,
    isErrorUpdateListPages: res.isError,
    updateListPages: res.mutate,
    updatedListPages: res.data,
  };
};

export const useUpdatePagesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Pages.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePagesList: res.isPending,
    isError: res.isError,
    isErrorUpdatePagesList: res.isError,
    updatePagesList: res.mutate,
    updatedPagesList: res.data,
  };
};

export const useUpdatePage = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Pages.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdatePage: res.isPending,
    isError: res.isError,
    isErrorUpdatePage: res.isError,
    updatePage: res.mutate,
    updatedPage: res.data,
  };
};

export const useDeletePages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Pages.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePages: res.isPending,
    isError: res.isError,
    isErrorDeletePages: res.isError,
    deletePages: res.mutate,
  };
};

export const useDeleteAllPages = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Pages.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllPages: res.isPending,
    isError: res.isError,
    isErrorDeleteAllPages: res.isError,
    deleteAllPages: res.mutate,
  };
};

export const useDeletePage = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Pages.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deletePageFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeletePage: res.isPending,
    isError: res.isError,
    isErrorDeletePage: res.isError,
    deletePage: res.mutate,
    deletePageFromTable,
  };
};
