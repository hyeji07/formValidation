import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translation.en.json';
import ko from './translation.ko.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)

  .init({
    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
    },
    lng: localStorage.getItem('i18nextLng') || 'ko-KR',
    fallbackLng: {
      default: ['ko-KR'],
      'en-US': ['en-US'],
    },
    debug: true,
    defaultNS: 'translation',
    ns: 'translation',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
export default i18n;
