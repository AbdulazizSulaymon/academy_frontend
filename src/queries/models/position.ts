import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const positionsQueryKey = 'positions';
export const positionQueryKey = 'position';
export const positionExistQueryKey = 'exist-position';
export const positionsCountQueryKey = 'count-positions';

export const positionsAggregateQueryKey = 'aggregate-positions';

export const useAggregatePositions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [positionsAggregateQueryKey, props],
    () => api.instance.post('/api/position/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregatePosition: res.isLoading,
    isErrorAggregatePosition: res.isError,
    aggregatePositions: res.data,
  };
};

export const useCountPositions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([positionsCountQueryKey, props], () => api.apis.Position.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountPosition: res.isLoading,
    isErrorCountPosition: res.isError,
    countPositions: res.data,
  };
};

export const useExistPosition = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([positionExistQueryKey, props], () => api.apis.Position.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistPosition: res.isLoading,
    isErrorExistPosition: res.isError,
    existPosition: res.data,
  };
};

export const usePositionsWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [positionsQueryKey, tableFetchProps, props],
    () =>
      api.apis.Position.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingPositions: res.isLoading, isErrorPositions: res.isError, positionsData: res.data };
};

export const usePositions = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([positionsQueryKey, props], () => api.apis.Position.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingPositions: res.isLoading, isErrorPositions: res.isError, positionsData: res.data };
};

export const usePosition = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([positionQueryKey, props], () => api.apis.Position.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingPosition: res.isLoading,
    isErrorPosition: res.isError,
    positionData: res.data as Record<string, any> | undefined,
  };
};

export const useCreatePositions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Position.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreatePositions: res.isLoading,
    isErrorCreatePositions: res.isError,
    createPositions: res.mutate,
    createdPositions: res.data,
  };
};

export const useCreateListPositions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Position.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListPositions: res.isLoading,
    isErrorCreateListPositions: res.isError,
    createListPositions: res.mutate,
    createdListPositions: res.data,
  };
};

export const useCreatePosition = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Position.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreatePosition: res.isLoading,
    isErrorCreatePosition: res.isError,
    createPosition: res.mutate,
    createdPosition: res.data,
  };
};

export const useUpdatePositions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Position.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePositions: res.isLoading,
    isErrorUpdatePositions: res.isError,
    updatePositions: res.mutate,
    updatedPositions: res.data,
  };
};

export const useUpdateListPositions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Position.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListPositions: res.isLoading,
    isErrorUpdateListPositions: res.isError,
    updateListPositions: res.mutate,
    updatedListPositions: res.data,
  };
};

export const useUpdatePositionsList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Position.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePositionsList: res.isLoading,
    isErrorUpdatePositionsList: res.isError,
    updatePositionsList: res.mutate,
    updatedPositionsList: res.data,
  };
};

export const useUpdatePosition = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Position.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdatePosition: res.isLoading,
    isErrorUpdatePosition: res.isError,
    updatePosition: res.mutate,
    updatedPosition: res.data,
  };
};

export const useDeletePositions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Position.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeletePositions: res.isLoading,
    isErrorDeletePositions: res.isError,
    deletePositions: res.mutate,
  };
};

export const useDeleteAllPositions = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Position.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllPositions: res.isLoading,
    isErrorDeleteAllPositions: res.isError,
    deleteAllPositions: res.mutate,
  };
};

export const useDeletePosition = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Position.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deletePositionFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeletePosition: res.isLoading,
    isErrorDeletePosition: res.isError,
    deletePosition: res.mutate,
    deletePositionFromTable,
  };
};
