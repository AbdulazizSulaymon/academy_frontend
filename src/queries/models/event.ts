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
    isLoadingAggregateEvent: res.isLoading,
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
    isLoadingCountEvent: res.isLoading,
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
    isLoadingExistEvent: res.isLoading,
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

  return { ...res, isLoadingEvents: res.isLoading, isErrorEvents: res.isError, eventsData: res.data };
};

export const useEvents = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventsQueryKey, props],
    queryFn: () => api.apis.Event.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return { ...res, isLoadingEvents: res.isLoading, isErrorEvents: res.isError, eventsData: res.data };
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
    isLoadingEvent: res.isLoading,
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
    isLoadingCreateEvents: res.isPending,
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
    isLoadingCreateListEvents: res.isPending,
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
    isLoadingCreateEvent: res.isPending,
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
    isLoadingUpdateEvents: res.isPending,
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
    isLoadingUpdateListEvents: res.isPending,
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
    isLoadingUpdateEventsList: res.isPending,
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
    isLoadingUpdateEvent: res.isPending,
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
    isLoadingDeleteEvents: res.isPending,
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
    isLoadingDeleteAllEvents: res.isPending,
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
    isLoadingDeleteEvent: res.isPending,
    isErrorDeleteEvent: res.isError,
    deleteEvent: res.mutate,
    deleteEventFromTable,
  };
};
