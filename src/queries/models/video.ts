import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const videosQueryKey = 'videos';
export const videoQueryKey = 'video';
export const videoExistQueryKey = 'exist-video';
export const videosCountQueryKey = 'count-videos';

export const videosAggregateQueryKey = 'aggregate-videos';

export const useAggregateVideos = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery(
    [videosAggregateQueryKey, props],
    () => api.instance.post('/api/video/aggregate', props),
    options,
  );
  return {
    ...res,
    isLoadingAggregateVideo: res.isLoading,
    isErrorAggregateVideo: res.isError,
    aggregateVideos: res.data,
  };
};

export const useCountVideos = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([videosCountQueryKey, props], () => api.apis.Video.count({ ...props }), options);
  return {
    ...res,
    isLoadingCountVideo: res.isLoading,
    isErrorCountVideo: res.isError,
    countVideos: res.data,
  };
};

export const useExistVideo = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([videoExistQueryKey, props], () => api.apis.Video.exist({ ...props }), options);
  return {
    ...res,
    isLoadingExistVideo: res.isLoading,
    isErrorExistVideo: res.isError,
    existVideo: res.data,
  };
};

export const useVideosWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery(
    [videosQueryKey, tableFetchProps, props],
    () =>
      api.apis.Video.findMany({
        ...tableFetchProps,
        ...props,
      }),
    {
      ...options,
      enabled:
        typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    },
  );

  return { ...res, isLoadingVideos: res.isLoading, isErrorVideos: res.isError, videosData: res.data };
};

export const useVideos = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([videosQueryKey, props], () => api.apis.Video.findMany({ ...props }), {
    ...options,
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
  });
  return { ...res, isLoadingVideos: res.isLoading, isErrorVideos: res.isError, videosData: res.data };
};

export const useVideo = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery([videoQueryKey, props], () => api.apis.Video.findOne({ ...props }), options as any);
  return {
    ...res,
    isLoadingVideo: res.isLoading,
    isErrorVideo: res.isError,
    videoData: res.data as Record<string, any> | undefined,
  };
};

export const useCreateVideos = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Video.createMany({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateVideos: res.isLoading,
    isErrorCreateVideos: res.isError,
    createVideos: res.mutate,
    createdVideos: res.data,
  };
};

export const useCreateListVideos = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Video.createList(data);
  }, getQueryOptions(queryClient, options, secondaryOptions));

  return {
    ...res,
    isLoadingCreateListVideos: res.isLoading,
    isErrorCreateListVideos: res.isError,
    createListVideos: res.mutate,
    createdListVideos: res.data,
  };
};

export const useCreateVideo = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((data: Record<string, any>) => {
    return api.apis.Video.createOne({ data });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingCreateVideo: res.isLoading,
    isErrorCreateVideo: res.isError,
    createVideo: res.mutate,
    createdVideo: res.data,
  };
};

export const useUpdateVideos = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Video.updateMany(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateVideos: res.isLoading,
    isErrorUpdateVideos: res.isError,
    updateVideos: res.mutate,
    updatedVideos: res.data,
  };
};

export const useUpdateListVideos = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Video.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateListVideos: res.isLoading,
    isErrorUpdateListVideos: res.isError,
    updateListVideos: res.mutate,
    updatedListVideos: res.data,
  };
};

export const useUpdateVideosList = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Video.updateList(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateVideosList: res.isLoading,
    isErrorUpdateVideosList: res.isError,
    updateVideosList: res.mutate,
    updatedVideosList: res.data,
  };
};

export const useUpdateVideo = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((props: Record<string, any>) => {
    return api.apis.Video.updateOne(props);
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingUpdateVideo: res.isLoading,
    isErrorUpdateVideo: res.isError,
    updateVideo: res.mutate,
    updatedVideo: res.data,
  };
};

export const useDeleteVideos = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any>) => {
    return api.apis.Video.deleteMany({ where });
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteVideos: res.isLoading,
    isErrorDeleteVideos: res.isError,
    deleteVideos: res.mutate,
  };
};

export const useDeleteAllVideos = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation(() => {
    return api.apis.Video.deleteAll();
  }, getQueryOptions(queryClient, options, secondaryOptions));
  return {
    ...res,
    isLoadingDeleteAllVideos: res.isLoading,
    isErrorDeleteAllVideos: res.isError,
    deleteAllVideos: res.mutate,
  };
};

export const useDeleteVideo = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation((where: Record<string, any> | number | string) => {
    return api.apis.Video.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
  }, getQueryOptions(queryClient, options, secondaryOptions));

  const deleteVideoFromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDeleteVideo: res.isLoading,
    isErrorDeleteVideo: res.isError,
    deleteVideo: res.mutate,
    deleteVideoFromTable,
  };
};
