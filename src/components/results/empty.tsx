import { css } from '@emotion/react';
import React from 'react';

import { Lottie } from '@components/lottie/lottie';
import { Title } from '@components/title';

export const Empty = ({ title }: { title?: string }) => {
  return (
    <div className={'text-center py-10'}>
      <Lottie link={'/lotties/Animation - 1701076641495.lottie'} width={600} />

      {/*<img*/}
      {/*  src="/empty.png"*/}
      {/*  alt=""*/}
      {/*  css={css`*/}
      {/*    width: 400px;*/}
      {/*    max-width: 80%;*/}
      {/*  `}*/}
      {/*  className={'mb-4'}*/}
      {/*/>*/}
      <Title
        css={css`
          margin-top: 25px;
        `}
      >
        {title || "Ma'lumotlar mavjud emas"}
      </Title>
    </div>
  );
};
