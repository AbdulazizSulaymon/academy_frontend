import { css } from '@emotion/react';
import queryString from 'query-string';
//@ts-ignore
import { AlignType, FixedType } from 'rc-table/es/interface';
import React from 'react';
import clsx from 'clsx';
import { getImagePath, priceFormatter } from '@utils/util';

import { Props } from '../../types';

export const Numeric = ({ children, className, ...props }: Props) => {
  return (
    <span
      className={clsx({
        'font-bold ': true,
        // 'text-center ': true,
        'block ': true,
        className,
      })}
      css={css`
        margin: 0 auto;
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export const numericColumn = (props: Record<string, unknown> = {}) => ({
  title: '#',
  key: 'numberOfRow',
  width: 50,
  fixed: 'left' as FixedType,
  align: 'center' as AlignType,
  render: (src: string, item: any, index: number) => {
    const search = queryString.parse(location.search, { parseNumbers: true }) as {
      pageNumber: number;
      pageSize: number;
    };
    const pageNumber = search.pageNumber || 1;
    const pageSize = search.pageSize || 10;
    return <Numeric>{priceFormatter((pageNumber - 1) * pageSize + index + 1)}</Numeric>;
  },
  ...props,
});

export const defaultShopLogo = 'https://cdn-icons-png.freepik.com/512/6735/6735487.png';
export const Avatar = ({ src, defaultSrc }: { src?: string; defaultSrc?: string }) => {
  return (
    <img
      src={getImagePath(src, defaultSrc || defaultShopLogo)}
      height={40}
      width={40}
      className={'rounded object-cover'}
    />
  );
};
