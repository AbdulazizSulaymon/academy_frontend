import { createContext, useContext } from 'react';
import { StoresInterface } from '@src/types';
import { LayoutStore } from './layout-store';
import { BotStore } from '@src/stores/bot-store';

const getStores = (): StoresInterface => {
  const layoutStore = new LayoutStore();
  const botStore = new BotStore();

  return {
    layoutStore,
    botStore,
  };
};

const stores = getStores();

const StoreContext = createContext<StoresInterface>(stores);

const StoreProvider = ({ children }: { children: any }) => {
  return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};

const useStore = () => {
  return useContext(StoreContext);
};

export { getStores, StoreContext, StoreProvider, useStore };
