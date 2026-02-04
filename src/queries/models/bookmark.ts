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
  const res = useQuery(
    [bookmarksAggregateQueryKey, props],
    () => api.instance.post('/api/bookmark/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateBookmark: res.isLoading,
    isErrorAggregateBookmark: res.isError,
    aggregateBookmarks: res.data,
  };
};

export const useCountBookmarks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bookmarksCountQueryKey, props], () => api.apis.Bookmark.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountBookmark: res.isLoading,
    isErrorCountBookmark: res.isError,
    countBookmarks: res.data,
  };
};

export const useExistBookmark = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bookmarkExistQueryKey, props], () => api.apis.Bookmark.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistBookmark: res.isLoading,
    isErrorExistBookmark: res.isError,
    existBookmark: res.data,
  };
};

export const useBookmarksWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [bookmarksQueryKey, tableFetchProps, props],
    () =>
      api.apis.Bookmark.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingBookmarks: res.isLoading, isErrorBookmarks: res.isError, bookmarksData: res.data };
};

export const useBookmarks = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bookmarksQueryKey, props], () => api.apis.Bookmark.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingBookmarks: res.isLoading, isErrorBookmarks: res.isError, bookmarksData: res.data };
};

export const useBookmark = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([bookmarkQueryKey, props], () => api.apis.Bookmark.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingBookmark: res.isLoading,
    isErrorBookmark: res.isError,
    bookmarkData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Bookmark.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateBookmarks: res.isLoading,
    isErrorCreateBookmarks: res.isError,
    createBookmarks: res.mutate,
    createdBookmarks: res.data,
  };
};

export const useCreateListBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Bookmark.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListBookmarks: res.isLoading,
    isErrorCreateListBookmarks: res.isError,
    createListBookmarks: res.mutate,
    createdListBookmarks: res.data,
  };
};

export const useCreateBookmark = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Bookmark.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateBookmark: res.isLoading,
    isErrorCreateBookmark: res.isError,
    createBookmark: res.mutate,
    createdBookmark: res.data,
  };
};

export const useUpdateBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Bookmark.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBookmarks: res.isLoading,
    isErrorUpdateBookmarks: res.isError,
    updateBookmarks: res.mutate,
    updatedBookmarks: res.data,
  };
};

export const useUpdateListBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Bookmark.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListBookmarks: res.isLoading,
    isErrorUpdateListBookmarks: res.isError,
    updateListBookmarks: res.mutate,
    updatedListBookmarks: res.data,
  };
};

export const useUpdateBookmarksList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Bookmark.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBookmarksList: res.isLoading,
    isErrorUpdateBookmarksList: res.isError,
    updateBookmarksList: res.mutate,
    updatedBookmarksList: res.data,
  };
};

export const useUpdateBookmark = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Bookmark.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBookmark: res.isLoading,
    isErrorUpdateBookmark: res.isError,
    updateBookmark: res.mutate,
    updatedBookmark: res.data,
  };
};

export const useDeleteBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Bookmark.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteBookmarks: res.isLoading,
    isErrorDeleteBookmarks: res.isError,
    deleteBookmarks: res.mutate,
  };
};

export const useDeleteAllBookmarks = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Bookmark.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllBookmarks: res.isLoading,
    isErrorDeleteAllBookmarks: res.isError,
    deleteAllBookmarks: res.mutate,
  };
};

export const useDeleteBookmark = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Bookmark.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteBookmarkFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteBookmark: res.isLoading,
    isErrorDeleteBookmark: res.isError,
    deleteBookmark: res.mutate,
    deleteBookmarkFromTable,
  };
};
