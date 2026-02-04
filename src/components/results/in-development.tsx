import React from 'react';

import { Lottie } from '@components/lottie/lottie';
import { Title } from '@components/title';

export const InDevelopment = ({ title }: { title?: string }) => {
  return (
    <div className={'text-center py-10'}>
      <Lottie link={'/lotties/green guy working.lottie'} height={400} width={400} />
      {/*<img*/}
      {/*  src="/in-development2.svg"*/}
      {/*  alt=""*/}
      {/*  css={css`*/}
      {/*    width: 400px;*/}
      {/*    max-width: 80%;*/}
      {/*  `}*/}
      {/*  className={'mb-4'}*/}
      {/*/>*/}
      <Title>{title || 'Bu sahifa ishlab chiqish jarayonida'}</Title>
    </div>
  );
};
