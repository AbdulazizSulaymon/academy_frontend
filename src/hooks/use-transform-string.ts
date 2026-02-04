import { useTranslation } from 'react-i18next';

// Define your locales
const LOCALES = {
  UZ: 'uz',
  RU: 'ru',
  KR: 'kr',
};

const useLocalizedString = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const localizeString = (key: string): string => {
    const translation = i18n.t(key);

    if (locale === LOCALES.RU) {
      return translation.toLowerCase();
    } else if (locale === LOCALES.UZ) {
      return translation[0].toUpperCase() + translation.slice(1);
    } else if (locale === LOCALES.KR) {
      return translation[0].toUpperCase() + translation.slice(1);
    }

    return translation;
  };

  return { localizeString };
};

export default useLocalizedString;
