import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Database, Leaf } from 'lucide-react';
import VideoHero from '../components/VideoHero';
import './factory-entry.css';

export default function Home() {
  const { t } = useTranslation('factory');
  const steps = t('home.flowSteps', { returnObjects: true });
  const contactSteps = t('home.contactSteps', { returnObjects: true });
  const contactEmail =
    'mailto:d@aspertw.com?subject=' +
    encodeURIComponent(t('home.emailSubject')) +
    '&body=' +
    encodeURIComponent(t('home.emailBody'));
  return (
    <div className="factory-home">
      <VideoHero>
        <div className="container factory-hero">
          <div className="factory-hero-intro">
            <span className="tag">{t('home.tag')}</span>
            <h1>
              {t('home.title')}
              <span className="factory-accent">{t('home.titleAccent')}</span>
            </h1>
            <p className="factory-lead">{t('home.description')}</p>
          </div>
          <div className="factory-choices">
            <h2>{t('home.mapTitle')}</h2>
            <Link
              to="/nexus/erp"
              className="factory-choice"
              aria-labelledby="home-erp-choice-title home-erp-choice-cta"
              aria-describedby="home-erp-choice-detail home-erp-choice-status"
            >
              <div className="factory-choice-heading">
                <Factory size={22} aria-hidden="true" />
                <h3 id="home-erp-choice-title">{t('home.mapErp')}</h3>
              </div>
              <p id="home-erp-choice-detail">{t('home.mapErpDetail')}</p>
              <div className="factory-choice-footer">
                <span className="factory-choice-status" id="home-erp-choice-status">
                  {t('home.erpStatus')}
                </span>
                <span className="factory-choice-action" id="home-erp-choice-cta">
                  {t('home.erpCta')}
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </div>
            </Link>
            <Link
              to="/esg"
              className="factory-choice factory-choice--green"
              aria-labelledby="home-esg-choice-title home-esg-choice-cta"
              aria-describedby="home-esg-choice-detail home-esg-choice-status"
            >
              <div className="factory-choice-heading">
                <Leaf size={22} aria-hidden="true" />
                <h3 id="home-esg-choice-title">{t('home.mapExisting')}</h3>
              </div>
              <p id="home-esg-choice-detail">{t('home.mapExistingDetail')}</p>
              <div className="factory-choice-footer">
                <span className="factory-choice-status" id="home-esg-choice-status">
                  {t('home.esgStatus')}
                </span>
                <span className="factory-choice-action" id="home-esg-choice-cta">
                  {t('home.esgCta')}
                  <ArrowRight size={17} aria-hidden="true" />
                </span>
              </div>
            </Link>
            <Link to="/esg" className="factory-existing">
              <Database size={18} aria-hidden="true" />
              <strong>{t('home.note')}</strong>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="factory-choice-help">{t('home.routesDescription')}</p>
          </div>
        </div>
      </VideoHero>

      <section className="section">
        <div className="container factory-contact">
          <h2>{t('home.nextTitle')}</h2>
          <p className="factory-contact-intro">{t('home.nextBody')}</p>
          <ol className="factory-contact-steps">
            {contactSteps.map((step, index) => (
              <li key={step.title}>
                <span className="factory-contact-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <a className="btn-primary" href={contactEmail}>
            {t('home.nextCta')}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
          <p className="factory-contact-note">
            {t('home.contactNote')} <span className="draft-address">d@aspertw.com</span>
          </p>
        </div>
      </section>
      <section className="section factory-more-section">
        <div className="container">
          <details className="factory-disclosure">
            <summary>{t('home.moreTitle')}</summary>
            <div className="factory-details-body">
              <div className="factory-heading">
                <span className="tag">{t('home.flowTag')}</span>
                <h2>{t('home.flowTitle')}</h2>
                <p>{t('home.flowDescription')}</p>
              </div>
              <div className="factory-flow">
                {steps.map((step, index) => (
                  <article className="factory-flow-step" key={step.title}>
                    <span>0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                ))}
              </div>
              <div className="factory-materials">
                <span className="tag">{t('home.materialsTag')}</span>
                <h2>{t('home.materialsTitle')}</h2>
                <p>{t('home.materialsBody')}</p>
                <Link className="factory-text-link" to="/esg#esg-waste">
                  {t('home.traceLink')}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link className="factory-text-link" to="/ai-vision">
                  {t('home.visionLink')}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
