import { useStore } from '@src/stores/stores';
import { StoresInterface } from '@src/types';

export const usePickStore = (name: keyof StoresInterface) => {
  const store = useStore();

  return store[name];
};
