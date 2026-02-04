import { css } from '@emotion/react';
import { Box } from '@components/box';
import { Button, Result } from 'antd';
import { Link } from '@components/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const Error403Content = () => {
  const { t } = useTranslation();
  return (
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Box className={'shadow-none'}>
        <Result
          status="403"
          title={t('Taqiqlangan')}
          subTitle={t('Kechirasiz, sizda bu sahifaga kirishga ruxsat yo‘q.')}
          extra={
            <Link href={'/'}>
              <Button type="primary">{t('Bosh sahifa')}</Button>
            </Link>
          }
        />
      </Box>
    </div>
  );
};
