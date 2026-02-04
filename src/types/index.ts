import { AxiosResponse } from 'axios';
import { PropsWithChildren, ReactElement, ReactNode } from 'react';

import { ModelsNames } from '@api/models';
import type { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface LayoutStoreInterface {
  collapsed: boolean;
  setCollapsed: Function;
  lang: string;
  setLang: Function;
  user: Record<string, any> | null | undefined;
  setUser: (data: Record<string, any> | null) => void;
  permissions: Record<string, any>;
  roles: Record<string, any>;
  rolesTree: Record<string, any>[];
  setCheckDevice: (device: boolean) => void;
  shopId: string | undefined;
  setShopId: (shopId: string) => void;
}

export interface AddressType {
  id: string;
  name: string;
  address: string;
  phone?: string;
  isDefault?: boolean;
  lat?: number;
  lng?: number;
}

export interface BotStoreInterface {
  orders: OrdersType;
  setOrders: Function;
  updateOrder: Function;
  lang: string;
  setLang: Function;
  user: Record<string, any> | null;
  setUser: Function;
  tg: any | null;
  setTg: Function;
  searchText: string;
  setSearchText: Function;
  shopId: null | string;
  setShopId: Function;
  recentlyViewed: Record<string, any>[];
  addToRecentlyViewed: (product: Record<string, any>) => void;
  clearRecentlyViewed: () => void;
  addresses: AddressType[];
  addAddress: (address: Omit<AddressType, 'id'>) => void;
  updateAddress: (id: string, address: Partial<AddressType>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export interface StoresInterface {
  layoutStore: LayoutStoreInterface;
  botStore: BotStoreInterface;
}

export interface apiResponseInterface {
  status: string | number;
  description?: string;
  type?: string;
}

export type OrderType = { count: number; product: Record<string, any> };
export type OrdersType = Record<number, OrderType>;

export interface functionFixConfig {
  permission: string;
  info?: boolean;
  param?: string;
  paramArray?: boolean;
  body?: string;
  bodyArray?: boolean;
  query?: string;
  header?: string;
  service?: string;
  // serviceAccess: string;
  resp?: boolean;
  responses?: number;
  fixedPath: string;
  admin?: boolean;
}

export type fixedConfigInterface = {
  [name in ReqNames]?: functionFixConfig;
};

export enum ReqNamesType {
  'count' = 'POST',
  'exist' = 'POST',
  'findOne' = 'POST',
  'findMany' = 'POST',
  'createOne' = 'POST',
  'createMany' = 'POST',
  'createList' = 'POST',
  'updateOne' = 'PATCH',
  'updateMany' = 'PATCH',
  'updateList' = 'PATCH',
  'updateAll' = 'PATCH',
  'deleteOne' = 'POST',
  'deleteMany' = 'POST',
  'deleteAll' = 'POST',
}

export enum ReqNames {
  'count' = 'count',
  'exist' = 'exist',
  'findOne' = 'findOne',
  'findMany' = 'findMany',
  'createOne' = 'createOne',
  'createMany' = 'createMany',
  'createList' = 'createList',
  'updateOne' = 'updateOne',
  'updateMany' = 'updateMany',
  'updateList' = 'updateList',
  'updateAll' = 'updateAll',
  'deleteOne' = 'deleteOne',
  'deleteMany' = 'deleteMany',
  'deleteAll' = 'deleteAll',
}

export type TypeReqNames = { [key in ReqNames]: string };
export type TypeReqName = keyof TypeReqNames;

export enum ReqType {
  'POST' = 'post',
  'GET' = 'get',
  'DELETE' = 'delete',
  'PUT' = 'put',
  'PATCH' = 'patch',
}

export type ApiFunction = (data?: Record<string, unknown>) => Promise<AxiosResponse<any, any> & { error?: unknown }>;
export type ApiFunctions = Record<TypeReqName, ApiFunction>;
export type ApiFunctionsList = Record<ModelsNames, ApiFunctions>;

export type Props = PropsWithChildren & Record<string, unknown>;

export type CodeProps = { code: string; language: string; inline?: boolean; title?: string };
