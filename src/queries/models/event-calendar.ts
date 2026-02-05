import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const eventCalendarsQueryKey = 'event-calendars';
export const eventCalendarQueryKey = 'event-calendar';
export const eventCalendarExistQueryKey = 'exist-event-calendar';
export const eventCalendarsCountQueryKey = 'count-event-calendars';

export const eventCalendarsAggregateQueryKey = 'aggregate-event-calendars';

export const useAggregateEventCalendars = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventCalendarsAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/eventCalendar/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateEventCalendar: res.isLoading,
    isError: res.isError,
    isErrorAggregateEventCalendar: res.isError,
    aggregateEventCalendars: res.data,
  };
};

export const useCountEventCalendars = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventCalendarsCountQueryKey, props],
    queryFn: () => api.apis.EventCalendar.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountEventCalendar: res.isLoading,
    isError: res.isError,
    isErrorCountEventCalendar: res.isError,
    countEventCalendars: res.data,
  };
};

export const useExistEventCalendar = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventCalendarExistQueryKey, props],
    queryFn: () => api.apis.EventCalendar.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistEventCalendar: res.isLoading,
    isError: res.isError,
    isErrorExistEventCalendar: res.isError,
    existEventCalendar: res.data,
  };
};

export const useEventCalendarsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [eventCalendarsQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.EventCalendar.findMany({
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
    isLoadingEventCalendars: res.isLoading,
    isError: res.isError,
    isErrorEventCalendars: res.isError,
    eventCalendarsData: res.data,
  };
};

export const useEventCalendars = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventCalendarsQueryKey, props],
    queryFn: () => api.apis.EventCalendar.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingEventCalendars: res.isLoading,
    isError: res.isError,
    isErrorEventCalendars: res.isError,
    eventCalendarsData: res.data,
  };
};

export const useEventCalendar = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [eventCalendarQueryKey, props],
    queryFn: () => api.apis.EventCalendar.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingEventCalendar: res.isLoading,
    isError: res.isError,
    isErrorEventCalendar: res.isError,
    eventCalendarData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.EventCalendar.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateEventCalendars: res.isPending,
    isError: res.isError,
    isErrorCreateEventCalendars: res.isError,
    createEventCalendars: res.mutate,
    createdEventCalendars: res.data,
  };
};

export const useCreateListEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.EventCalendar.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListEventCalendars: res.isPending,
    isError: res.isError,
    isErrorCreateListEventCalendars: res.isError,
    createListEventCalendars: res.mutate,
    createdListEventCalendars: res.data,
  };
};

export const useCreateEventCalendar = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.EventCalendar.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateEventCalendar: res.isPending,
    isError: res.isError,
    isErrorCreateEventCalendar: res.isError,
    createEventCalendar: res.mutate,
    createdEventCalendar: res.data,
  };
};

export const useUpdateEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.EventCalendar.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateEventCalendars: res.isPending,
    isError: res.isError,
    isErrorUpdateEventCalendars: res.isError,
    updateEventCalendars: res.mutate,
    updatedEventCalendars: res.data,
  };
};

export const useUpdateListEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.EventCalendar.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListEventCalendars: res.isPending,
    isError: res.isError,
    isErrorUpdateListEventCalendars: res.isError,
    updateListEventCalendars: res.mutate,
    updatedListEventCalendars: res.data,
  };
};

export const useUpdateEventCalendarsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.EventCalendar.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateEventCalendarsList: res.isPending,
    isError: res.isError,
    isErrorUpdateEventCalendarsList: res.isError,
    updateEventCalendarsList: res.mutate,
    updatedEventCalendarsList: res.data,
  };
};

export const useUpdateEventCalendar = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.EventCalendar.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateEventCalendar: res.isPending,
    isError: res.isError,
    isErrorUpdateEventCalendar: res.isError,
    updateEventCalendar: res.mutate,
    updatedEventCalendar: res.data,
  };
};

export const useDeleteEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.EventCalendar.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteEventCalendars: res.isPending,
    isError: res.isError,
    isErrorDeleteEventCalendars: res.isError,
    deleteEventCalendars: res.mutate,
  };
};

export const useDeleteAllEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.EventCalendar.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllEventCalendars: res.isPending,
    isError: res.isError,
    isErrorDeleteAllEventCalendars: res.isError,
    deleteAllEventCalendars: res.mutate,
  };
};

export const useDeleteEventCalendar = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.EventCalendar.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteEventCalendarFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteEventCalendar: res.isPending,
    isError: res.isError,
    isErrorDeleteEventCalendar: res.isError,
    deleteEventCalendar: res.mutate,
    deleteEventCalendarFromTable,
  };
};
