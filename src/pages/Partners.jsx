import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';

const contactEmails = ['j@aspertw.com', 'd@aspertw.com'];

const Partners = () => {
  const { t } = useTranslation();

  const partners = [
    { name: 'ASE Group', nameCn: '日月光集團', category: 'Semiconductor' },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">
          <div className="tag" style={{ marginBottom: 24 }}>{t('partners.tag')}</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {t('partners.title')}
          </h1>
          <p className="section-subtitle">{t('partners.subtitle')}</p>

          {/* Logo Wall */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 32, color: '#fff' }}>
              {t('partners.logoWall')}
            </h2>
            <div className="grid-3">
              {partners.map((p, i) => (
                <div key={i} style={{
                  padding: '32px 24px', background: 'var(--bg-raised)', border: '1px solid var(--line)',
                  borderRadius: 12, textAlign: 'center', transition: 'border-color 0.2s',
                }} onMouseOver={e => e.currentTarget.style.borderColor = '#333'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '1.2rem',
                    color: '#94A3B8', marginBottom: 8, fontWeight: 600,
                  }}>{p.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: 4 }}>{p.nameCn}</div>
                  <div style={{
                    display: 'inline-block', padding: '2px 10px', borderRadius: 100,
                    background: 'rgba(91,228,155,0.1)', color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  }}>{p.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact by email (no form backend yet) */}
          <div style={{
            background: 'var(--bg-raised)', border: '1px solid var(--line)',
            borderRadius: 12, padding: '48px 40px', maxWidth: 640,
          }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 16, color: '#fff' }}>
              {t('partners.formTitle')}
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.8, marginBottom: 32 }}>
              {t('partners.contactDesc')}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {contactEmails.map((email, i) => (
                <a
                  key={email}
                  href={`mailto:${email}?subject=${encodeURIComponent(t('partners.mailSubject'))}`}
                  className={i === 0 ? 'btn-primary' : 'btn-outline'}
                >
                  <Mail size={16} /> {email}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
