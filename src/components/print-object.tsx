import React, { useMemo } from 'react';
import { Props } from '@src/types';
import { Col, Row, Typography } from 'antd';
import { sortBy } from 'lodash';

export const PrintObject = ({ obj, ...props }: Props & { obj: Record<string, any> }) => {
  const params = useMemo(() => sortBy(Object.entries(obj || {}), [(e) => e[0]]), [obj]);

  return (
    <div {...props}>
      <Row gutter={[16, 16]}>
        {params.map(([key, value], index) => (
          <Col key={key} xs={24} md={12} lg={8}>
            <div className={'shadow-md p-2 rounded h-full'}>
              <Typography className={'font-bold'}>{key}</Typography>
              <pre className={'m-0'}>{JSON.stringify(value, undefined, 4)}</pre>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
