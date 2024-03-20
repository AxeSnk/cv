import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ruTranslation from '../public/locales/ru/translation.json';
import enTranslation from '../public/locales/en/translation.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    resources: {
      ru: {
        translation: ruTranslation,
      },
      en: {
        translation: enTranslation
      }
    },
    interpolation: {
      escapeValue: false
    }
  });
