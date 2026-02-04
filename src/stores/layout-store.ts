import { configure, makeAutoObservable, reaction } from 'mobx';
import { LayoutStoreInterface } from '../types';
import { usePickStore } from '@hooks/use-pick-store';

configure({ enforceActions: 'never' });

export const buildTree = (roles: Record<string, any>[] = [], parentId: string | null = null) => {
  const result = [];
  for (const role of roles) {
    if (role.parentId === parentId) {
      const children = buildTree(roles, role.id);
      if (children.length) {
        role.children = children;
      } else role.children = [];
      result.push(role);
    }
  }
  return result;
};

export class LayoutStore implements LayoutStoreInterface {
  collapsed: boolean = true;
  lang: string = 'uz';
  user: Record<string, any> | null | undefined = undefined;
  permissions: Record<string, any> = {}; // Changed from array to object
  roles: Record<string, any> = {}; // Changed from array to object
  rolesTree: Record<string, any>[] = [];
  checkDevice: boolean = false;
  shopId: string | undefined = undefined;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.shopId,
      (shopId) => {
        localStorage?.setItem('shopId', `${shopId}`);
      },
    );
  }

  setCollapsed: Function = (isCollapsed: boolean) => {
    this.collapsed = isCollapsed;
    localStorage?.setItem('sidebar', `${isCollapsed}`);
  };

  setLang: Function = (lang: string) => {
    this.lang = lang;
    localStorage?.setItem('lang', `${lang}`);
  };

  setPermissions: Function = (permissions: Record<string, any>) => {
    this.permissions = permissions?.reduce((acc: Record<string, any>, role: Record<string, any>) => {
      if (role.permission) {
        role.permission.forEach((p: Record<string, any>) => {
          acc[p.name] = p;
        });
      }
      return acc;
    }, {});
  };

  setUser = (data: Record<string, any> | null) => {
    this.user = data;

    if (data?.lang) this.setLang(data?.lang);

    this.permissions = data?.roles?.reduce((acc: Record<string, any>, role: Record<string, any>) => {
      if (role.permission) {
        role.permission.forEach((p: Record<string, any>) => {
          acc[p.name] = p;
        });
      }
      return acc;
    }, {});

    this.roles = data?.roles?.reduce((acc: Record<string, any>, role: Record<string, any>) => {
      acc[role.name.toLowerCase()] = role;
      return acc;
    }, {});

    this.rolesTree = buildTree(data?.roles || []);
  };

  setCheckDevice = (checkDevice: boolean) => {
    this.checkDevice = checkDevice;
  };

  setShopId = (shopId: string) => {
    this.shopId = shopId;
  };
}

export const useLayoutStore = () => usePickStore('layoutStore') as LayoutStoreInterface;
