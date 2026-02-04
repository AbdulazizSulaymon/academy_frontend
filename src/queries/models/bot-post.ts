import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const botPostsQueryKey = 'bot-posts';
export const botPostQueryKey = 'bot-post';
export const botPostExistQueryKey = 'exist-bot-post';
export const botPostsCountQueryKey = 'count-bot-posts';

export const botPostsAggregateQueryKey = 'aggregate-bot-posts';

export const useAggregateBotPosts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [botPostsAggregateQueryKey, props],
    () => api.instance.post('/api/botPost/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateBotPost: res.isLoading,
    isErrorAggregateBotPost: res.isError,
    aggregateBotPosts: res.data,
  };
};

export const useCountBotPosts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botPostsCountQueryKey, props], () => api.apis.BotPost.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountBotPost: res.isLoading,
    isErrorCountBotPost: res.isError,
    countBotPosts: res.data,
  };
};

export const useExistBotPost = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botPostExistQueryKey, props], () => api.apis.BotPost.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistBotPost: res.isLoading,
    isErrorExistBotPost: res.isError,
    existBotPost: res.data,
  };
};

export const useBotPostsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [botPostsQueryKey, tableFetchProps, props],
    () =>
      api.apis.BotPost.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingBotPosts: res.isLoading, isErrorBotPosts: res.isError, botPostsData: res.data };
};

export const useBotPosts = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botPostsQueryKey, props], () => api.apis.BotPost.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingBotPosts: res.isLoading, isErrorBotPosts: res.isError, botPostsData: res.data };
};

export const useBotPost = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botPostQueryKey, props], () => api.apis.BotPost.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingBotPost: res.isLoading,
    isErrorBotPost: res.isError,
    botPostData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateBotPosts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.BotPost.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateBotPosts: res.isLoading,
    isErrorCreateBotPosts: res.isError,
    createBotPosts: res.mutate,
    createdBotPosts: res.data,
  };
};

export const useCreateListBotPosts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.BotPost.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListBotPosts: res.isLoading,
    isErrorCreateListBotPosts: res.isError,
    createListBotPosts: res.mutate,
    createdListBotPosts: res.data,
  };
};

export const useCreateBotPost = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.BotPost.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateBotPost: res.isLoading,
    isErrorCreateBotPost: res.isError,
    createBotPost: res.mutate,
    createdBotPost: res.data,
  };
};

export const useUpdateBotPosts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotPost.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBotPosts: res.isLoading,
    isErrorUpdateBotPosts: res.isError,
    updateBotPosts: res.mutate,
    updatedBotPosts: res.data,
  };
};

export const useUpdateListBotPosts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotPost.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListBotPosts: res.isLoading,
    isErrorUpdateListBotPosts: res.isError,
    updateListBotPosts: res.mutate,
    updatedListBotPosts: res.data,
  };
};

export const useUpdateBotPostsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotPost.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBotPostsList: res.isLoading,
    isErrorUpdateBotPostsList: res.isError,
    updateBotPostsList: res.mutate,
    updatedBotPostsList: res.data,
  };
};

export const useUpdateBotPost = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotPost.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBotPost: res.isLoading,
    isErrorUpdateBotPost: res.isError,
    updateBotPost: res.mutate,
    updatedBotPost: res.data,
  };
};

export const useDeleteBotPosts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.BotPost.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteBotPosts: res.isLoading,
    isErrorDeleteBotPosts: res.isError,
    deleteBotPosts: res.mutate,
  };
};

export const useDeleteAllBotPosts = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.BotPost.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllBotPosts: res.isLoading,
    isErrorDeleteAllBotPosts: res.isError,
    deleteAllBotPosts: res.mutate,
  };
};

export const useDeleteBotPost = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.BotPost.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteBotPostFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteBotPost: res.isLoading,
    isErrorDeleteBotPost: res.isError,
    deleteBotPost: res.mutate,
    deleteBotPostFromTable,
  };
};
