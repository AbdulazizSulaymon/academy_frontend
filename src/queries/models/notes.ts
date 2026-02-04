import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const notesQueryKey = 'notes';
export const noteQueryKey = 'note';
export const noteExistQueryKey = 'exist-note';
export const notesCountQueryKey = 'count-notes';

export const notesAggregateQueryKey = 'aggregate-notes';

export const useAggregateNotes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([notesAggregateQueryKey, props], () => api.instance.post('/api/note/aggregate', props), options);
  return {
    ...res,
    isLoadingAggregateNotes: res.isLoading,
    isErrorAggregateNotes: res.isError,
    aggregateNotes: res.data,
  };
};

export const useCountNotes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([notesCountQueryKey, props], () => api.apis.Notes.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountNotes: res.isLoading,
    isErrorCountNotes: res.isError,
    countNotes: res.data,
  };
};

export const useExistNote = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([noteExistQueryKey, props], () => api.apis.Notes.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistNotes: res.isLoading,
    isErrorExistNotes: res.isError,
    existNote: res.data,
  };
};

export const useNotesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [notesQueryKey, tableFetchProps, props],
    () =>
      api.apis.Notes.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingNotes: res.isLoading, isErrorNotes: res.isError, notesData: res.data };
};

export const useNotes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([notesQueryKey, props], () => api.apis.Notes.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingNotes: res.isLoading, isErrorNotes: res.isError, notesData: res.data };
};

export const useNote = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([noteQueryKey, props], () => api.apis.Notes.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingNote: res.isLoading,
    isErrorNote: res.isError,
    noteData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Notes.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateNotes: res.isLoading,
    isErrorCreateNotes: res.isError,
    createNotes: res.mutate,
    createdNotes: res.data,
  };
};

export const useCreateListNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Notes.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListNotes: res.isLoading,
    isErrorCreateListNotes: res.isError,
    createListNotes: res.mutate,
    createdListNotes: res.data,
  };
};

export const useCreateNote = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Notes.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateNote: res.isLoading,
    isErrorCreateNote: res.isError,
    createNote: res.mutate,
    createdNote: res.data,
  };
};

export const useUpdateNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notes.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateNotes: res.isLoading,
    isErrorUpdateNotes: res.isError,
    updateNotes: res.mutate,
    updatedNotes: res.data,
  };
};

export const useUpdateListNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notes.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListNotes: res.isLoading,
    isErrorUpdateListNotes: res.isError,
    updateListNotes: res.mutate,
    updatedListNotes: res.data,
  };
};

export const useUpdateNotesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notes.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateNotesList: res.isLoading,
    isErrorUpdateNotesList: res.isError,
    updateNotesList: res.mutate,
    updatedNotesList: res.data,
  };
};

export const useUpdateNote = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Notes.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateNote: res.isLoading,
    isErrorUpdateNote: res.isError,
    updateNote: res.mutate,
    updatedNote: res.data,
  };
};

export const useDeleteNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Notes.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteNotes: res.isLoading,
    isErrorDeleteNotes: res.isError,
    deleteNotes: res.mutate,
  };
};

export const useDeleteAllNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Notes.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllNotes: res.isLoading,
    isErrorDeleteAllNotes: res.isError,
    deleteAllNotes: res.mutate,
  };
};

export const useDeleteNote = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Notes.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteNoteFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteNote: res.isLoading,
    isErrorDeleteNote: res.isError,
    deleteNote: res.mutate,
    deleteNoteFromTable,
  };
};
