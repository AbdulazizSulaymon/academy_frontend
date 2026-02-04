import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { baseBackendUrl } from '@data/const';
import { join } from '@fireflysemantics/join';

/**
 * Device type'ni aniqlash
 */
const getDeviceType = (): 'MOBILE' | 'TABLET' | 'DESKTOP' | 'UNKNOWN' => {
  if (typeof window === 'undefined') return 'UNKNOWN';

  const width = window.innerWidth;
  if (width < 768) return 'MOBILE';
  if (width < 1024) return 'TABLET';
  return 'DESKTOP';
};

/**
 * Umumiy PageView hook
 * Sahifa o'zgarganda avtomatik ravishda PageView yaratadi
 */
export const usePageView = (options?: {
  enabled?: boolean;
  clientId?: string;
  additionalData?: Record<string, any>;
}) => {
  const router = useRouter();

  const previousPathRef = useRef<string>('');
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    // Agar disabled bo'lsa, hech narsa qilmaymiz
    if (optionsRef.current?.enabled === false) return;

    const trackPageView = async () => {
      if (typeof window === 'undefined') return;

      const currentPath = router.asPath;

      // Agar sahifa o'zgarmagan bo'lsa (refresh), hech narsa qilmaymiz
      if (currentPath === previousPathRef.current) return;

      previousPathRef.current = currentPath;

      // PageView ma'lumotlarini yig'amiz
      const pageUrl = currentPath;
      const userAgent = navigator.userAgent || undefined;
      const deviceType = getDeviceType();

      // PageView yaratish - to'g'ridan-to'g'ri axios bilan
      try {
        await axios.post(
          join(baseBackendUrl, '/api/pageView/create'),
          {
            data: {
              pageUrl,
              viewCount: 1,
              userAgent: userAgent || undefined,
              deviceType,
              clientId: optionsRef.current?.clientId || undefined,
              // IP, country, address backendda aniqlanadi yoki qo'shimcha ma'lumot sifatida yuboriladi
              ...optionsRef.current?.additionalData,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          },
        );
      } catch (error) {
        // Xatoni console'ga chiqaramiz, lekin foydalanuvchiga ko'rsatmaymiz
        console.warn('PageView yaratishda xatolik:', error);
      }
    };

    // Dastlabki track
    trackPageView();

    // Route o'zgarganda track qilish
    router.events?.on('routeChangeComplete', trackPageView);

    return () => {
      router.events?.off('routeChangeComplete', trackPageView);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, router.events]);
};
