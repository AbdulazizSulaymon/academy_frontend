import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const subscriptionTransactionsQueryKey = 'subscription-transactions';
export const subscriptionTransactionQueryKey = 'subscription-transaction';
export const subscriptionTransactionExistQueryKey = 'exist-subscription-transaction';
export const subscriptionTransactionsCountQueryKey = 'count-subscription-transactions';

export const subscriptionTransactionsAggregateQueryKey = 'aggregate-subscription-transactions';

export const useAggregateSubscriptionTransactions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionTransactionsAggregateQueryKey, props],
    () => api.instance.post('/api/subscriptionTransaction/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateSubscriptionTransaction: res.isLoading,
    isErrorAggregateSubscriptionTransaction: res.isError,
    aggregateSubscriptionTransactions: res.data,
  };
};

export const useCountSubscriptionTransactions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionTransactionsCountQueryKey, props],
    () => api.apis.SubscriptionTransaction.count({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingCountSubscriptionTransaction: res.isLoading,
    isErrorCountSubscriptionTransaction: res.isError,
    countSubscriptionTransactions: res.data,
  };
};

export const useExistSubscriptionTransaction = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionTransactionExistQueryKey, props],
    () => api.apis.SubscriptionTransaction.exist({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingExistSubscriptionTransaction: res.isLoading,
    isErrorExistSubscriptionTransaction: res.isError,
    existSubscriptionTransaction: res.data,
  };
};

export const useSubscriptionTransactionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [subscriptionTransactionsQueryKey, tableFetchProps, props],
    () =>
      api.apis.SubscriptionTransaction.findMany({
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
    isLoadingSubscriptionTransactions: res.isLoading,
    isErrorSubscriptionTransactions: res.isError,
    subscriptionTransactionsData: res.data,
  };
};

export const useSubscriptionTransactions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionTransactionsQueryKey, props],
    () => api.apis.SubscriptionTransaction.findMany({ ...props }),
    {
      ...options,
      enabled: options.enabled != undefined ? !!options.enabled : undefined,
    },
  );
  return {
    ...res,
    isLoadingSubscriptionTransactions: res.isLoading,
    isErrorSubscriptionTransactions: res.isError,
    subscriptionTransactionsData: res.data,
  };
};

export const useSubscriptionTransaction = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionTransactionQueryKey, props],
    () => api.apis.SubscriptionTransaction.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingSubscriptionTransaction: res.isLoading,
    isErrorSubscriptionTransaction: res.isError,
    subscriptionTransactionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateSubscriptionTransactions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateSubscriptionTransactions: res.isLoading,
    isErrorCreateSubscriptionTransactions: res.isError,
    createSubscriptionTransactions: res.mutate,
    createdSubscriptionTransactions: res.data,
  };
};

export const useCreateListSubscriptionTransactions = (
  options: QueryOptions,
  secondaryOptions?: QuerySecondaryOptions,
) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListSubscriptionTransactions: res.isLoading,
    isErrorCreateListSubscriptionTransactions: res.isError,
    createListSubscriptionTransactions: res.mutate,
    createdListSubscriptionTransactions: res.data,
  };
};

export const useCreateSubscriptionTransaction = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateSubscriptionTransaction: res.isLoading,
    isErrorCreateSubscriptionTransaction: res.isError,
    createSubscriptionTransaction: res.mutate,
    createdSubscriptionTransaction: res.data,
  };
};

export const useUpdateSubscriptionTransactions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptionTransactions: res.isLoading,
    isErrorUpdateSubscriptionTransactions: res.isError,
    updateSubscriptionTransactions: res.mutate,
    updatedSubscriptionTransactions: res.data,
  };
};

export const useUpdateListSubscriptionTransactions = (
  options: QueryOptions,
  secondaryOptions?: QuerySecondaryOptions,
) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListSubscriptionTransactions: res.isLoading,
    isErrorUpdateListSubscriptionTransactions: res.isError,
    updateListSubscriptionTransactions: res.mutate,
    updatedListSubscriptionTransactions: res.data,
  };
};

export const useUpdateSubscriptionTransactionsList = (
  options: QueryOptions,
  secondaryOptions?: QuerySecondaryOptions,
) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptionTransactionsList: res.isLoading,
    isErrorUpdateSubscriptionTransactionsList: res.isError,
    updateSubscriptionTransactionsList: res.mutate,
    updatedSubscriptionTransactionsList: res.data,
  };
};

export const useUpdateSubscriptionTransaction = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptionTransaction: res.isLoading,
    isErrorUpdateSubscriptionTransaction: res.isError,
    updateSubscriptionTransaction: res.mutate,
    updatedSubscriptionTransaction: res.data,
  };
};

export const useDeleteSubscriptionTransactions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.SubscriptionTransaction.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteSubscriptionTransactions: res.isLoading,
    isErrorDeleteSubscriptionTransactions: res.isError,
    deleteSubscriptionTransactions: res.mutate,
  };
};

export const useDeleteAllSubscriptionTransactions = (
  options: QueryOptions,
  secondaryOptions?: QuerySecondaryOptions,
) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.SubscriptionTransaction.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllSubscriptionTransactions: res.isLoading,
    isErrorDeleteAllSubscriptionTransactions: res.isError,
    deleteAllSubscriptionTransactions: res.mutate,
  };
};

export const useDeleteSubscriptionTransaction = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.SubscriptionTransaction.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteSubscriptionTransactionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteSubscriptionTransaction: res.isLoading,
    isErrorDeleteSubscriptionTransaction: res.isError,
    deleteSubscriptionTransaction: res.mutate,
    deleteSubscriptionTransactionFromTable,
  };
};
