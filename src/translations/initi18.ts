import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { enTranslation } from './en/translations';
import { esTranslation } from './es/translations';

export type Lang = 'es' | 'en';

const defaultLang: Lang = 'es';

export const initI18n = async (lang: Lang = defaultLang): Promise<void> => {
  const translations = lang === 'en' ? enTranslation : esTranslation;
  await i18n.use(initReactI18next).init({
    lng: lang,
    resources: {
      [lang]: {
        translation: translations,
      },
    },
  });
};
