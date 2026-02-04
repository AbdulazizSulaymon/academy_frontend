import { usePickStore } from '@hooks/use-pick-store';
import { AddressType, BotStoreInterface, OrderType, OrdersType } from '@src/types';
export type { AddressType };
import { configure, makeAutoObservable, reaction, toJS } from 'mobx';
import { AxiosInstance } from 'axios';
import { getBaseApi, publicApi } from '@src/api';

configure({ enforceActions: 'never' });

export class BotStore implements BotStoreInterface {
  orders: OrdersType = {};
  lang: string = 'uz';
  user: Record<string, any> | null = null;
  tg = null;
  searchText = '';
  shopId: string | null = null;
  recentlyViewed: Record<string, any>[] = [];
  addresses: AddressType[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  loadFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const recentlyViewed = localStorage.getItem('recentlyViewed');
        if (recentlyViewed) this.recentlyViewed = JSON.parse(recentlyViewed);
        const addresses = localStorage.getItem('addresses');
        if (addresses) this.addresses = JSON.parse(addresses);
      } catch (e) {
        console.error('Failed to load from storage', e);
      }
    }
  };

  addToRecentlyViewed = (product: Record<string, any>) => {
    const exists = this.recentlyViewed.findIndex((p) => p.id === product.id);
    if (exists !== -1) {
      this.recentlyViewed.splice(exists, 1);
    }
    this.recentlyViewed.unshift(product);
    if (this.recentlyViewed.length > 20) {
      this.recentlyViewed = this.recentlyViewed.slice(0, 20);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    }
  };

  clearRecentlyViewed = () => {
    this.recentlyViewed = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('recentlyViewed');
    }
  };

  addAddress = (address: Omit<AddressType, 'id'>) => {
    const newAddress: AddressType = {
      ...address,
      id: Date.now().toString(),
    };
    if (address.isDefault) {
      this.addresses = this.addresses.map((a) => ({ ...a, isDefault: false }));
    }
    if (this.addresses.length === 0) {
      newAddress.isDefault = true;
    }
    this.addresses.push(newAddress);
    this.saveAddresses();
  };

  updateAddress = (id: string, address: Partial<AddressType>) => {
    const index = this.addresses.findIndex((a) => a.id === id);
    if (index !== -1) {
      if (address.isDefault) {
        this.addresses = this.addresses.map((a) => ({ ...a, isDefault: false }));
      }
      this.addresses[index] = { ...this.addresses[index], ...address };
      this.saveAddresses();
    }
  };

  deleteAddress = (id: string) => {
    this.addresses = this.addresses.filter((a) => a.id !== id);
    if (this.addresses.length > 0 && !this.addresses.some((a) => a.isDefault)) {
      this.addresses[0].isDefault = true;
    }
    this.saveAddresses();
  };

  setDefaultAddress = (id: string) => {
    this.addresses = this.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    this.saveAddresses();
  };

  saveAddresses = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('addresses', JSON.stringify(this.addresses));
    }
  };

  setOrders: Function = (orders: OrdersType) => {
    this.orders = orders;
  };

  updateOrder: Function = (id: number, order: OrderType) => {
    this.orders[id] = order;
    if (this.shopId && this.user?.id)
      publicApi.instance?.post('api/cart/createOrUpdate', {
        clientId: this.user.id,
        shopId: this.shopId,
        orders: this.orders,
      });
  };

  setLang: Function = (lang: string) => {
    this.lang = lang;
  };

  setUser: Function = (user: Record<string, any>) => {
    this.user = user;
  };

  setTg: Function = (tg: any) => {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    console.log('------ tg ------');
    console.log(tg?.initDataUnsafe);
    this.tg = tg;
  };

  setSearchText: Function = (value: string) => {
    this.searchText = value;
  };

  setShopId = (shopId: string) => {
    this.shopId = shopId;
  };
}

export const useBotStore = () => usePickStore('botStore') as BotStoreInterface;
