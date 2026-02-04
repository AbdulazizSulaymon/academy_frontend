import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateErrorLog } from '@src/queries/models/error-log';
import { useApi } from '@src/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryOptions } from '@src/queries';

const ErrorFallback = ({ error }: { error: any }) => {
  const { t } = useTranslation();

  const api = useApi();
  const createErrorLog = async (data: Record<string, any>) => {
    try {
      const res = await api.apis.ErrorLog.createOne({ data });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (document.URL.includes('localhost:')) return;
    console.log({ text: error?.message, path: location.pathname, desc: error?.stack });
    createErrorLog({ text: error?.message, path: location.pathname, desc: error?.stack });
  }, []);

  console.log(error);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Result
        status="500"
        title="Oops!"
        subTitle={
          <div>
            {t('Bizda vaqtincha nosozlik mavjud. Biz buning ustida ishlayapmiz')}
            <pre>
              {t('Xatolik')}: {JSON.stringify(error)}
            </pre>
          </div>
        }
        extra={[
          // <Button type="primary" onClick={() => location.replace('/')} key={'home'}>
          //   {t('Bosh sahifa')}
          // </Button>,
          <Button onClick={() => location.reload()} key={'reload'}>
            {t('Qayta yuklash')}
          </Button>,
        ]}
      />
    </div>
  );
};

const logError = (error: Error, info: { componentStack?: string | null; digest?: string | null }) => {
  // Do something with the error, e.g. log to an external API
  console.log('error boundary', error);

  if (document.URL.includes('localhost:')) return;
  // const trace = parse(error);
  // console.log(trace[0]);

  // mvdApi
  //     .post('wanted/api/v1/frontLog', {
  //         title: error.name,
  //         description: ${error.message}, functionName: ${trace[0].getFunctionName()} ,
  //         url: document.URL,
  //         isProduction: document.URL.includes('stm.ssd.uz'), // process.env.NODE_ENV !== 'development'
  //         project: menu?.lable || 'main'
  //     })
  //     .then((res) => {
  //         console.log(res);
  //     })
  //     .catch((err) => {
  //         console.error(err);
  //     });
};

export class ErrorBoundaryContainer extends React.Component {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // @ts-ignore
      return <ErrorFallback error={this.state.error} />;
    }

    // Return children components in case of no error

    // @ts-ignore
    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}
