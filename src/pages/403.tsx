import React from 'react';
import { Link } from '@components/link';
import { css } from '@emotion/react';
import { Button, Result } from 'antd';
import { Box } from '@components/box';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { Error403Content } from '@components/error-403';

const Error403 = () => {
  return (
    <DynamicProviders>
      <Error403Content />
    </DynamicProviders>
  );
};

export default Error403;
