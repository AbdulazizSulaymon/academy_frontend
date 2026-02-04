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
  const res = useQuery(
    [eventCalendarsAggregateQueryKey, props],
    () => api.instance.post('/api/eventCalendar/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateEventCalendar: res.isLoading,
    isErrorAggregateEventCalendar: res.isError,
    aggregateEventCalendars: res.data,
  };
};

export const useCountEventCalendars = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([eventCalendarsCountQueryKey, props], () => api.apis.EventCalendar.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountEventCalendar: res.isLoading,
    isErrorCountEventCalendar: res.isError,
    countEventCalendars: res.data,
  };
};

export const useExistEventCalendar = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([eventCalendarExistQueryKey, props], () => api.apis.EventCalendar.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistEventCalendar: res.isLoading,
    isErrorExistEventCalendar: res.isError,
    existEventCalendar: res.data,
  };
};

export const useEventCalendarsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [eventCalendarsQueryKey, tableFetchProps, props],
    () =>
      api.apis.EventCalendar.findMany({
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
    isLoadingEventCalendars: res.isLoading,
    isErrorEventCalendars: res.isError,
    eventCalendarsData: res.data,
  };
};

export const useEventCalendars = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([eventCalendarsQueryKey, props], () => api.apis.EventCalendar.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return {
    ...res,
    isLoadingEventCalendars: res.isLoading,
    isErrorEventCalendars: res.isError,
    eventCalendarsData: res.data,
  };
};

export const useEventCalendar = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [eventCalendarQueryKey, props],
    () => api.apis.EventCalendar.findOne({ ...props }),
    options as any,
  );
  return {
    ...res,
    isLoadingEventCalendar: res.isLoading,
    isErrorEventCalendar: res.isError,
    eventCalendarData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.EventCalendar.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateEventCalendars: res.isLoading,
    isErrorCreateEventCalendars: res.isError,
    createEventCalendars: res.mutate,
    createdEventCalendars: res.data,
  };
};

export const useCreateListEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.EventCalendar.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListEventCalendars: res.isLoading,
    isErrorCreateListEventCalendars: res.isError,
    createListEventCalendars: res.mutate,
    createdListEventCalendars: res.data,
  };
};

export const useCreateEventCalendar = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.EventCalendar.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateEventCalendar: res.isLoading,
    isErrorCreateEventCalendar: res.isError,
    createEventCalendar: res.mutate,
    createdEventCalendar: res.data,
  };
};

export const useUpdateEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.EventCalendar.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateEventCalendars: res.isLoading,
    isErrorUpdateEventCalendars: res.isError,
    updateEventCalendars: res.mutate,
    updatedEventCalendars: res.data,
  };
};

export const useUpdateListEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.EventCalendar.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListEventCalendars: res.isLoading,
    isErrorUpdateListEventCalendars: res.isError,
    updateListEventCalendars: res.mutate,
    updatedListEventCalendars: res.data,
  };
};

export const useUpdateEventCalendarsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.EventCalendar.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateEventCalendarsList: res.isLoading,
    isErrorUpdateEventCalendarsList: res.isError,
    updateEventCalendarsList: res.mutate,
    updatedEventCalendarsList: res.data,
  };
};

export const useUpdateEventCalendar = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.EventCalendar.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateEventCalendar: res.isLoading,
    isErrorUpdateEventCalendar: res.isError,
    updateEventCalendar: res.mutate,
    updatedEventCalendar: res.data,
  };
};

export const useDeleteEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.EventCalendar.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteEventCalendars: res.isLoading,
    isErrorDeleteEventCalendars: res.isError,
    deleteEventCalendars: res.mutate,
  };
};

export const useDeleteAllEventCalendars = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.EventCalendar.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllEventCalendars: res.isLoading,
    isErrorDeleteAllEventCalendars: res.isError,
    deleteAllEventCalendars: res.mutate,
  };
};

export const useDeleteEventCalendar = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.EventCalendar.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteEventCalendarFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteEventCalendar: res.isLoading,
    isErrorDeleteEventCalendar: res.isError,
    deleteEventCalendar: res.mutate,
    deleteEventCalendarFromTable,
  };
};
