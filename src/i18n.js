import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import factoryZh from './locales/factory/zh.json';
import factoryEn from './locales/factory/en.json';
import factoryJa from './locales/factory/ja.json';
import factoryKo from './locales/factory/ko.json';
import productsZh from './locales/products/zh.json';
import productsEn from './locales/products/en.json';
import productsJa from './locales/products/ja.json';
import productsKo from './locales/products/ko.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en, factory: factoryEn, products: productsEn },
    zh: { translation: zh, factory: factoryZh, products: productsZh },
    ja: { translation: ja, factory: factoryJa, products: productsJa },
    ko: { translation: ko, factory: factoryKo, products: productsKo },
  },
  lng: 'zh',
  fallbackLng: 'en',
  ns: ['translation', 'factory', 'products'],
  defaultNS: 'translation',
  interpolation: { escapeValue: false },
});

export default i18n;
