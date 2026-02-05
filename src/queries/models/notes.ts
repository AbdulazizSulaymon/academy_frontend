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
  const res = useQuery({
    queryKey: [notesAggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/note/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingAggregateNotes: res.isLoading,
    isError: res.isError,
    isErrorAggregateNotes: res.isError,
    aggregateNotes: res.data,
  };
};

export const useCountNotes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [notesCountQueryKey, props],
    queryFn: () => api.apis.Notes.count({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingCountNotes: res.isLoading,
    isError: res.isError,
    isErrorCountNotes: res.isError,
    countNotes: res.data,
  };
};

export const useExistNote = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [noteExistQueryKey, props],
    queryFn: () => api.apis.Notes.exist({ ...props }),
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingExistNotes: res.isLoading,
    isError: res.isError,
    isErrorExistNotes: res.isError,
    existNote: res.data,
  };
};

export const useNotesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [notesQueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.Notes.findMany({
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
    isLoadingNotes: res.isLoading,
    isError: res.isError,
    isErrorNotes: res.isError,
    notesData: res.data,
  };
};

export const useNotes = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [notesQueryKey, props],
    queryFn: () => api.apis.Notes.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingNotes: res.isLoading,
    isError: res.isError,
    isErrorNotes: res.isError,
    notesData: res.data,
  };
};

export const useNote = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [noteQueryKey, props],
    queryFn: () => api.apis.Notes.findOne({ ...props }),
    ...(options as any),
  });
  return {
    ...res,
    isLoading: res.isLoading,
    isLoadingNote: res.isLoading,
    isError: res.isError,
    isErrorNote: res.isError,
    noteData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Notes.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateNotes: res.isPending,
    isError: res.isError,
    isErrorCreateNotes: res.isError,
    createNotes: res.mutate,
    createdNotes: res.data,
  };
};

export const useCreateListNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Notes.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateListNotes: res.isPending,
    isError: res.isError,
    isErrorCreateListNotes: res.isError,
    createListNotes: res.mutate,
    createdListNotes: res.data,
  };
};

export const useCreateNote = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.Notes.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingCreateNote: res.isPending,
    isError: res.isError,
    isErrorCreateNote: res.isError,
    createNote: res.mutate,
    createdNote: res.data,
  };
};

export const useUpdateNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notes.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateNotes: res.isPending,
    isError: res.isError,
    isErrorUpdateNotes: res.isError,
    updateNotes: res.mutate,
    updatedNotes: res.data,
  };
};

export const useUpdateListNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notes.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateListNotes: res.isPending,
    isError: res.isError,
    isErrorUpdateListNotes: res.isError,
    updateListNotes: res.mutate,
    updatedListNotes: res.data,
  };
};

export const useUpdateNotesList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notes.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateNotesList: res.isPending,
    isError: res.isError,
    isErrorUpdateNotesList: res.isError,
    updateNotesList: res.mutate,
    updatedNotesList: res.data,
  };
};

export const useUpdateNote = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.Notes.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingUpdateNote: res.isPending,
    isError: res.isError,
    isErrorUpdateNote: res.isError,
    updateNote: res.mutate,
    updatedNote: res.data,
  };
};

export const useDeleteNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.Notes.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteNotes: res.isPending,
    isError: res.isError,
    isErrorDeleteNotes: res.isError,
    deleteNotes: res.mutate,
  };
};

export const useDeleteAllNotes = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.Notes.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteAllNotes: res.isPending,
    isError: res.isError,
    isErrorDeleteAllNotes: res.isError,
    deleteAllNotes: res.mutate,
  };
};

export const useDeleteNote = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.Notes.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const deleteNoteFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoading: res.isPending,
    isLoadingDeleteNote: res.isPending,
    isError: res.isError,
    isErrorDeleteNote: res.isError,
    deleteNote: res.mutate,
    deleteNoteFromTable,
  };
};
