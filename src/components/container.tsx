import clsx from 'clsx';

import { Props } from '@src/types';
import React from 'react';
import { css } from '@emotion/react';

export const Container = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx('px-3 mx-auto max-w-6xl', className)} {...props}>
      {children}
    </div>
  );
};

export const ContainerMax = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: string }) => {
  return (
    <section
      className={clsx({
        'px-2 2xl:px-32': true,
        [className as string]: className,
      })}
      css={css`
        max-width: 1700px;
        margin: 0 auto;
      `}
      {...props}
    >
      {children}
    </section>
  );
};
