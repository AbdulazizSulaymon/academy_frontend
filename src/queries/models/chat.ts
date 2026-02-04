import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const chatsQueryKey = 'chats';
export const chatQueryKey = 'chat';
export const chatExistQueryKey = 'exist-chat';
export const chatsCountQueryKey = 'count-chats';

export const chatsAggregateQueryKey = 'aggregate-chats';

export const useAggregateChats = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([chatsAggregateQueryKey, props], () => api.instance.post('/api/chat/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregateChat: res.isLoading,
    isErrorAggregateChat: res.isError,
    aggregateChats: res.data,
  };
};

export const useCountChats = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([chatsCountQueryKey, props], () => api.apis.Chat.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountChat: res.isLoading,
    isErrorCountChat: res.isError,
    countChats: res.data,
  };
};

export const useExistChat = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([chatExistQueryKey, props], () => api.apis.Chat.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistChat: res.isLoading,
    isErrorExistChat: res.isError,
    existChat: res.data,
  };
};

export const useChatsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [chatsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Chat.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingChats: res.isLoading, isErrorChats: res.isError, chatsData: res.data };
};

export const useChats = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([chatsQueryKey, props], () => api.apis.Chat.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingChats: res.isLoading, isErrorChats: res.isError, chatsData: res.data };
};

export const useChat = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([chatQueryKey, props], () => api.apis.Chat.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingChat: res.isLoading,
    isErrorChat: res.isError,
    chatData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Chat.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateChats: res.isLoading,
    isErrorCreateChats: res.isError,
    createChats: res.mutate,
    createdChats: res.data,
  };
};

export const useCreateListChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Chat.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListChats: res.isLoading,
    isErrorCreateListChats: res.isError,
    createListChats: res.mutate,
    createdListChats: res.data,
  };
};

export const useCreateChat = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Chat.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateChat: res.isLoading,
    isErrorCreateChat: res.isError,
    createChat: res.mutate,
    createdChat: res.data,
  };
};

export const useUpdateChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Chat.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateChats: res.isLoading,
    isErrorUpdateChats: res.isError,
    updateChats: res.mutate,
    updatedChats: res.data,
  };
};

export const useUpdateListChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Chat.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListChats: res.isLoading,
    isErrorUpdateListChats: res.isError,
    updateListChats: res.mutate,
    updatedListChats: res.data,
  };
};

export const useUpdateChatsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Chat.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateChatsList: res.isLoading,
    isErrorUpdateChatsList: res.isError,
    updateChatsList: res.mutate,
    updatedChatsList: res.data,
  };
};

export const useUpdateChat = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Chat.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateChat: res.isLoading,
    isErrorUpdateChat: res.isError,
    updateChat: res.mutate,
    updatedChat: res.data,
  };
};

export const useDeleteChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Chat.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteChats: res.isLoading,
    isErrorDeleteChats: res.isError,
    deleteChats: res.mutate,
  };
};

export const useDeleteAllChats = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Chat.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllChats: res.isLoading,
    isErrorDeleteAllChats: res.isError,
    deleteAllChats: res.mutate,
  };
};

export const useDeleteChat = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Chat.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteChatFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteChat: res.isLoading,
    isErrorDeleteChat: res.isError,
    deleteChat: res.mutate,
    deleteChatFromTable,
  };
};
