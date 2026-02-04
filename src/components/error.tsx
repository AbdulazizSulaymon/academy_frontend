import { css } from '@emotion/react';
import { Button, Result, Typography } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdErrorOutline } from 'react-icons/md';

export const ErrorTitle = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center gap-1 justify-center text-red-400 my-3">
        <MdErrorOutline />
        <Typography className="text-red-400">{t('Malumot yuklanishda xatolik yuz berdi!') || ''}</Typography>
      </div>
    </>
  );
};

function Error({
  status = '500',
  title = 'Xatolik',
  subtitle = 'Malumot yuklanishda xatolik yuz berdi!',
  className = '',
}: {
  status?: ResultStatusType;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <Result
      className={'rounded  ' + className}
      status={status}
      title={t(title)}
      subTitle={t(subtitle)}
      css={css`
        .ant-result-content {
          margin-top: 0;
          display: flex;
          justify-content: center;
          background: transparent;
        }
      `}
    >
      <Button onClick={() => window.location.reload()} type={'primary'}>
        {t('Sahifani qayta yuklash')}
      </Button>
    </Result>
  );
}

export default Error;
