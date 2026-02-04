import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const subscriptionPlansQueryKey = 'subscription-plans';
export const subscriptionPlanQueryKey = 'subscription-plan';
export const subscriptionPlanExistQueryKey = 'exist-subscription-plan';
export const subscriptionPlansCountQueryKey = 'count-subscription-plans';

export const subscriptionPlansAggregateQueryKey = 'aggregate-subscription-plans';

export const useAggregateSubscriptionPlans = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionPlansAggregateQueryKey, props],
    () => api.instance.post('/api/subscriptionPlan/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateSubscriptionPlan: res.isLoading,
    isErrorAggregateSubscriptionPlan: res.isError,
    aggregateSubscriptionPlans: res.data,
  };
};

export const useCountSubscriptionPlans = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionPlansCountQueryKey, props],
    () => api.apis.SubscriptionPlan.count({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingCountSubscriptionPlan: res.isLoading,
    isErrorCountSubscriptionPlan: res.isError,
    countSubscriptionPlans: res.data,
  };
};

export const useExistSubscriptionPlan = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionPlanExistQueryKey, props],
    () => api.apis.SubscriptionPlan.exist({ ...props }),
    options,
  );
  return {
    ...res,
    isLoadingExistSubscriptionPlan: res.isLoading,
    isErrorExistSubscriptionPlan: res.isError,
    existSubscriptionPlan: res.data,
  };
};

export const useSubscriptionPlansWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [subscriptionPlansQueryKey, tableFetchProps, props],
    () =>
      api.apis.SubscriptionPlan.findMany({
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
    isLoadingSubscriptionPlans: res.isLoading,
    isErrorSubscriptionPlans: res.isError,
    subscriptionPlansData: res.data,
  };
};

export const useSubscriptionPlans = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([subscriptionPlansQueryKey, props], () => api.apis.SubscriptionPlan.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingSubscriptionPlans: res.isLoading,
    isErrorSubscriptionPlans: res.isError,
    subscriptionPlansData: res.data,
  };
};

export const useSubscriptionPlan = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [subscriptionPlanQueryKey, props],
    () => api.apis.SubscriptionPlan.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingSubscriptionPlan: res.isLoading,
    isErrorSubscriptionPlan: res.isError,
    subscriptionPlanData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateSubscriptionPlans = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SubscriptionPlan.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateSubscriptionPlans: res.isLoading,
    isErrorCreateSubscriptionPlans: res.isError,
    createSubscriptionPlans: res.mutate,
    createdSubscriptionPlans: res.data,
  };
};

export const useCreateListSubscriptionPlans = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SubscriptionPlan.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListSubscriptionPlans: res.isLoading,
    isErrorCreateListSubscriptionPlans: res.isError,
    createListSubscriptionPlans: res.mutate,
    createdListSubscriptionPlans: res.data,
  };
};

export const useCreateSubscriptionPlan = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.SubscriptionPlan.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateSubscriptionPlan: res.isLoading,
    isErrorCreateSubscriptionPlan: res.isError,
    createSubscriptionPlan: res.mutate,
    createdSubscriptionPlan: res.data,
  };
};

export const useUpdateSubscriptionPlans = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionPlan.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptionPlans: res.isLoading,
    isErrorUpdateSubscriptionPlans: res.isError,
    updateSubscriptionPlans: res.mutate,
    updatedSubscriptionPlans: res.data,
  };
};

export const useUpdateListSubscriptionPlans = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionPlan.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListSubscriptionPlans: res.isLoading,
    isErrorUpdateListSubscriptionPlans: res.isError,
    updateListSubscriptionPlans: res.mutate,
    updatedListSubscriptionPlans: res.data,
  };
};

export const useUpdateSubscriptionPlansList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionPlan.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptionPlansList: res.isLoading,
    isErrorUpdateSubscriptionPlansList: res.isError,
    updateSubscriptionPlansList: res.mutate,
    updatedSubscriptionPlansList: res.data,
  };
};

export const useUpdateSubscriptionPlan = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.SubscriptionPlan.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSubscriptionPlan: res.isLoading,
    isErrorUpdateSubscriptionPlan: res.isError,
    updateSubscriptionPlan: res.mutate,
    updatedSubscriptionPlan: res.data,
  };
};

export const useDeleteSubscriptionPlans = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.SubscriptionPlan.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteSubscriptionPlans: res.isLoading,
    isErrorDeleteSubscriptionPlans: res.isError,
    deleteSubscriptionPlans: res.mutate,
  };
};

export const useDeleteAllSubscriptionPlans = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.SubscriptionPlan.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllSubscriptionPlans: res.isLoading,
    isErrorDeleteAllSubscriptionPlans: res.isError,
    deleteAllSubscriptionPlans: res.mutate,
  };
};

export const useDeleteSubscriptionPlan = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.SubscriptionPlan.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteSubscriptionPlanFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteSubscriptionPlan: res.isLoading,
    isErrorDeleteSubscriptionPlan: res.isError,
    deleteSubscriptionPlan: res.mutate,
    deleteSubscriptionPlanFromTable,
  };
};
