import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Factory, Database, Users, FileCheck2, Leaf } from 'lucide-react';
import VideoHero from '../components/VideoHero';
import './factory-entry.css';

export default function Home() {
  const { t } = useTranslation('factory');
  const steps = t('home.flowSteps', { returnObjects: true });
  return (
    <div>
      <VideoHero>
        <div className="container factory-hero">
          <div>
            <span className="tag">{t('home.tag')}</span>
            <h1>{t('home.title')}<br /><span className="factory-accent">{t('home.titleAccent')}</span></h1>
            <p className="factory-lead">{t('home.description')}</p>
            <div className="factory-actions">
              <Link to="/nexus/erp" className="btn-primary">{t('home.erpCta')}<ArrowRight size={17} /></Link>
              <Link to="/esg" className="btn-outline">{t('home.esgCta')}<ArrowRight size={17} /></Link>
            </div>
            <p className="factory-note">{t('home.note')}</p>
          </div>
          <div className="factory-map">
            <p className="factory-map-heading">{t('home.mapTitle')}</p>
            <div className="factory-map-input"><Factory size={24} /><div><h3>{t('home.mapErp')}</h3><p>{t('home.mapErpDetail')}</p></div></div>
            <div className="factory-map-input"><Database size={24} /><div><h3>{t('home.mapExisting')}</h3><p>{t('home.mapExistingDetail')}</p></div></div>
            <ArrowDown size={22} className="factory-map-arrow" aria-hidden="true" />
            <div className="factory-map-output"><FileCheck2 size={20} />{t('home.mapData')}</div>
            <p className="factory-map-review">{t('home.mapReview')}</p>
            <div className="factory-map-output"><Leaf size={20} />{t('home.mapOutput')}</div>
          </div>
        </div>
      </VideoHero>

      <section className="section factory-route-section">
        <div className="container">
          <div className="factory-heading"><span className="tag">{t('home.routesTag')}</span><h2>{t('home.routesTitle')}</h2><p>{t('home.routesDescription')}</p></div>
          <div className="grid-2">
            <article className="factory-route-card">
              <div className="factory-route-kicker"><Users size={19} />{t('home.erpRole')}</div>
              <h3>{t('home.erpTitle')}</h3><p>{t('home.erpBody')}</p>
              <Link className="factory-text-link" to="/nexus/erp">{t('home.erpLink')}<ArrowRight size={17} /></Link>
            </article>
            <article className="factory-route-card factory-route-card--green">
              <div className="factory-route-kicker"><Leaf size={19} />{t('home.esgRole')}</div>
              <h3>{t('home.esgTitle')}</h3><p>{t('home.esgBody')}</p>
              <Link className="factory-text-link" to="/esg">{t('home.esgLink')}<ArrowRight size={17} /></Link>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="factory-heading"><span className="tag">{t('home.flowTag')}</span><h2>{t('home.flowTitle')}</h2><p>{t('home.flowDescription')}</p></div>
          <div className="factory-flow">{steps.map((step, index) => <article className="factory-flow-step" key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container factory-materials">
          <span className="tag">{t('home.materialsTag')}</span><h2>{t('home.materialsTitle')}</h2><p>{t('home.materialsBody')}</p>
          <Link className="factory-text-link" to="/ai-vision">{t('home.visionLink')}<ArrowRight size={17} /></Link>
          <Link className="factory-text-link" to="/esg#esg-waste">{t('home.traceLink')}<ArrowRight size={17} /></Link>
        </div>
      </section>
      <section className="section">
        <div className="container factory-contact"><h2>{t('home.nextTitle')}</h2><p>{t('home.nextBody')}</p><a className="btn-primary" href={'mailto:d@aspertw.com?subject=' + encodeURIComponent(t('home.emailSubject'))}>{t('home.nextCta')}<ArrowRight size={17} /></a></div>
      </section>
    </div>
  );
}
