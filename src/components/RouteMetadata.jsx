import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const routeKeys = { '/': 'home', '/nexus/erp': 'erp', '/esg': 'esg' };

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation('factory');
  useEffect(() => {
    const key = routeKeys[pathname];
    document.documentElement.lang = { zh: 'zh-Hant', en: 'en', ja: 'ja', ko: 'ko' }[i18n.resolvedLanguage] || 'en';
    if (!key) return;
    const previousTitle = document.title;
    let description = document.querySelector('meta[name="description"]');
    const created = !description;
    if (created) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    const previousDescription = description.content;
    document.title = t('meta.' + key + 'Title');
    description.content = t('meta.' + key + 'Description');
    return () => {
      document.title = previousTitle;
      if (created) description.remove();
      else description.content = previousDescription;
    };
  }, [pathname, i18n.resolvedLanguage, t]);
  return null;
}
