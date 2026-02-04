import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries/index';

// export const useDemoExistBookCategory = (props: Record<string, any>, options: QueryOptions) => {
//   const api = useApi();
//   const res = useQuery(['book-categories', props], () => api.apis.BookCategory.exist({ ...props }), options);
//   return {
//     ...res,
//     isLoadingBookCategory: res.isLoading,
//     isErrorBookCategory: res.isError,
//     existBookCategory: res.data,
//   };
// };
//
// export const useDemoBookCategoriesWithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
//   const api = useApi();
//   const tableFetchProps = useTableFetchProps();
//   const res = useQuery(
//     ['course-categories', tableFetchProps, props],
//     () =>
//       api.apis.CourseCategory.findMany({
//         ...tableFetchProps,
//         ...props,
//       }),
//     {
//       ...options,
//       enabled:
//         typeof options.enabled === 'undefined' ? !!tableFetchProps.take : options.enabled && !!tableFetchProps.take,
//     },
//   );
//
//   return { ...res, isLoadingBookCategory: res.isLoading, isErrorBookCategory: res.isError, bookCategories: res.data };
// };
//
// export const useDemoBookCategories = (props: Record<string, any>, options: QueryOptions) => {
//   const api = useApi();
//   const res = useQuery(['book-categories', props], () => api.apis.BookCategory.findMany({ ...props }), options);
//   return { ...res, isLoadingBookCategory: res.isLoading, isErrorBookCategory: res.isError, bookCategories: res.data };
// };
//
// export const useDemoBookCategory = (props: Record<string, any>, options: QueryOptions) => {
//   const api = useApi();
//   const res = useQuery(['book-categories', props], () => api.apis.BookCategory.findOne({ ...props }), options);
//   return { ...res, isLoadingBookCategory: res.isLoading, isErrorBookCategory: res.isError, bookCategory: res.data };
// };
//
// export const useDemoCreateBookCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   const res = useMutation((data: Record<string, any>) => {
//     return api.apis.PinChats.createMany({ data });
//   }, getQueryOptions(queryClient, options, secondaryOptions));
//
//   return {
//     ...res,
//     isLoadingCreateBookCategory: res.isLoading,
//     isErrorCreateBookCategory: res.isError,
//     createMany: res.mutate,
//   };
// };
//
// export const useDemoCreateBookCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   const res = useMutation((data: Record<string, any>) => {
//     return api.apis.PinChats.createOne({ data });
//   }, getQueryOptions(queryClient, options, secondaryOptions));
//   return {
//     ...res,
//     isLoadingCreateBookCategory: res.isLoading,
//     isErrorCreateBookCategory: res.isError,
//     createOne: res.mutate,
//   };
// };
//
// export const useDemoUpdateBookCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   const res = useMutation((props: Record<string, any>) => {
//     return api.apis.PinChats.updateMany(props);
//   }, getQueryOptions(queryClient, options, secondaryOptions));
//   return {
//     ...res,
//     isLoadingUpdateBookCategory: res.isLoading,
//     isErrorUpdateBookCategory: res.isError,
//     updateMany: res.mutate,
//   };
// };
//
// export const useDemoUpdateBookCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   const res = useMutation((props: Record<string, any>) => {
//     return api.apis.PinChats.updateOne(props);
//   }, getQueryOptions(queryClient, options, secondaryOptions));
//   return {
//     ...res,
//     isLoadingUpdateBookCategory: res.isLoading,
//     isErrorUpdateBookCategory: res.isError,
//     updateOne: res.mutate,
//   };
// };
//
// export const useDemoDeleteBookCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   const res = useMutation((where: Record<string, any>) => {
//     return api.apis.PinChats.deleteMany({ where });
//   }, getQueryOptions(queryClient, options, secondaryOptions));
//   return {
//     ...res,
//     isLoadingDeleteBookCategory: res.isLoading,
//     isErrorDeleteBookCategory: res.isError,
//     deleteMany: res.mutate,
//   };
// };
//
// export const useDemoDeleteAllBookCategories = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   const res = useMutation(() => {
//     return api.apis.PinChats.deleteAll();
//   }, getQueryOptions(queryClient, options, secondaryOptions));
//   return {
//     ...res,
//     isLoadingDeleteAllBookCategory: res.isLoading,
//     isErrorDeleteAllBookCategory: res.isError,
//     deleteMany: res.mutate,
//   };
// };
//
// export const useDemoDeleteBookCategory = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
//   const api = useApi();
//   const queryClient = useQueryClient();
//   const res = useMutation((where: Record<string, any> | number | string) => {
//     return api.apis.Chat.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
//   }, getQueryOptions(queryClient, options, secondaryOptions));
//   return {
//     ...res,
//     isLoadingDeleteBookCategory: res.isLoading,
//     isErrorDeleteBookCategory: res.isError,
//     deleteOne: res.mutate,
//   };
// };
