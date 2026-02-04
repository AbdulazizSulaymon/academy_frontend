import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const subscriptionsQueryKey = 'subscriptions';
export const subscriptionQueryKey = 'subscription';
export const subscriptionExistQueryKey = 'exist-subscription';
export const subscriptionsCountQueryKey = 'count-subscriptions';

export const subscriptionsAggregateQueryKey = 'aggregate-subscriptions';

export const useAggregateSubscriptions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionsAggregateQueryKey, props],
    () => api.instance.post('/api/subscription/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateSubscription: res.isLoading,
    isErrorAggregateSubscription: res.isError,
    aggregateSubscriptions: res.data,
  };
};

export const useCountSubscriptions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subscriptionsCountQueryKey, props], () => api.apis.Subscription.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountSubscription: res.isLoading,
    isErrorCountSubscription: res.isError,
    countSubscriptions: res.data,
  };
};

export const useExistSubscription = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subscriptionExistQueryKey, props], () => api.apis.Subscription.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistSubscription: res.isLoading,
    isErrorExistSubscription: res.isError,
    existSubscription: res.data,
  };
};

export const useSubscriptionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [subscriptionsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Subscription.findMany({
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
    isLoadingSubscriptions: res.isLoading,
    isErrorSubscriptions: res.isError,
    subscriptionsData: res.data,
  };
};

export const useSubscriptions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subscriptionsQueryKey, props], () => api.apis.Subscription.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingSubscriptions: res.isLoading,
    isErrorSubscriptions: res.isError,
    subscriptionsData: res.data,
  };
};

export const useSubscription = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionQueryKey, props],
    () => api.apis.Subscription.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingSubscription: res.isLoading,
    isErrorSubscription: res.isError,
    subscriptionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateSubscriptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Subscription.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateSubscriptions: res.isLoading,
    isErrorCreateSubscriptions: res.isError,
    createSubscriptions: res.mutate,
    createdSubscriptions: res.data,
  };
};

export const useCreateListSubscriptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Subscription.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListSubscriptions: res.isLoading,
    isErrorCreateListSubscriptions: res.isError,
    createListSubscriptions: res.mutate,
    createdListSubscriptions: res.data,
  };
};

export const useCreateSubscription = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Subscription.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateSubscription: res.isLoading,
    isErrorCreateSubscription: res.isError,
    createSubscription: res.mutate,
    createdSubscription: res.data,
  };
};

export const useUpdateSubscriptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subscription.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptions: res.isLoading,
    isErrorUpdateSubscriptions: res.isError,
    updateSubscriptions: res.mutate,
    updatedSubscriptions: res.data,
  };
};

export const useUpdateListSubscriptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subscription.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListSubscriptions: res.isLoading,
    isErrorUpdateListSubscriptions: res.isError,
    updateListSubscriptions: res.mutate,
    updatedListSubscriptions: res.data,
  };
};

export const useUpdateSubscriptionsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subscription.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptionsList: res.isLoading,
    isErrorUpdateSubscriptionsList: res.isError,
    updateSubscriptionsList: res.mutate,
    updatedSubscriptionsList: res.data,
  };
};

export const useUpdateSubscription = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Subscription.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscription: res.isLoading,
    isErrorUpdateSubscription: res.isError,
    updateSubscription: res.mutate,
    updatedSubscription: res.data,
  };
};

export const useDeleteSubscriptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Subscription.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteSubscriptions: res.isLoading,
    isErrorDeleteSubscriptions: res.isError,
    deleteSubscriptions: res.mutate,
  };
};

export const useDeleteAllSubscriptions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Subscription.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllSubscriptions: res.isLoading,
    isErrorDeleteAllSubscriptions: res.isError,
    deleteAllSubscriptions: res.mutate,
  };
};

export const useDeleteSubscription = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Subscription.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteSubscriptionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteSubscription: res.isLoading,
    isErrorDeleteSubscription: res.isError,
    deleteSubscription: res.mutate,
    deleteSubscriptionFromTable,
  };
};
