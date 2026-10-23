import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: '#060D0B',
      padding: '64px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48, marginBottom: 48,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <img src="/logo.png" alt="Asper International" style={{
                height: 32, width: 'auto', objectFit: 'contain',
              }} />
            </div>
            <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.7 }}>
              {t('footer.companyDesc')}
            </p>
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94A3B8',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20,
            }}>{t('footer.quickLinks')}</h4>
            {[
              { path: '/', label: t('nav.home') },
              { path: '/partners', label: t('nav.partners') },
            ].map(link => (
              <Link key={link.path} to={link.path} style={{
                display: 'block', color: '#475569', fontSize: '0.875rem',
                textDecoration: 'none', padding: '6px 0', transition: 'color 0.2s',
              }} onMouseOver={e => e.currentTarget.style.color = '#fff'}
                onMouseOut={e => e.currentTarget.style.color = '#475569'}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94A3B8',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20,
            }}>{t('footer.contact')}</h4>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 2 }}>
              {['j@aspertw.com', 'd@aspertw.com'].map(email => (
                <span key={email}>
                  <a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{email}</a><br />
                </span>
              ))}
              {t('footer.address')}<br />
              <a href="tel:+886223450070" style={{ color: 'inherit', textDecoration: 'none' }}>+886-2-2345-0070</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 24, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ color: '#475569', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Asper International. {t('footer.rights')}
          </p>
          <p style={{
            color: '#475569', fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
            fontStyle: 'italic',
          }}>{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
