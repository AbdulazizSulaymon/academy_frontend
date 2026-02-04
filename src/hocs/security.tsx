import { useInterval } from 'ahooks';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { Props } from '@src/types';

import { useHideLogs } from '@hocs/use-hide-logs';
import { isProduction, lockKey } from '@data/const';
import { useApi } from '@src/api';

const Security = observer(({ children }: Props) => {
  const api = useApi();
  const [isLock, setIsLock] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // useHideLogs();

  // useInterval(() => {
  //   if (isProduction) console.clear();
  // }, 1000);

  // useInterval(() => {
  //   const t0 = Date.now();
  //   eval('debugger');
  //   const t1 = Date.now();
  //   console.log(`DevTools ${t0 === t1 ? 'is not' : 'is'} open.`);
  //   if (t0 !== t1) window.location.replace('https://www.algorismic.uz');
  // }, 3000);

  useEffect(() => {
    if (isProduction && localStorage.getItem('key-lock') != lockKey) setIsLock(true);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isLock) return;

    api.lockNetwork();
  }, [api, isLock]);

  return <>{isReady ? children : null}</>;
});

export default React.memo(Security);
