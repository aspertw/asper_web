import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import Reveal from '../components/home/Reveal';
import VideoHero from '../components/VideoHero';
import ScanRow from '../components/home/ScanRow';
import FlowPipeline from '../components/home/FlowPipeline';
import IncinerationGrid from '../components/home/IncinerationGrid';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      {/* Hero with Video Background (kept from the previous site, per Jasper 2026-10-23) */}
      <VideoHero>
        <div className="container">
          <div style={{ maxWidth: 800 }}>
            <div className="tag" style={{ marginBottom: 24 }}>{t('home.tag')}</div>
            {/* keep-all: CJK headline breaks only at the zero-width space in the string */}
            <h1 style={{
              fontFamily: 'var(--font-mono)',
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

      {/* 01 Niche: which bin vs. can it become feedstock */}
      <section className="home-block">
        <div className="container">
          <Reveal><div className="home-index">01 · {t('home.niche.tag')}</div></Reveal>
          <Reveal>
            <h2 className="home-h2">
              <span className="home-h2-dim">{t('home.niche.q1')}</span><br />
              {t('home.niche.q2')}
            </h2>
          </Reveal>
          <ScanRow />
          <Reveal><p className="home-takeaway">{t('home.niche.summary')}</p></Reveal>
        </div>
      </section>

      {/* 02 Why Asper: plastic flows from the site, through the judgment, into the affiliate's plant */}
      <section className="home-block">
        <div className="container">
          <Reveal><div className="home-index">02 · {t('home.why.tag')}</div></Reveal>
          <Reveal><h2 className="home-h2">{t('home.why.title')}</h2></Reveal>
          <FlowPipeline />
          <Reveal><p className="home-note">{t('home.why.patents')}</p></Reveal>
        </div>
      </section>

      {/* 03 Vision: the one sourced number, shown as a dot grid */}
      <section className="home-block">
        <div className="container">
          <Reveal><div className="home-index">03 · {t('home.vision.tag')}</div></Reveal>
          <div className="vision">
            <Reveal>
              <div className="home-stat">50.11%</div>
              <p className="home-footnote" style={{ marginTop: 16 }}>{t('home.vision.statCaption')}</p>
              <a className="home-source" href="https://tdr.lib.ntu.edu.tw/handle/123456789/88379"
                target="_blank" rel="noopener noreferrer">{t('home.vision.source')}</a>
            </Reveal>
            <Reveal delay={150}><IncinerationGrid /></Reveal>
          </div>
        </div>
      </section>

      {/* 04 Other work: ESG data as a planned next step (one card) */}
      <section className="home-block">
        <div className="container">
          <Reveal><div className="home-index">04 · {t('home.alsoTag')}</div></Reveal>
          <Reveal><h2 className="home-h2">{t('home.alsoTitle')}</h2></Reveal>
          <Reveal className="also-card also-single">
            <Leaf size={28} className="also-icon" />
            <h3 className="also-title">
              {t('home.esgTitle')}
              <span className="also-status">{t('home.esgStatus')}</span>
            </h3>
            <p className="also-desc">{t('home.esgDesc')}</p>
          </Reveal>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="home-cta">
        <div className="container">
          <Reveal>
            <h2 className="home-cta-title">{t('home.cta.title')}</h2>
            <Link to="/partners" className="btn-primary">
              {t('hero.cta')} <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
