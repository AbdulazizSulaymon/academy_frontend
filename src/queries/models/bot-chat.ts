import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const botChatsQueryKey = 'bot-chats';
export const botChatQueryKey = 'bot-chat';
export const botChatExistQueryKey = 'exist-bot-chat';
export const botChatsCountQueryKey = 'count-bot-chats';

export const botChatsAggregateQueryKey = 'aggregate-bot-chats';

export const useAggregateBotChats = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [botChatsAggregateQueryKey, props],
    () => api.instance.post('/api/botChat/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateBotChat: res.isLoading,
    isErrorAggregateBotChat: res.isError,
    aggregateBotChats: res.data,
  };
};

export const useCountBotChats = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botChatsCountQueryKey, props], () => api.apis.BotChat.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountBotChat: res.isLoading,
    isErrorCountBotChat: res.isError,
    countBotChats: res.data,
  };
};

export const useExistBotChat = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botChatExistQueryKey, props], () => api.apis.BotChat.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistBotChat: res.isLoading,
    isErrorExistBotChat: res.isError,
    existBotChat: res.data,
  };
};

export const useBotChatsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [botChatsQueryKey, tableFetchProps, props],
    () =>
      api.apis.BotChat.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingBotChats: res.isLoading, isErrorBotChats: res.isError, botChatsData: res.data };
};

export const useBotChats = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botChatsQueryKey, props], () => api.apis.BotChat.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingBotChats: res.isLoading, isErrorBotChats: res.isError, botChatsData: res.data };
};

export const useBotChat = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([botChatQueryKey, props], () => api.apis.BotChat.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingBotChat: res.isLoading,
    isErrorBotChat: res.isError,
    botChatData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateBotChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.BotChat.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateBotChats: res.isLoading,
    isErrorCreateBotChats: res.isError,
    createBotChats: res.mutate,
    createdBotChats: res.data,
  };
};

export const useCreateListBotChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.BotChat.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListBotChats: res.isLoading,
    isErrorCreateListBotChats: res.isError,
    createListBotChats: res.mutate,
    createdListBotChats: res.data,
  };
};

export const useCreateBotChat = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.BotChat.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateBotChat: res.isLoading,
    isErrorCreateBotChat: res.isError,
    createBotChat: res.mutate,
    createdBotChat: res.data,
  };
};

export const useUpdateBotChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotChat.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBotChats: res.isLoading,
    isErrorUpdateBotChats: res.isError,
    updateBotChats: res.mutate,
    updatedBotChats: res.data,
  };
};

export const useUpdateListBotChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotChat.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListBotChats: res.isLoading,
    isErrorUpdateListBotChats: res.isError,
    updateListBotChats: res.mutate,
    updatedListBotChats: res.data,
  };
};

export const useUpdateBotChatsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotChat.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBotChatsList: res.isLoading,
    isErrorUpdateBotChatsList: res.isError,
    updateBotChatsList: res.mutate,
    updatedBotChatsList: res.data,
  };
};

export const useUpdateBotChat = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.BotChat.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateBotChat: res.isLoading,
    isErrorUpdateBotChat: res.isError,
    updateBotChat: res.mutate,
    updatedBotChat: res.data,
  };
};

export const useDeleteBotChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.BotChat.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteBotChats: res.isLoading,
    isErrorDeleteBotChats: res.isError,
    deleteBotChats: res.mutate,
  };
};

export const useDeleteAllBotChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.BotChat.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllBotChats: res.isLoading,
    isErrorDeleteAllBotChats: res.isError,
    deleteAllBotChats: res.mutate,
  };
};

export const useDeleteBotChat = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.BotChat.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteBotChatFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteBotChat: res.isLoading,
    isErrorDeleteBotChat: res.isError,
    deleteBotChat: res.mutate,
    deleteBotChatFromTable,
  };
};
