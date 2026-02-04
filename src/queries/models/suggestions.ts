import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const suggestionsQueryKey = 'suggestions';
export const suggestionQueryKey = 'suggestion';
export const suggestionExistQueryKey = 'exist-suggestion';
export const suggestionsCountQueryKey = 'count-suggestions';

export const suggestionsAggregateQueryKey = 'aggregate-suggestions';

export const useAggregateSuggestions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [suggestionsAggregateQueryKey, props],
    () => api.instance.post('/api/suggestion/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateSuggestions: res.isLoading,
    isErrorAggregateSuggestions: res.isError,
    aggregateSuggestions: res.data,
  };
};

export const useCountSuggestions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([suggestionsCountQueryKey, props], () => api.apis.Suggestions.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountSuggestions: res.isLoading,
    isErrorCountSuggestions: res.isError,
    countSuggestions: res.data,
  };
};

export const useExistSuggestion = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([suggestionExistQueryKey, props], () => api.apis.Suggestions.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistSuggestions: res.isLoading,
    isErrorExistSuggestions: res.isError,
    existSuggestion: res.data,
  };
};

export const useSuggestionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [suggestionsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Suggestions.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingSuggestions: res.isLoading, isErrorSuggestions: res.isError, suggestionsData: res.data };
};

export const useSuggestions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([suggestionsQueryKey, props], () => api.apis.Suggestions.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingSuggestions: res.isLoading, isErrorSuggestions: res.isError, suggestionsData: res.data };
};

export const useSuggestion = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([suggestionQueryKey, props], () => api.apis.Suggestions.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingSuggestion: res.isLoading,
    isErrorSuggestion: res.isError,
    suggestionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateSuggestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Suggestions.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateSuggestions: res.isLoading,
    isErrorCreateSuggestions: res.isError,
    createSuggestions: res.mutate,
    createdSuggestions: res.data,
  };
};

export const useCreateListSuggestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Suggestions.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListSuggestions: res.isLoading,
    isErrorCreateListSuggestions: res.isError,
    createListSuggestions: res.mutate,
    createdListSuggestions: res.data,
  };
};

export const useCreateSuggestion = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Suggestions.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateSuggestion: res.isLoading,
    isErrorCreateSuggestion: res.isError,
    createSuggestion: res.mutate,
    createdSuggestion: res.data,
  };
};

export const useUpdateSuggestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Suggestions.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSuggestions: res.isLoading,
    isErrorUpdateSuggestions: res.isError,
    updateSuggestions: res.mutate,
    updatedSuggestions: res.data,
  };
};

export const useUpdateListSuggestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Suggestions.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListSuggestions: res.isLoading,
    isErrorUpdateListSuggestions: res.isError,
    updateListSuggestions: res.mutate,
    updatedListSuggestions: res.data,
  };
};

export const useUpdateSuggestionsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Suggestions.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSuggestionsList: res.isLoading,
    isErrorUpdateSuggestionsList: res.isError,
    updateSuggestionsList: res.mutate,
    updatedSuggestionsList: res.data,
  };
};

export const useUpdateSuggestion = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Suggestions.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateSuggestion: res.isLoading,
    isErrorUpdateSuggestion: res.isError,
    updateSuggestion: res.mutate,
    updatedSuggestion: res.data,
  };
};

export const useDeleteSuggestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Suggestions.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteSuggestions: res.isLoading,
    isErrorDeleteSuggestions: res.isError,
    deleteSuggestions: res.mutate,
  };
};

export const useDeleteAllSuggestions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Suggestions.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllSuggestions: res.isLoading,
    isErrorDeleteAllSuggestions: res.isError,
    deleteAllSuggestions: res.mutate,
  };
};

export const useDeleteSuggestion = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Suggestions.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteSuggestionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteSuggestion: res.isLoading,
    isErrorDeleteSuggestion: res.isError,
    deleteSuggestion: res.mutate,
    deleteSuggestionFromTable,
  };
};
