import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const addressesQueryKey = 'addresses';
export const addressQueryKey = 'address';
export const addressExistQueryKey = 'exist-address';
export const addressesCountQueryKey = 'count-addresses';

export const addressesAggregateQueryKey = 'aggregate-addresses';

export const useAggregateAddresses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [addressesAggregateQueryKey, props],
    () => api.instance.post('/api/address/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateAddress: res.isLoading,
    isErrorAggregateAddress: res.isError,
    aggregateAddresses: res.data,
  };
};

export const useCountAddresses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([addressesCountQueryKey, props], () => api.apis.Address.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountAddress: res.isLoading,
    isErrorCountAddress: res.isError,
    countAddresses: res.data,
  };
};

export const useExistAddress = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([addressExistQueryKey, props], () => api.apis.Address.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistAddress: res.isLoading,
    isErrorExistAddress: res.isError,
    existAddress: res.data,
  };
};

export const useAddressesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [addressesQueryKey, tableFetchProps, props],
    () =>
      api.apis.Address.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingAddresses: res.isLoading, isErrorAddresses: res.isError, addressesData: res.data };
};

export const useAddresses = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([addressesQueryKey, props], () => api.apis.Address.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingAddresses: res.isLoading, isErrorAddresses: res.isError, addressesData: res.data };
};

export const useAddress = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([addressQueryKey, props], () => api.apis.Address.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingAddress: res.isLoading,
    isErrorAddress: res.isError,
    addressData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateAddresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Address.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateAddresses: res.isLoading,
    isErrorCreateAddresses: res.isError,
    createAddresses: res.mutate,
    createdAddresses: res.data,
  };
};

export const useCreateListAddresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Address.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListAddresses: res.isLoading,
    isErrorCreateListAddresses: res.isError,
    createListAddresses: res.mutate,
    createdListAddresses: res.data,
  };
};

export const useCreateAddress = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Address.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateAddress: res.isLoading,
    isErrorCreateAddress: res.isError,
    createAddress: res.mutate,
    createdAddress: res.data,
  };
};

export const useUpdateAddresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Address.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateAddresses: res.isLoading,
    isErrorUpdateAddresses: res.isError,
    updateAddresses: res.mutate,
    updatedAddresses: res.data,
  };
};

export const useUpdateListAddresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Address.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListAddresses: res.isLoading,
    isErrorUpdateListAddresses: res.isError,
    updateListAddresses: res.mutate,
    updatedListAddresses: res.data,
  };
};

export const useUpdateAddressesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Address.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateAddressesList: res.isLoading,
    isErrorUpdateAddressesList: res.isError,
    updateAddressesList: res.mutate,
    updatedAddressesList: res.data,
  };
};

export const useUpdateAddress = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Address.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateAddress: res.isLoading,
    isErrorUpdateAddress: res.isError,
    updateAddress: res.mutate,
    updatedAddress: res.data,
  };
};

export const useDeleteAddresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Address.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAddresses: res.isLoading,
    isErrorDeleteAddresses: res.isError,
    deleteAddresses: res.mutate,
  };
};

export const useDeleteAllAddresses = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Address.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllAddresses: res.isLoading,
    isErrorDeleteAllAddresses: res.isError,
    deleteAllAddresses: res.mutate,
  };
};

export const useDeleteAddress = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Address.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteAddressFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteAddress: res.isLoading,
    isErrorDeleteAddress: res.isError,
    deleteAddress: res.mutate,
    deleteAddressFromTable,
  };
};
