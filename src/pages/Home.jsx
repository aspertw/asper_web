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

      {/* Niche: judge for pyrolysis feedstock, not for sorting bins */}
      <section className="section">
        <div className="container">
          <div className="tag" style={{ marginBottom: 24 }}>{t('home.nicheTag')}</div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            lineHeight: 1.4, fontWeight: 600, marginBottom: 24, maxWidth: 900,
            wordBreak: 'keep-all', overflowWrap: 'anywhere',
          }}>
            <span style={{ color: '#64748B' }}>{t('home.nicheLine1')}</span><br />
            <span style={{ color: '#fff' }}>{t('home.nicheLine2')}</span>
          </p>
          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.8, maxWidth: 720, marginBottom: 40 }}>
            {t('home.nicheDesc')}
          </p>
          <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: 24 }}>
            {[
              { num: '/01', label: t('home.ruleAcceptLabel'), mat: t('home.ruleAcceptMat'), desc: t('home.ruleAcceptDesc'), color: '#34A853' },
              { num: '/02', label: t('home.ruleStopLabel'), mat: 'PVC', desc: t('home.ruleStopDesc'), color: '#EA4335' },
              { num: '/03', label: t('home.ruleRouteLabel'), mat: 'PET', desc: t('home.ruleRouteDesc'), color: '#FBBC05' },
            ].map(rule => (
              <div key={rule.num} style={{
                display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap',
                padding: '20px 0', borderBottom: '1px solid #1a1a1a',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#64748B' }}>{rule.num}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 600,
                  color: rule.color, minWidth: 72,
                }}>{rule.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: '#fff', minWidth: 140 }}>
                  {rule.mat}
                </span>
                <span style={{ fontSize: '0.95rem', color: '#94A3B8', flex: '1 1 260px' }}>{rule.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.8, maxWidth: 720 }}>
            {t('home.ruleNote')}
          </p>
        </div>
      </section>

      {/* Why Asper: named, sourced evidence only */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tag" style={{ marginBottom: 24 }}>{t('home.whyTag')}</div>
          <h2 className="section-title">{t('home.whyTitle')}</h2>
          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.8, maxWidth: 720, marginBottom: 32 }}>
            {t('home.whyDesc')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820 }}>
            {[
              { label: t('home.whyDownLabel'), desc: t('home.whyDownDesc') },
              {
                label: t('home.whyUpLabel'), desc: t('home.whyUpDesc'),
                source: {
                  href: 'https://www.aseglobal.com/ch/pdf/2025-aseh-csr-responsible-procurement-ch.pdf',
                  text: t('home.whyUpSource'),
                },
              },
              { label: t('home.whyPatentLabel'), desc: t('home.whyPatentDesc') },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#34A853', flexShrink: 0 }}>↳</span>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: 600, marginRight: 12 }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.8 }}>{item.desc}</span>
                  {item.source && (
                    <a href={item.source.href} target="_blank" rel="noopener noreferrer" style={{
                      display: 'block', fontSize: '0.8rem', color: '#64748B', marginTop: 4,
                    }}>{item.source.text}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision and where we are now; the one number is sourced */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tag" style={{ marginBottom: 24 }}>{t('home.visionTag')}</div>
          <div className="grid-2" style={{ alignItems: 'start', gap: 48 }}>
            <div>
              <div className="metric-value" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1 }}>50.11%</div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginTop: 12 }}>
                {t('home.visionStatCaption')}
              </p>
              <a href="https://tdr.lib.ntu.edu.tw/handle/123456789/88379" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', fontSize: '0.8rem', color: '#64748B', marginTop: 4,
              }}>{t('home.visionSource')}</a>
            </div>
            <div>
              <p style={{
                fontSize: '1.25rem', color: '#fff', lineHeight: 1.7, marginBottom: 16,
                wordBreak: 'keep-all', overflowWrap: 'anywhere',
              }}>
                {t('home.visionLine1')}<br />{t('home.visionLine2')}
              </p>
              <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.8 }}>{t('home.visionPath')}</p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: '56px 0 8px' }}>{t('home.milestonesTitle')}</h3>
          <div style={{ borderTop: '1px solid #1a1a1a' }}>
            {[
              { when: t('home.ms1When'), desc: t('home.ms1Desc') },
              { when: t('home.ms2When'), desc: t('home.ms2Desc') },
              { when: t('home.ms3When'), desc: t('home.ms3Desc') },
            ].map(ms => (
              <div key={ms.when} style={{
                display: 'flex', gap: 16, flexWrap: 'wrap', padding: '16px 0', borderBottom: '1px solid #1a1a1a',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#4285F4', minWidth: 160 }}>
                  {ms.when}
                </span>
                <span style={{ fontSize: '0.95rem', color: '#94A3B8', flex: '1 1 260px' }}>{ms.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other work: running systems, and ESG data as a planned next step */}
      <section className="section" style={{ paddingTop: 0 }}>
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
