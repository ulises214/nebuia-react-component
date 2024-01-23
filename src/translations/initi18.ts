import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type Lang = 'es' | 'en';

const defaultLang: Lang = 'es';

export const initI18n = async (lang: Lang = defaultLang): Promise<void> => {
  let translations;
  if (lang === 'en') {
    translations = (await import('./en/translations')).default;
  } else {
    translations = (await import('./es/translations')).default;
  }
  await i18n.use(initReactI18next).init({
    lng: lang,
    resources: {
      [lang]: {
        translation: translations,
      },
    },
  });
};
