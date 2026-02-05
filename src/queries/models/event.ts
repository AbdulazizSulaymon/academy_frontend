import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const eventsQueryKey = 'events';
export const eventQueryKey = 'event';
export const eventExistQueryKey = 'exist-event';
export const eventsCountQueryKey = 'count-events';

export const eventsAggregateQueryKey = 'aggregate-events';

export const useAggregateEvents = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/event/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateEvent: res.isLoading,
    isError: res.isError,
    isErrorAggregateEvent: res.isError,
    aggregateEvents: res.data,
  };
};

export const useCountEvents = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventsCountQueryKey, props],
    queryFn: () => api.apis.Event.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountEvent: res.isLoading,
    isError: res.isError,
    isErrorCountEvent: res.isError,
    countEvents: res.data,
  };
};

export const useExistEvent = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventExistQueryKey, props],
    queryFn: () => api.apis.Event.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistEvent: res.isLoading,
    isError: res.isError,
    isErrorExistEvent: res.isError,
    existEvent: res.data,
  };
};

export const useEventsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [eventsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Event.findMany({
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
    isLoadingEvents: res.isLoading,
    isError: res.isError,
    isErrorEvents: res.isError,
    eventsData: res.data,
  };
};

export const useEvents = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventsQueryKey, props],
    queryFn: () => api.apis.Event.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingEvents: res.isLoading,
    isError: res.isError,
    isErrorEvents: res.isError,
    eventsData: res.data,
  };
};

export const useEvent = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventQueryKey, props],
    queryFn: () => api.apis.Event.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingEvent: res.isLoading,
    isError: res.isError,
    isErrorEvent: res.isError,
    eventData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateEvents = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Event.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateEvents: res.isPending,
    isError: res.isError,
    isErrorCreateEvents: res.isError,
    createEvents: res.mutate,
    createdEvents: res.data,
  };
};

export const useCreateListEvents = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Event.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListEvents: res.isPending,
    isError: res.isError,
    isErrorCreateListEvents: res.isError,
    createListEvents: res.mutate,
    createdListEvents: res.data,
  };
};

export const useCreateEvent = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Event.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateEvent: res.isPending,
    isError: res.isError,
    isErrorCreateEvent: res.isError,
    createEvent: res.mutate,
    createdEvent: res.data,
  };
};

export const useUpdateEvents = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Event.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateEvents: res.isPending,
    isError: res.isError,
    isErrorUpdateEvents: res.isError,
    updateEvents: res.mutate,
    updatedEvents: res.data,
  };
};

export const useUpdateListEvents = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Event.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListEvents: res.isPending,
    isError: res.isError,
    isErrorUpdateListEvents: res.isError,
    updateListEvents: res.mutate,
    updatedListEvents: res.data,
  };
};

export const useUpdateEventsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Event.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateEventsList: res.isPending,
    isError: res.isError,
    isErrorUpdateEventsList: res.isError,
    updateEventsList: res.mutate,
    updatedEventsList: res.data,
  };
};

export const useUpdateEvent = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Event.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateEvent: res.isPending,
    isError: res.isError,
    isErrorUpdateEvent: res.isError,
    updateEvent: res.mutate,
    updatedEvent: res.data,
  };
};

export const useDeleteEvents = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Event.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteEvents: res.isPending,
    isError: res.isError,
    isErrorDeleteEvents: res.isError,
    deleteEvents: res.mutate,
  };
};

export const useDeleteAllEvents = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Event.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllEvents: res.isPending,
    isError: res.isError,
    isErrorDeleteAllEvents: res.isError,
    deleteAllEvents: res.mutate,
  };
};

export const useDeleteEvent = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Event.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteEventFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteEvent: res.isPending,
    isError: res.isError,
    isErrorDeleteEvent: res.isError,
    deleteEvent: res.mutate,
    deleteEventFromTable,
  };
};
