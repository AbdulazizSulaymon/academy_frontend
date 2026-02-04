import { Spin } from 'antd';
import NextRouter from 'next/router';
import NProgress from 'nprogress';
import React, { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  return (
    <div
      className={
        'h-[100vh] w-full fixed top-0 left-0 z-[2000] bg-[#ffffff] dark:bg-slate-900 flex flex-col justify-center items-center gap-7'
      }
    >
      <img src={`/logo/light/logo.svg`} alt="" className={'max-w-[150px] block dark:hidden'} />
      <img src={`/logo/dark/logo.svg`} alt="" className={'max-w-[150px] hidden dark:block'} />
      <Spin size={'large'} />
    </div>
  );
};

let isInitedRoutes = false;
let lastUrl = '';

export const LoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (process.env.NODE_ENV === 'development') {
    //   setupLocatorUI();
    // }
    if (isInitedRoutes) return;
    NextRouter.events.on('routeChangeStart', (url) => {
      if (url.split('?')[0] === lastUrl) return;

      // setIsLoading(true);
      NProgress.start();
      lastUrl = url.split('?')[0];
    });
    NextRouter.events.on('routeChangeComplete', () => {
      // setIsLoading(false);
      NProgress.done();
    });
    NextRouter.events.on('routeChangeError', () => {
      // setIsLoading(false);
      NProgress.done();
    });

    isInitedRoutes = true;
  }, []);

  useEffect(() => {
    NextRouter.ready(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? <LoadingScreen /> : null}
      {children}
    </>
  );
};
