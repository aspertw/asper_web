import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';

const supportedLngs = ['en', 'zh', 'ja', 'ko'];

// <html lang> value for each UI language; zh content is Traditional Chinese
const htmlLang = { en: 'en', zh: 'zh-Hant', ja: 'ja', ko: 'ko' };

// First browser language we support (zh-TW → zh, ja-JP → ja), else English
const detectLanguage = () => {
  if (typeof navigator === 'undefined') return 'en';
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of candidates) {
    const base = tag?.toLowerCase().split('-')[0];
    if (supportedLngs.includes(base)) return base;
  }
  return 'en';
};

const syncHtmlLang = (lng) => {
  const base = lng?.split('-')[0];
  document.documentElement.lang = htmlLang[base] || 'en';
};

i18n.on('languageChanged', syncHtmlLang);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
    ja: { translation: ja },
    ko: { translation: ko },
  },
  lng: detectLanguage(),
  supportedLngs,
  load: 'languageOnly',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
