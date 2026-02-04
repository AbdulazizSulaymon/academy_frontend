import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const useFormatDate = () => {
  const { t } = useTranslation();

  const formatDate = useCallback(
    (date: string | Date): string => {
      let dateDayjs;

      // Check if the string can be treated as a Unix timestamp (seconds)
      if (typeof date === 'string' && /^\d+$/.test(date)) {
        // Convert Unix timestamp (seconds) in string format to milliseconds
        dateDayjs = dayjs.unix(Number(date));
      } else {
        // Otherwise, assume it's a date string or Date object
        dateDayjs = dayjs(date);
      }

      if (dateDayjs.isToday()) {
        return `${t('Bugun')} ${dateDayjs.format('HH:mm')}`;
      } else if (dateDayjs.isYesterday()) {
        return `${t('Kecha')} ${dateDayjs.format('HH:mm')}`;
      } else {
        return dateDayjs.format('DD MMM HH:mm');
      }
    },
    [t],
  );

  return { formatDate };
};
