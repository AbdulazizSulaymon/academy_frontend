import { join } from '@fireflysemantics/join';
import dayjs from 'dayjs';
import { get, omitBy } from 'lodash';
import { Options } from 'prettier';
import parserTypeScript from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';
import queryString from 'query-string';
import { DefaultOptionType } from 'rc-select/es/Select';

import { baseBackendUrl } from '@data/const';
import { toast } from 'react-toastify';

type Item = { id: string } & Record<string, any>;
export const prettierFormat = (content: string, options: Options = {}) => {
  try {
    return prettier.format(content, {
      parser: 'typescript',
      plugins: [parserTypeScript],
    });
  } catch (e) {
    return content;
  }
};

export const priceFormatter = (price: number) =>
  new Intl.NumberFormat('uz-Uz', {
    maximumFractionDigits: 5,
  }).format(price) || '0';

export const priceFormatter2 = (price?: number) => {
  if (!price) return '';
  const str = price.toString();
  const index = str.indexOf('.');
  if (index > -1) return new Intl.NumberFormat('uz-Uz').format(+str.slice(0, index)) + str.slice(index);
  else return new Intl.NumberFormat('uz-Uz').format(price);
};

type LabelFunction = (record: Record<string, any>) => string;
export const makeOptions = (data: Record<string, any> | undefined, label: string | LabelFunction, value = 'id') => {
  return (
    data?.map((item: Record<string, any>) => {
      return {
        label: typeof label === 'function' ? label(item) : item[label],
        value: item[value],
      };
    }) || []
  );
};

export const clearObject = (obj: Record<string, any>) => omitBy(obj, (v) => v == undefined || v == null);

export const getSearch = (options?: Record<string, any>) =>
  queryString.parse(document && document?.location?.search, options) || {};

export const filterOption = (input: string, option: DefaultOptionType | undefined) =>
  typeof option?.label === 'string' ? option?.label.includes(input) : false;

export const filterSort = (optionA: DefaultOptionType, optionB: DefaultOptionType) =>
  typeof optionA?.label === 'string' && typeof optionB?.label === 'string'
    ? (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    : typeof optionA?.label === 'number' && typeof optionB?.label === 'number'
    ? optionA?.label - optionB?.label
    : -1;

export const defaultDateFormat = (date: string, template?: string) =>
  date ? dayjs(date).format(template || 'DD-MM-YYYY') : '';

export const defaultDateTimeFormat = (date: string, template?: string) =>
  dayjs(date).format(template || 'DD.MM.YYYY HH:mm');

export const datesToDayjs = (data: Record<string, any> | undefined, names: string[]) => {
  if (!data) return {};
  const obj = { ...data };
  for (const name of names) {
    obj[name] = obj[name] ? dayjs(obj[name]) : undefined;
  }

  return obj;
};

export const getUserFullName = (data?: Record<string, any>) => {
  return data?.firstName || data?.lastName
    ? data
      ? `${data?.firstName || ''} ${data?.lastName || ''} `
      : ''
    : data
    ? `${data?.phone || ''}`
    : '';
};

export const getImagePath = (image?: string, defaultImage = '') => {
  if (!image) return defaultImage;
  if (image.startsWith('data:')) return image;
  if (image.startsWith('uploads')) return join(baseBackendUrl, image);
  return image;
};

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export const createWrapper = async (callback: () => any) => {
  try {
    const data = await callback();
    toast.success("Muvaffaqiyatli qo'shildi");
  } catch (error) {
    console.log({ error });
    toast.error('Xatolik yuz berdi');
  }
};

export const updateWrapper = async (callback: () => any) => {
  try {
    const data = await callback();
    toast.success("Muvaffaqiyatli o'zgartirildi!");
  } catch (error) {
    console.log({ error });
    toast.error('Xatolik yuz berdi');
  }
};

export const getCreateSecondaryOptions = (
  key: any[],
  successToast = 'Muvaffaqiyatli saqlandi',
  errorToast = "Xatolik sodir bo'ldi",
) => ({
  invalidateQueries: key,
  successToast,
  errorToast,
});

export const getUpdateSecondaryOptions = (
  key: any[],
  successToast = `Muvaffaqiyatli o'zgartirildi`,
  errorToast = "Xatolik sodir bo'ldi",
) => ({
  invalidateQueries: key,
  successToast,
  errorToast,
});

export const getDeleteSecondaryOptions = (
  key: any[],
  successToast = `Muvaffaqiyatli o'chirildi`,
  errorToast = "Xatolik sodir bo'ldi",
) => ({
  invalidateQueries: key,
  successToast,
  errorToast,
});

export function extractFileName(filePath?: string): string {
  if (!filePath) return '';

  const segments = filePath.split('/');
  const fullFileName = segments[segments.length - 1];

  let cleanedFileName = fullFileName.replace(
    /\d{2}\.\d{2}\.\d{4}T\d{2}_\d{2}_\d{2}\.\d{3}-\d{2}\.\d{2}\.\d{4}T\d{2}_\d{2}_\d{2}\.\d{3}-/,
    '',
  );
  cleanedFileName = cleanedFileName.replace(/\d{2}\.\d{2}\.\d{4}T\d{2}_\d{2}_\d{2}\.\d{3}-/, '');

  return cleanedFileName;
}

export function generatePrismaConnectDisconnect(
  oldArray: Item[],
  newArray: Item[] | string[] = [],
): { connect: Item[] | undefined; disconnect: Item[] | undefined } {
  const getId = (item: Item | string) => (typeof item === 'string' ? item : item.id);

  const oldIds = new Set(oldArray.map((item) => item.id));
  const newIds = new Set(newArray.map((item) => getId(item)));

  const connect = newArray.filter((item) => !oldIds.has(getId(item))).map((item) => ({ id: getId(item) }));
  const disconnect = oldArray.filter((item) => !newIds.has(item.id));
  // return { connect: connect.map((id) => ({ id })), disconnect: disconnect.map((id) => ({ id })) };

  return {
    connect: connect.length > 0 ? connect : undefined,
    disconnect: disconnect.length > 0 ? disconnect : undefined,
  };
}

export const generateSingleConnectDisconnect = (currentValue: string | undefined, newValue: string | undefined) => {
  if (currentValue === newValue) return undefined;
  return newValue ? { connect: { id: newValue } } : { disconnect: currentValue ? { id: currentValue } : undefined };
};

export function isUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

export const isVideo = (src: string): boolean => {
  const videoExtensions = /\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v)$/i;
  return videoExtensions.test(src);
};

export const isImage = (src: string): boolean => {
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg)$/i;
  return imageExtensions.test(src);
};

export const getMediaType = (src: string): 'image' | 'video' | 'unknown' => {
  if (isImage(src)) return 'image';
  if (isVideo(src)) return 'video';
  return 'unknown';
};

export function findMenuLabelByKey(key: string, items: any) {
  for (const item of items) {
    if (!item) continue;
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const found: any = findMenuLabelByKey(key, item.children);
      if (found) {
        return found;
      }
    }
  }
  return null; // Key not found
}

export const convertNullToUndefined = (obj: Record<string, any>) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value === null ? undefined : value]));
};

export const getTotalCount = (data?: Record<string, any>) => get(data, 'data.totalCount', 0);

export const makeShortText = (str?: string, length = 50) =>
  str ? (str.length > length ? str.slice(0, length) + '...' : str) : '';
