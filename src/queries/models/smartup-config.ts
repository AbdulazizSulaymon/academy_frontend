import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const smartupConfigsQueryKey = 'smartup-configs';
export const smartupConfigQueryKey = 'smartup-config';
export const smartupConfigExistQueryKey = 'exist-smartup-config';
export const smartupConfigsCountQueryKey = 'count-smartup-configs';

export const smartupConfigsAggregateQueryKey = 'aggregate-smartup-configs';

export const useAggregateSmartupConfigs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [smartupConfigsAggregateQueryKey, props],
    () => api.instance.post('/api/smartupConfig/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateSmartupConfig: res.isLoading,
    isErrorAggregateSmartupConfig: res.isError,
    aggregateSmartupConfigs: res.data,
  };
};

export const useCountSmartupConfigs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([smartupConfigsCountQueryKey, props], () => api.apis.SmartupConfig.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountSmartupConfig: res.isLoading,
    isErrorCountSmartupConfig: res.isError,
    countSmartupConfigs: res.data,
  };
};

export const useExistSmartupConfig = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([smartupConfigExistQueryKey, props], () => api.apis.SmartupConfig.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistSmartupConfig: res.isLoading,
    isErrorExistSmartupConfig: res.isError,
    existSmartupConfig: res.data,
  };
};

export const useSmartupConfigsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [smartupConfigsQueryKey, tableFetchProps, props],
    () =>
      api.apis.SmartupConfig.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return {
    ...res,
    isLoadingSmartupConfigs: res.isLoading,
    isErrorSmartupConfigs: res.isError,
    smartupConfigsData: res.data,
  };
};

export const useSmartupConfigs = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([smartupConfigsQueryKey, props], () => api.apis.SmartupConfig.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingSmartupConfigs: res.isLoading,
    isErrorSmartupConfigs: res.isError,
    smartupConfigsData: res.data,
  };
};

export const useSmartupConfig = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [smartupConfigQueryKey, props],
    () => api.apis.SmartupConfig.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingSmartupConfig: res.isLoading,
    isErrorSmartupConfig: res.isError,
    smartupConfigData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateSmartupConfigs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SmartupConfig.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateSmartupConfigs: res.isLoading,
    isErrorCreateSmartupConfigs: res.isError,
    createSmartupConfigs: res.mutate,
    createdSmartupConfigs: res.data,
  };
};

export const useCreateListSmartupConfigs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SmartupConfig.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListSmartupConfigs: res.isLoading,
    isErrorCreateListSmartupConfigs: res.isError,
    createListSmartupConfigs: res.mutate,
    createdListSmartupConfigs: res.data,
  };
};

export const useCreateSmartupConfig = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SmartupConfig.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateSmartupConfig: res.isLoading,
    isErrorCreateSmartupConfig: res.isError,
    createSmartupConfig: res.mutate,
    createdSmartupConfig: res.data,
  };
};

export const useUpdateSmartupConfigs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SmartupConfig.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSmartupConfigs: res.isLoading,
    isErrorUpdateSmartupConfigs: res.isError,
    updateSmartupConfigs: res.mutate,
    updatedSmartupConfigs: res.data,
  };
};

export const useUpdateListSmartupConfigs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SmartupConfig.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListSmartupConfigs: res.isLoading,
    isErrorUpdateListSmartupConfigs: res.isError,
    updateListSmartupConfigs: res.mutate,
    updatedListSmartupConfigs: res.data,
  };
};

export const useUpdateSmartupConfigsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SmartupConfig.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSmartupConfigsList: res.isLoading,
    isErrorUpdateSmartupConfigsList: res.isError,
    updateSmartupConfigsList: res.mutate,
    updatedSmartupConfigsList: res.data,
  };
};

export const useUpdateSmartupConfig = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SmartupConfig.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSmartupConfig: res.isLoading,
    isErrorUpdateSmartupConfig: res.isError,
    updateSmartupConfig: res.mutate,
    updatedSmartupConfig: res.data,
  };
};

export const useDeleteSmartupConfigs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.SmartupConfig.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteSmartupConfigs: res.isLoading,
    isErrorDeleteSmartupConfigs: res.isError,
    deleteSmartupConfigs: res.mutate,
  };
};

export const useDeleteAllSmartupConfigs = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.SmartupConfig.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllSmartupConfigs: res.isLoading,
    isErrorDeleteAllSmartupConfigs: res.isError,
    deleteAllSmartupConfigs: res.mutate,
  };
};

export const useDeleteSmartupConfig = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.SmartupConfig.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteSmartupConfigFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteSmartupConfig: res.isLoading,
    isErrorDeleteSmartupConfig: res.isError,
    deleteSmartupConfig: res.mutate,
    deleteSmartupConfigFromTable,
  };
};
