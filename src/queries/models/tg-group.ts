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
  const res = useQuery(
    [tgGroupsAggregateQueryKey, props],
    () => api.instance.post('/api/tgGroup/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateTgGroup: res.isLoading,
    isErrorAggregateTgGroup: res.isError,
    aggregateTgGroups: res.data,
  };
};

export const useCountTgGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([tgGroupsCountQueryKey, props], () => api.apis.TgGroup.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountTgGroup: res.isLoading,
    isErrorCountTgGroup: res.isError,
    countTgGroups: res.data,
  };
};

export const useExistTgGroup = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([tgGroupExistQueryKey, props], () => api.apis.TgGroup.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistTgGroup: res.isLoading,
    isErrorExistTgGroup: res.isError,
    existTgGroup: res.data,
  };
};

export const useTgGroupsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [tgGroupsQueryKey, tableFetchProps, props],
    () =>
      api.apis.TgGroup.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingTgGroups: res.isLoading, isErrorTgGroups: res.isError, tgGroupsData: res.data };
};

export const useTgGroups = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([tgGroupsQueryKey, props], () => api.apis.TgGroup.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingTgGroups: res.isLoading, isErrorTgGroups: res.isError, tgGroupsData: res.data };
};

export const useTgGroup = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([tgGroupQueryKey, props], () => api.apis.TgGroup.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingTgGroup: res.isLoading,
    isErrorTgGroup: res.isError,
    tgGroupData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.TgGroup.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateTgGroups: res.isLoading,
    isErrorCreateTgGroups: res.isError,
    createTgGroups: res.mutate,
    createdTgGroups: res.data,
  };
};

export const useCreateListTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.TgGroup.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListTgGroups: res.isLoading,
    isErrorCreateListTgGroups: res.isError,
    createListTgGroups: res.mutate,
    createdListTgGroups: res.data,
  };
};

export const useCreateTgGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.TgGroup.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateTgGroup: res.isLoading,
    isErrorCreateTgGroup: res.isError,
    createTgGroup: res.mutate,
    createdTgGroup: res.data,
  };
};

export const useUpdateTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TgGroup.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateTgGroups: res.isLoading,
    isErrorUpdateTgGroups: res.isError,
    updateTgGroups: res.mutate,
    updatedTgGroups: res.data,
  };
};

export const useUpdateListTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TgGroup.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListTgGroups: res.isLoading,
    isErrorUpdateListTgGroups: res.isError,
    updateListTgGroups: res.mutate,
    updatedListTgGroups: res.data,
  };
};

export const useUpdateTgGroupsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TgGroup.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateTgGroupsList: res.isLoading,
    isErrorUpdateTgGroupsList: res.isError,
    updateTgGroupsList: res.mutate,
    updatedTgGroupsList: res.data,
  };
};

export const useUpdateTgGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.TgGroup.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateTgGroup: res.isLoading,
    isErrorUpdateTgGroup: res.isError,
    updateTgGroup: res.mutate,
    updatedTgGroup: res.data,
  };
};

export const useDeleteTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.TgGroup.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteTgGroups: res.isLoading,
    isErrorDeleteTgGroups: res.isError,
    deleteTgGroups: res.mutate,
  };
};

export const useDeleteAllTgGroups = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.TgGroup.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllTgGroups: res.isLoading,
    isErrorDeleteAllTgGroups: res.isError,
    deleteAllTgGroups: res.mutate,
  };
};

export const useDeleteTgGroup = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.TgGroup.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteTgGroupFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteTgGroup: res.isLoading,
    isErrorDeleteTgGroup: res.isError,
    deleteTgGroup: res.mutate,
    deleteTgGroupFromTable,
  };
};
