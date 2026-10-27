import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VideoHero from '../components/VideoHero';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero with Video Background */}
      <VideoHero>
        <div className="container">
          <div style={{ maxWidth: 800 }}>
            <div className="tag" style={{ marginBottom: 24 }}>{t('home.tag')}</div>
            {/* keep-all: CJK headline breaks only at the zero-width space in the string */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1,
              marginBottom: 24, fontWeight: 700,
              wordBreak: 'keep-all', overflowWrap: 'anywhere',
            }}>
              <span style={{ color: '#fff' }}>{t('hero.headline')}</span><br />
              <span style={{
                background: 'linear-gradient(135deg, #4285F4, #34A853)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{t('hero.headline2')}</span>
            </h1>
            <p style={{
              fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)', maxWidth: 600,
              marginBottom: 40, lineHeight: 1.8,
            }}>{t('hero.subtext')}</p>
            <div className="hero-buttons" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/partners" className="btn-primary">
                {t('hero.cta')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </VideoHero>

      {/* Other work: running systems, and ESG data as a planned next step */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 40 }}>{t('home.alsoTitle')}</h2>
          <div className="grid-2" style={{ marginBottom: 40 }}>
            {[
              { num: '/01', title: t('home.erpTitle'), desc: t('home.erpDesc') },
              { num: '/02', title: t('home.esgTitle'), desc: t('home.esgDesc'), status: t('home.esgStatus') },
            ].map(item => (
              <div key={item.num} className="card">
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12,
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#64748B' }}>
                    {item.num}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{item.title}</h3>
                  {item.status && (
                    <span style={{
                      padding: '2px 10px', borderRadius: 100, border: '1px solid #334155',
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94A3B8',
                    }}>{item.status}</span>
                  )}
                </div>
                <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/partners" className="btn-primary">
            {t('hero.cta')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
