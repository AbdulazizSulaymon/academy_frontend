import React from 'react';

import { Props } from '@src/types';
import { Typography } from 'antd';

export const Title = ({ className, children, ...props }: Props) => {
  return (
    <Typography.Title level={3} className={'mb-2' + className} {...props}>
      {children}
    </Typography.Title>
  );
};
