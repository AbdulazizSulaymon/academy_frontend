import axios, { AxiosInstance } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { ApiFunctions, ApiFunctionsList, ReqNamesType, ReqType, TypeReqName, fixedConfigInterface } from '../types';
import { apiCoreFunctions, toCamelCase } from './const';
import { Models, ModelsNames, models } from './models';
import { baseBackendUrl, encryptKey, tokenName } from '@data/const';
import Security from '@hocs/security';

export const encryptData = (data?: any) =>
  data ? { payload: CryptoJS.AES.encrypt(JSON.stringify(data), encryptKey).toString() } : undefined;

export const getToken = (tokenFieldName = tokenName): string => {
  return typeof window !== 'undefined' ? localStorage.getItem(tokenFieldName) || '' : '';
};

export const getBaseApi = (baseUrl = baseBackendUrl, tokenFieldName = tokenName) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken(tokenFieldName)}`,
    },
  });
};

export class Api {
  private isLock = false;
  private readonly showApis: boolean;
  private coreFunctions: fixedConfigInterface;

  instance: AxiosInstance;
  tokenName: string;
  baseUrl: string;
  loginUrl: string;
  // @ts-ignore
  apis: ApiFunctionsList = {};
  models: Models;

  constructor(
    models: Models,
    coreFunctions: fixedConfigInterface,
    baseUrl: string,
    config: Record<string, unknown> = {},
    isPublic = false,
  ) {
    this.showApis = !!config.showApis;
    this.tokenName = (config.tokenName as string) || 'token';
    this.loginUrl = (config.loginUrl as string) || '/login';
    this.baseUrl = baseUrl;
    this.models = models;
    this.coreFunctions = coreFunctions;
    this.instance = this.createInstance(isPublic);
    this.generateApiFunctions();
  }

  private createInstance(isPublic: boolean): AxiosInstance {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        ...(isPublic ? {} : { Authorization: `Bearer ${this.getToken()}` }),
      },
    });
  }

  lockNetwork() {
    console.log('lockNetwork');
    this.isLock = true;
    this.generateApiFunctions();
  }

  getToken(): string {
    return typeof window !== 'undefined' ? localStorage.getItem(this.tokenName) || '' : '';
  }

  logOut() {
    console.clear();
    // const saveFields = ['key-lock', 'modelForm', 'table-columns-Translations'];
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem('user');
    localStorage.removeItem('shopId');
    this.instance = this.createInstance(false);
  }

  async login(data: Record<string, unknown>) {
    const res = await this.instance.post(this.loginUrl, data);
    this.signInSuccess(res.data.access_token, 'user');
    return res;
  }

  private signInSuccess(token: string, user: any) {
    localStorage.setItem(this.tokenName, token);
    localStorage.setItem('user', user);
    this.instance = this.createInstance(false);
  }

  private generateApiFunctions() {
    this.apis = Object.values(this.models).reduce((res: ApiFunctionsList, model) => {
      res[model.name as ModelsNames] = Object.keys(this.coreFunctions).reduce((obj, f) => {
        obj[f as TypeReqName] = (data?: Record<string, any>) => {
          if (this.isLock && data) {
            data = encryptData(data);
          }
          return this.instance[ReqType[ReqNamesType[f as TypeReqName]]](
            `api/${toCamelCase(model.name)}/${this.coreFunctions[f as TypeReqName]?.fixedPath}`,
            data,
          );
        };
        return obj;
      }, {} as ApiFunctions);
      return res;
    }, {} as ApiFunctionsList);

    if (this.showApis) console.log('Generated APIs:', this.apis);
  }
}

export const publicApi = new Api({}, apiCoreFunctions, baseBackendUrl, { showApis: false }, true);

export const ApiContext = React.createContext<Api | null>(null);
export const useApi = (): Api => useContext(ApiContext) || publicApi;

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, setApi] = useState<Api | null>(null);

  useEffect(() => {
    setApi(
      new Api(models, apiCoreFunctions, baseBackendUrl, { showApis: false, tokenName, loginUrl: 'api/auth/login' }),
    );
  }, []);

  return api ? (
    <ApiContext.Provider value={api}>
      <Security>{children}</Security>
    </ApiContext.Provider>
  ) : null;
};
