import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VideoHero from '../components/VideoHero';
import Reveal from '../components/home/Reveal';
import MaterialSorter from '../components/home/MaterialSorter';
import ValueChainFlow from '../components/home/ValueChainFlow';
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

      {/* Niche: judge for pyrolysis feedstock, not for sorting bins */}
      <section className="section">
        <div className="container">
          <Reveal><div className="tag" style={{ marginBottom: 24 }}>{t('home.niche.tag')}</div></Reveal>
          <Reveal>
            <h2 className="home-statement">
              <span style={{ color: '#64748B' }}>{t('home.niche.q1')}</span><br />
              <span style={{ color: '#fff' }}>{t('home.niche.q2')}</span>
            </h2>
          </Reveal>
          <Reveal delay={150}><MaterialSorter /></Reveal>
          <Reveal>
            <p className="home-summary">{t('home.niche.summary')}</p>
            <p className="home-footnote">{t('home.niche.rule')}</p>
          </Reveal>
        </div>
      </section>

      {/* Why Asper: upstream site → judgment → affiliate's plant → feedstock */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal><div className="tag" style={{ marginBottom: 24 }}>{t('home.why.tag')}</div></Reveal>
          <Reveal>
            <h2 className="section-title">{t('home.why.title')}</h2>
            <p className="home-lead">{t('home.why.lead')}</p>
          </Reveal>
          <ValueChainFlow />
          <div className="badges">
            {['award', 'patent1', 'patent2'].map((id, i) => (
              <Reveal key={id} delay={i * 120} className="badge">
                <span className="badge-kind">{t(`home.badges.${id}.kind`)}</span>
                <span className="badge-text">{t(`home.badges.${id}.text`)}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision: the one sourced number, shown as a dot grid, then the path and milestones */}
      <section className="section" style={{ paddingTop: 0 }}>
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

          <Reveal>
            <div className="path">
              <span className="path-label">{t('home.vision.pathLabel')}</span>
              {['path1', 'path2', 'path3'].map((id, i) => (
                <span key={id} className="path-step">
                  {i > 0 && <ArrowRight size={14} className="path-arrow" />}
                  <span className="path-chip">{t(`home.vision.${id}`)}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal><h3 className="timeline-title">{t('home.ms.title')}</h3></Reveal>
          <div className="timeline">
            {['ms1', 'ms2', 'ms3'].map((id, i) => (
              <Reveal key={id} delay={i * 150} className="timeline-item">
                <span className="timeline-dot" />
                <span className="timeline-when">{t(`home.ms.${id}.when`)}</span>
                <span className="timeline-desc">{t(`home.ms.${id}.desc`)}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other work: running systems, and ESG data as a planned next step */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal><h2 className="section-title" style={{ marginBottom: 40 }}>{t('home.alsoTitle')}</h2></Reveal>
          <div className="grid-2" style={{ marginBottom: 40 }}>
            {[
              { num: '/01', title: t('home.erpTitle'), desc: t('home.erpDesc') },
              { num: '/02', title: t('home.esgTitle'), desc: t('home.esgDesc'), status: t('home.esgStatus') },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 150} className="card">
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
              </Reveal>
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
