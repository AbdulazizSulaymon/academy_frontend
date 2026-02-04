import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useI18n = (lang?: string) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log(lang !== i18n.language, lang);
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);
};
