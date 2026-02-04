import dynamic from 'next/dynamic';

export const DynamicProviders = dynamic(() => import('./providers-wrapper'), {
  ssr: false,
  loading: () => <span></span>,
});
