import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAutoNavigate = (path: string) => {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, []);
};
