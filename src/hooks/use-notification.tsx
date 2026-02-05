import { isAxiosError } from 'axios';
import { notification } from 'antd';

export const useNotification = () => {
  const notifyInfo = (title: string, description?: string) => {
    notification.info({ message: title, description });
  };

  const notifyWarning = (title: string, description?: string) => {
    notification.warning({ message: title, description });
  };

  const notifySuccess = (title?: string | null, description?: string) => {
    notification.success({ message: title || 'Successfully saved!', description });
  };

  const notifyError = (error: Error | null | string) => {
    if (isAxiosError(error)) {
      console.log('isAxiosError true');
      const errObj = error.response?.data as { error_msg?: string | string[]; message?: string | string[] };
      const message = errObj.error_msg || errObj.message || error.message || 'Xatolik yuz berdi!';

      notification.error({
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

  return {
    notification,
    notifyInfo,
    notifyWarning,
    notifySuccess,
    notifyError,
    getErrorText
  };
};
