import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const bookmarksQueryKey = 'bookmarks';
export const bookmarkQueryKey = 'bookmark';
export const bookmarkExistQueryKey = 'exist-bookmark';
export const bookmarksCountQueryKey = 'count-bookmarks';

export const bookmarksAggregateQueryKey = 'aggregate-bookmarks';

export const useAggregateBookmarks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [bookmarksAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/bookmark/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateBookmark: res.isLoading,
    isError: res.isError,
    isErrorAggregateBookmark: res.isError,
    aggregateBookmarks: res.data,
  };
};

export const useCountBookmarks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [bookmarksCountQueryKey, props],
    queryFn: () => api.apis.Bookmark.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountBookmark: res.isLoading,
    isError: res.isError,
    isErrorCountBookmark: res.isError,
    countBookmarks: res.data,
  };
};

export const useExistBookmark = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [bookmarkExistQueryKey, props],
    queryFn: () => api.apis.Bookmark.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistBookmark: res.isLoading,
    isError: res.isError,
    isErrorExistBookmark: res.isError,
    existBookmark: res.data,
  };
};

export const useBookmarksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [bookmarksQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Bookmark.findMany({
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
    isLoadingBookmarks: res.isLoading,
    isError: res.isError,
    isErrorBookmarks: res.isError,
    bookmarksData: res.data,
  };
};

export const useBookmarks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [bookmarksQueryKey, props],
    queryFn: () => api.apis.Bookmark.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingBookmarks: res.isLoading,
    isError: res.isError,
    isErrorBookmarks: res.isError,
    bookmarksData: res.data,
  };
};

export const useBookmark = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [bookmarkQueryKey, props],
    queryFn: () => api.apis.Bookmark.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingBookmark: res.isLoading,
    isError: res.isError,
    isErrorBookmark: res.isError,
    bookmarkData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Bookmark.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateBookmarks: res.isPending,
    isError: res.isError,
    isErrorCreateBookmarks: res.isError,
    createBookmarks: res.mutate,
    createdBookmarks: res.data,
  };
};

export const useCreateListBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Bookmark.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListBookmarks: res.isPending,
    isError: res.isError,
    isErrorCreateListBookmarks: res.isError,
    createListBookmarks: res.mutate,
    createdListBookmarks: res.data,
  };
};

export const useCreateBookmark = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Bookmark.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateBookmark: res.isPending,
    isError: res.isError,
    isErrorCreateBookmark: res.isError,
    createBookmark: res.mutate,
    createdBookmark: res.data,
  };
};

export const useUpdateBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Bookmark.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateBookmarks: res.isPending,
    isError: res.isError,
    isErrorUpdateBookmarks: res.isError,
    updateBookmarks: res.mutate,
    updatedBookmarks: res.data,
  };
};

export const useUpdateListBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Bookmark.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListBookmarks: res.isPending,
    isError: res.isError,
    isErrorUpdateListBookmarks: res.isError,
    updateListBookmarks: res.mutate,
    updatedListBookmarks: res.data,
  };
};

export const useUpdateBookmarksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Bookmark.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateBookmarksList: res.isPending,
    isError: res.isError,
    isErrorUpdateBookmarksList: res.isError,
    updateBookmarksList: res.mutate,
    updatedBookmarksList: res.data,
  };
};

export const useUpdateBookmark = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Bookmark.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateBookmark: res.isPending,
    isError: res.isError,
    isErrorUpdateBookmark: res.isError,
    updateBookmark: res.mutate,
    updatedBookmark: res.data,
  };
};

export const useDeleteBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Bookmark.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteBookmarks: res.isPending,
    isError: res.isError,
    isErrorDeleteBookmarks: res.isError,
    deleteBookmarks: res.mutate,
  };
};

export const useDeleteAllBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Bookmark.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllBookmarks: res.isPending,
    isError: res.isError,
    isErrorDeleteAllBookmarks: res.isError,
    deleteAllBookmarks: res.mutate,
  };
};

export const useDeleteBookmark = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Bookmark.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteBookmarkFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteBookmark: res.isPending,
    isError: res.isError,
    isErrorDeleteBookmark: res.isError,
    deleteBookmark: res.mutate,
    deleteBookmarkFromTable,
  };
};
