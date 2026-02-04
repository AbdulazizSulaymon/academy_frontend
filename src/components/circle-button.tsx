import { Button } from 'antd';
import React from 'react';

import { Props } from '@src/types';

function CircleButton({ children, className, ...props }: Props) {
  return (
    <Button
      type="primary"
      shape={'circle'}
      className={'flex justify-center items-center border-0 ' + className}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CircleButton;
