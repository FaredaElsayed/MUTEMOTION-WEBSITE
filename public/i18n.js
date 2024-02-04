import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./public/en/translation.json";
import arTranslation from "./public/ar/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
