import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VideoHero from '../components/VideoHero';
import Reveal from '../components/home/Reveal';
import IncinerationGrid from '../components/home/IncinerationGrid';

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

      {/* Vision: the one sourced number, shown as a dot grid */}
      <section className="section home-block">
        <div className="container">
          <Reveal><div className="tag" style={{ marginBottom: 24 }}>{t('home.vision.tag')}</div></Reveal>
          <div className="vision">
            <Reveal>
              <div className="metric-value" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1 }}>50.11%</div>
              <p className="home-footnote" style={{ marginTop: 12 }}>{t('home.vision.statCaption')}</p>
              <a className="home-source" href="https://tdr.lib.ntu.edu.tw/handle/123456789/88379"
                target="_blank" rel="noopener noreferrer">{t('home.vision.source')}</a>
            </Reveal>
            <Reveal delay={150}><IncinerationGrid /></Reveal>
          </div>
        </div>
      </section>

      {/* Other work: ESG data as a planned next step (one card, so no two-column grid) */}
      <section className="section home-block">
        <div className="container">
          <Reveal><h2 className="section-title" style={{ marginBottom: 40 }}>{t('home.alsoTitle')}</h2></Reveal>
          <Reveal className="card" style={{ maxWidth: 640, marginBottom: 40 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12,
            }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{t('home.esgTitle')}</h3>
              <span style={{
                padding: '2px 10px', borderRadius: 100, border: '1px solid #334155',
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94A3B8',
              }}>{t('home.esgStatus')}</span>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.8 }}>{t('home.esgDesc')}</p>
          </Reveal>
          <Link to="/partners" className="btn-primary">
            {t('hero.cta')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
