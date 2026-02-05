import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const modulesQueryKey = 'modules';
export const moduleQueryKey = 'module';
export const moduleExistQueryKey = 'exist-module';
export const modulesCountQueryKey = 'count-modules';

export const modulesAggregateQueryKey = 'aggregate-modules';

export const useAggregateModules = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [modulesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/module/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateModule: res.isLoading,
    isError: res.isError,
    isErrorAggregateModule: res.isError,
    aggregateModules: res.data,
  };
};

export const useCountModules = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [modulesCountQueryKey, props],
    queryFn: () => api.apis.Module.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountModule: res.isLoading,
    isError: res.isError,
    isErrorCountModule: res.isError,
    countModules: res.data,
  };
};

export const useExistModule = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [moduleExistQueryKey, props],
    queryFn: () => api.apis.Module.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistModule: res.isLoading,
    isError: res.isError,
    isErrorExistModule: res.isError,
    existModule: res.data,
  };
};

export const useModulesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [modulesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Module.findMany({
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
    isLoadingModules: res.isLoading,
    isError: res.isError,
    isErrorModules: res.isError,
    modulesData: res.data,
  };
};

export const useModules = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [modulesQueryKey, props],
    queryFn: () => api.apis.Module.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingModules: res.isLoading,
    isError: res.isError,
    isErrorModules: res.isError,
    modulesData: res.data,
  };
};

export const useModule = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [moduleQueryKey, props],
    queryFn: () => api.apis.Module.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingModule: res.isLoading,
    isError: res.isError,
    isErrorModule: res.isError,
    moduleData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateModules = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Module.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateModules: res.isPending,
    isError: res.isError,
    isErrorCreateModules: res.isError,
    createModules: res.mutate,
    createdModules: res.data,
  };
};

export const useCreateListModules = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Module.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListModules: res.isPending,
    isError: res.isError,
    isErrorCreateListModules: res.isError,
    createListModules: res.mutate,
    createdListModules: res.data,
  };
};

export const useCreateModule = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Module.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateModule: res.isPending,
    isError: res.isError,
    isErrorCreateModule: res.isError,
    createModule: res.mutate,
    createdModule: res.data,
  };
};

export const useUpdateModules = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Module.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateModules: res.isPending,
    isError: res.isError,
    isErrorUpdateModules: res.isError,
    updateModules: res.mutate,
    updatedModules: res.data,
  };
};

export const useUpdateListModules = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Module.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListModules: res.isPending,
    isError: res.isError,
    isErrorUpdateListModules: res.isError,
    updateListModules: res.mutate,
    updatedListModules: res.data,
  };
};

export const useUpdateModulesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Module.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateModulesList: res.isPending,
    isError: res.isError,
    isErrorUpdateModulesList: res.isError,
    updateModulesList: res.mutate,
    updatedModulesList: res.data,
  };
};

export const useUpdateModule = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Module.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateModule: res.isPending,
    isError: res.isError,
    isErrorUpdateModule: res.isError,
    updateModule: res.mutate,
    updatedModule: res.data,
  };
};

export const useDeleteModules = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Module.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteModules: res.isPending,
    isError: res.isError,
    isErrorDeleteModules: res.isError,
    deleteModules: res.mutate,
  };
};

export const useDeleteAllModules = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Module.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllModules: res.isPending,
    isError: res.isError,
    isErrorDeleteAllModules: res.isError,
    deleteAllModules: res.mutate,
  };
};

export const useDeleteModule = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Module.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteModuleFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteModule: res.isPending,
    isError: res.isError,
    isErrorDeleteModule: res.isError,
    deleteModule: res.mutate,
    deleteModuleFromTable,
  };
};
