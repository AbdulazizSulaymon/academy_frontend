import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const clientsQueryKey = 'clients';
export const clientQueryKey = 'client';
export const clientExistQueryKey = 'exist-client';
export const clientsCountQueryKey = 'count-clients';

export const clientsAggregateQueryKey = 'aggregate-clients';

export const useAggregateClients = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [clientsAggregateQueryKey, props],
    () => api.instance.post('/api/client/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateClient: res.isLoading,
    isErrorAggregateClient: res.isError,
    aggregateClients: res.data,
  };
};

export const useCountClients = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([clientsCountQueryKey, props], () => api.apis.Client.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountClient: res.isLoading,
    isErrorCountClient: res.isError,
    countClients: res.data,
  };
};

export const useExistClient = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([clientExistQueryKey, props], () => api.apis.Client.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistClient: res.isLoading,
    isErrorExistClient: res.isError,
    existClient: res.data,
  };
};

export const useClientsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [clientsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Client.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingClients: res.isLoading, isErrorClients: res.isError, clientsData: res.data };
};

export const useClients = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([clientsQueryKey, props], () => api.apis.Client.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingClients: res.isLoading, isErrorClients: res.isError, clientsData: res.data };
};

export const useClient = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([clientQueryKey, props], () => api.apis.Client.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingClient: res.isLoading,
    isErrorClient: res.isError,
    clientData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateClients = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Client.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateClients: res.isLoading,
    isErrorCreateClients: res.isError,
    createClients: res.mutate,
    createdClients: res.data,
  };
};

export const useCreateListClients = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Client.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListClients: res.isLoading,
    isErrorCreateListClients: res.isError,
    createListClients: res.mutate,
    createdListClients: res.data,
  };
};

export const useCreateClient = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Client.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateClient: res.isLoading,
    isErrorCreateClient: res.isError,
    createClient: res.mutate,
    createdClient: res.data,
  };
};

export const useUpdateClients = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Client.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateClients: res.isLoading,
    isErrorUpdateClients: res.isError,
    updateClients: res.mutate,
    updatedClients: res.data,
  };
};

export const useUpdateListClients = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Client.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListClients: res.isLoading,
    isErrorUpdateListClients: res.isError,
    updateListClients: res.mutate,
    updatedListClients: res.data,
  };
};

export const useUpdateClientsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Client.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateClientsList: res.isLoading,
    isErrorUpdateClientsList: res.isError,
    updateClientsList: res.mutate,
    updatedClientsList: res.data,
  };
};

export const useUpdateClient = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Client.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateClient: res.isLoading,
    isErrorUpdateClient: res.isError,
    updateClient: res.mutate,
    updatedClient: res.data,
  };
};

export const useDeleteClients = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Client.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteClients: res.isLoading,
    isErrorDeleteClients: res.isError,
    deleteClients: res.mutate,
  };
};

export const useDeleteAllClients = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Client.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllClients: res.isLoading,
    isErrorDeleteAllClients: res.isError,
    deleteAllClients: res.mutate,
  };
};

export const useDeleteClient = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Client.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteClientFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteClient: res.isLoading,
    isErrorDeleteClient: res.isError,
    deleteClient: res.mutate,
    deleteClientFromTable,
  };
};
