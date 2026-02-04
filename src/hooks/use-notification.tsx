import { isAxiosError } from 'axios';
import { App } from 'antd';

export const useNotification = () => {
  const { notification } = App.useApp();

  const notifyInfo = (title: string) => {
    notification.info({ message: title });
  };

  const notifyWarning = (title: string) => {
    notification.warning({ message: title });
  };

  const notifySuccess = (title?: string | null) => {
    notification.success({ message: title || 'Successfully saved!' });
  };

  const notifyError = (error: Error | null | string) => {
    if (isAxiosError(error)) {
      console.log('isAxiosError true');
      const errObj = error.response?.data as { error_msg?: string | string[]; message?: string | string[] };
      const message = errObj.error_msg || errObj.message || error.message || 'Xatolik yuz berdi!';

      void notification.error({
        message: (Array.isArray(message) ? message.at(-1) : message) || 'An error occurred!',
      });
    } else if (typeof error === 'string') {
      notification.error({
        message: error,
      });
    }
  };

  const getErrorText = (error: Error | null | string | unknown) => {
    if (isAxiosError(error)) {
      const errObj = error.response?.data as { error_msg?: string | string[]; message?: string | string[] };
      const message = errObj.error_msg || errObj.message || error.message || 'Xatolik yuz berdi!';

      return Array.isArray(message) ? message.at(-1) : message;
    } else if (typeof error === 'string') return error;
    return 'Xatolik yuz berdi';
  };

  return { notification, notifyInfo, notifyWarning, notifySuccess, notifyError, getErrorText };
};
