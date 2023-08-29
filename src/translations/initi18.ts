import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type Lang = 'es' | 'en';

const defaultLang: Lang = 'es';

export const initI18n = async (lang: Lang = defaultLang): Promise<void> => {
  const translations =
    lang === 'en'
      ? import('./en/translations.json')
      : import('./es/translations.json');
  try {
    const resource = await translations;
    await i18n.use(initReactI18next).init({
      lng: lang,
      resources: {
        [lang]: {
          translation: resource.default,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
