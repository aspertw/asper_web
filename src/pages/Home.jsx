import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Leaf } from 'lucide-react';
import Reveal from '../components/home/Reveal';
import HeroScan from '../components/home/HeroScan';
import ScanRow from '../components/home/ScanRow';
import FlowPipeline from '../components/home/FlowPipeline';
import IncinerationGrid from '../components/home/IncinerationGrid';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      {/* Hero: one sentence, one button, and a drawn phone that judges one item at a time */}
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <div className="tag" style={{ marginBottom: 28 }}>{t('home.tag')}</div>
            {/* keep-all: CJK headline breaks only at the zero-width space in the string */}
            <h1 className="home-h1">
              <span>{t('hero.headline')}</span><br />
              <span className="home-h1-accent">{t('hero.headline2')}</span>
            </h1>
            <p className="home-hero-sub">{t('hero.subtext')}</p>
            <Link to="/partners" className="btn-primary">
              {t('hero.cta')} <ArrowRight size={16} />
            </Link>
          </div>
          <HeroScan />
        </div>
      </section>

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

      {/* 04 Other work: running systems, and ESG data as a planned next step */}
      <section className="home-block">
        <div className="container">
          <Reveal><div className="home-index">04 · {t('home.alsoTag')}</div></Reveal>
          <Reveal><h2 className="home-h2">{t('home.alsoTitle')}</h2></Reveal>
          <div className="also">
            {[
              { Icon: Database, title: t('home.erpTitle'), desc: t('home.erpDesc') },
              { Icon: Leaf, title: t('home.esgTitle'), desc: t('home.esgDesc'), status: t('home.esgStatus') },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 150} className="also-card">
                <item.Icon size={28} className="also-icon" />
                <h3 className="also-title">
                  {item.title}
                  {item.status && <span className="also-status">{item.status}</span>}
                </h3>
                <p className="also-desc">{item.desc}</p>
              </Reveal>
            ))}
          </div>
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
