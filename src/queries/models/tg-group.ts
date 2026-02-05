import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const tgGroupsQueryKey = 'tg-groups';
export const tgGroupQueryKey = 'tg-group';
export const tgGroupExistQueryKey = 'exist-tg-group';
export const tgGroupsCountQueryKey = 'count-tg-groups';

export const tgGroupsAggregateQueryKey = 'aggregate-tg-groups';

export const useAggregateTgGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tgGroupsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/tgGroup/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateTgGroup: res.isLoading,
    isError: res.isError,
    isErrorAggregateTgGroup: res.isError,
    aggregateTgGroups: res.data,
  };
};

export const useCountTgGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tgGroupsCountQueryKey, props],
    queryFn: () => api.apis.TgGroup.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountTgGroup: res.isLoading,
    isError: res.isError,
    isErrorCountTgGroup: res.isError,
    countTgGroups: res.data,
  };
};

export const useExistTgGroup = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tgGroupExistQueryKey, props],
    queryFn: () => api.apis.TgGroup.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistTgGroup: res.isLoading,
    isError: res.isError,
    isErrorExistTgGroup: res.isError,
    existTgGroup: res.data,
  };
};

export const useTgGroupsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [tgGroupsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.TgGroup.findMany({
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
    isLoadingTgGroups: res.isLoading,
    isError: res.isError,
    isErrorTgGroups: res.isError,
    tgGroupsData: res.data,
  };
};

export const useTgGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tgGroupsQueryKey, props],
    queryFn: () => api.apis.TgGroup.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingTgGroups: res.isLoading,
    isError: res.isError,
    isErrorTgGroups: res.isError,
    tgGroupsData: res.data,
  };
};

export const useTgGroup = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [tgGroupQueryKey, props],
    queryFn: () => api.apis.TgGroup.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingTgGroup: res.isLoading,
    isError: res.isError,
    isErrorTgGroup: res.isError,
    tgGroupData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.TgGroup.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateTgGroups: res.isPending,
    isError: res.isError,
    isErrorCreateTgGroups: res.isError,
    createTgGroups: res.mutate,
    createdTgGroups: res.data,
  };
};

export const useCreateListTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.TgGroup.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListTgGroups: res.isPending,
    isError: res.isError,
    isErrorCreateListTgGroups: res.isError,
    createListTgGroups: res.mutate,
    createdListTgGroups: res.data,
  };
};

export const useCreateTgGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.TgGroup.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateTgGroup: res.isPending,
    isError: res.isError,
    isErrorCreateTgGroup: res.isError,
    createTgGroup: res.mutate,
    createdTgGroup: res.data,
  };
};

export const useUpdateTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.TgGroup.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTgGroups: res.isPending,
    isError: res.isError,
    isErrorUpdateTgGroups: res.isError,
    updateTgGroups: res.mutate,
    updatedTgGroups: res.data,
  };
};

export const useUpdateListTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.TgGroup.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListTgGroups: res.isPending,
    isError: res.isError,
    isErrorUpdateListTgGroups: res.isError,
    updateListTgGroups: res.mutate,
    updatedListTgGroups: res.data,
  };
};

export const useUpdateTgGroupsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.TgGroup.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTgGroupsList: res.isPending,
    isError: res.isError,
    isErrorUpdateTgGroupsList: res.isError,
    updateTgGroupsList: res.mutate,
    updatedTgGroupsList: res.data,
  };
};

export const useUpdateTgGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.TgGroup.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateTgGroup: res.isPending,
    isError: res.isError,
    isErrorUpdateTgGroup: res.isError,
    updateTgGroup: res.mutate,
    updatedTgGroup: res.data,
  };
};

export const useDeleteTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.TgGroup.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteTgGroups: res.isPending,
    isError: res.isError,
    isErrorDeleteTgGroups: res.isError,
    deleteTgGroups: res.mutate,
  };
};

export const useDeleteAllTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.TgGroup.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllTgGroups: res.isPending,
    isError: res.isError,
    isErrorDeleteAllTgGroups: res.isError,
    deleteAllTgGroups: res.mutate,
  };
};

export const useDeleteTgGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.TgGroup.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteTgGroupFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteTgGroup: res.isPending,
    isError: res.isError,
    isErrorDeleteTgGroup: res.isError,
    deleteTgGroup: res.mutate,
    deleteTgGroupFromTable,
  };
};
