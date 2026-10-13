import { useTranslation } from 'react-i18next';
import '../pages/factory-entry.css';

export default function DemoNotice() {
  const { t } = useTranslation('factory');
  return (
    <aside className="demo-notice" aria-label={t('demo.label')}>
      <strong>{t('demo.label')}</strong>
      <p>{t('demo.notice')}</p>
    </aside>
  );
}
