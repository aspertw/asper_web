import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Bot, CalendarDays, Check, ClipboardCheck,
  Package, Settings2, Users,
} from 'lucide-react';
import './product-pages.css';

const moduleIcons = [Users, CalendarDays, ClipboardCheck, Package];

export default function OpenSourceERP() {
  const { t } = useTranslation('products');
  const modules = t('erp.modules', { returnObjects: true });
  const workflow = t('erp.workflow.steps', { returnObjects: true });
  const preparation = t('erp.preparation.items', { returnObjects: true });
  const services = t('erp.services.items', { returnObjects: true });
  const fitItems = t('erp.eligibility.fitItems', { returnObjects: true });
  const limitsItems = t('erp.eligibility.limitsItems', { returnObjects: true });
  const readiness = t('erp.readiness.items', { returnObjects: true });
  const comparison = t('erp.comparison.rows', { returnObjects: true });
  const startSteps = t('erp.contact.steps', { returnObjects: true });
  const questions = t('erp.questions', { returnObjects: true });
  const contactEmail = 'mailto:d@aspertw.com?subject=' + encodeURIComponent(t('erp.emailSubject')) + '&body=' + encodeURIComponent(t('erp.emailBody'));

  return (
    <div className="product-page product-page--erp">
      <section className="product-hero">
        <div className="container product-hero-grid">
          <div>
            <p className="product-eyebrow">{t('erp.eyebrow')}</p>
            <h1>{t('erp.title')}</h1>
            <p className="product-lead">{t('erp.description')}</p>
            <div className="product-actions">
              <a href="#erp-start" className="btn-primary">
                {t('erp.contactCta')} <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a href="#erp-scope" className="product-text-link">
                {t('erp.scopeCta')} <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="product-caption">{t('erp.demoNote')} <Link to="/nexus" className="erp-demo-link">{t('erp.demoCta')}</Link></p>
          </div>

          <aside className="product-status-panel" aria-labelledby="erp-status-title">
            <div className="product-panel-icon"><Settings2 size={24} aria-hidden="true" /></div>
            <span className="product-status-label">{t('erp.status.badge')}</span>
            <h2 id="erp-status-title">{t('erp.status.title')}</h2>
            <p>{t('erp.status.description')}</p>
            <dl className="product-facts">
              <div><dt>{t('erp.status.licenseLabel')}</dt><dd>{t('erp.status.license')}</dd></div>
              <div><dt>{t('erp.status.hostingLabel')}</dt><dd>{t('erp.status.hosting')}</dd></div>
              <div><dt>{t('erp.status.scopeLabel')}</dt><dd>{t('erp.status.scope')}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="product-section" id="erp-scope" aria-labelledby="erp-scope-title">
        <div className="container">
          <div className="product-section-heading">
            <p className="product-eyebrow">{t('erp.scopeEyebrow')}</p>
            <h2 id="erp-scope-title">{t('erp.scopeTitle')}</h2>
            <p>{t('erp.scopeDescription')}</p>
          </div>
          <div className="product-grid product-grid--four">
            {modules.map((module, index) => {
              const Icon = moduleIcons[index];
              return (
                <article className="product-card" key={module.title}>
                  <Icon className="product-card-icon" size={25} aria-hidden="true" />
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </article>
              );
            })}
          </div>
          <div className="product-grid product-grid--two erp-fit-grid">
            <article className="product-card">
              <h3>{t('erp.eligibility.fitTitle')}</h3>
              <ul className="product-bullet-list">{fitItems.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="product-card">
              <h3>{t('erp.eligibility.limitsTitle')}</h3>
              <ul className="product-bullet-list">{limitsItems.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
          <p className="product-caption">{t('erp.eligibility.note')}</p>
        </div>
      </section>

      <section className="product-section product-section--tinted" aria-labelledby="erp-workflow-title">
        <div className="container">
          <div className="product-section-heading">
            <p className="product-eyebrow">{t('erp.workflow.eyebrow')}</p>
            <h2 id="erp-workflow-title">{t('erp.workflow.title')}</h2>
            <p>{t('erp.workflow.description')}</p>
          </div>
          <ol className="product-flow">
            {workflow.map((step, index) => (
              <li key={step.title}>
                <span className="product-step-number" aria-hidden="true">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="product-section" aria-labelledby="erp-preparation-title">
        <div className="container product-split">
          <div>
            <div className="product-section-heading">
              <p className="product-eyebrow">{t('erp.preparation.eyebrow')}</p>
              <h2 id="erp-preparation-title">{t('erp.preparation.title')}</h2>
              <p>{t('erp.preparation.description')}</p>
            </div>
            <ul className="product-check-list">
              {preparation.map(item => (
                <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <aside className="product-status-panel erp-readiness" aria-labelledby="erp-readiness-title">
            <span className="product-status-label">{t('erp.readiness.badge')}</span>
            <h3 id="erp-readiness-title">{t('erp.readiness.title')}</h3>
            <p>{t('erp.readiness.description')}</p>
            <ul className="product-bullet-list">{readiness.map(item => <li key={item}>{item}</li>)}</ul>
          </aside>
        </div>
      </section>

      <section className="product-section product-section--tinted" aria-labelledby="erp-services-title">
        <div className="container">
          <div className="product-section-heading">
            <p className="product-eyebrow">{t('erp.services.eyebrow')}</p>
            <h2 id="erp-services-title">{t('erp.services.title')}</h2>
            <p>{t('erp.services.description')}</p>
          </div>
          <div className="erp-comparison-scroll" role="region" aria-labelledby="erp-comparison-caption" tabIndex={0}>
            <table className="erp-comparison">
              <caption id="erp-comparison-caption">{t('erp.comparison.caption')}</caption>
              <thead><tr><th scope="col">{t('erp.comparison.itemLabel')}</th><th scope="col">{t('erp.comparison.selfLabel')}</th><th scope="col">{t('erp.comparison.paidLabel')}</th></tr></thead>
              <tbody>{comparison.map(row => <tr key={row.item}><th scope="row">{row.item}</th><td>{row.self}</td><td>{row.paid}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="product-caption erp-comparison-hint">{t('erp.comparison.hint')}</p>
          <p className="product-caption">{t('erp.comparison.note')}</p>
          <div className="product-grid product-grid--three erp-services-grid">
            {services.map(service => (
              <article className="product-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <div className="product-bridge">
            <div>
              <h3>{t('erp.esg.title')}</h3>
              <p>{t('erp.esg.description')}</p>
            </div>
            <Link to="/esg" className="product-text-link">
              {t('erp.esg.cta')} <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="product-section" aria-labelledby="erp-faq-title">
        <div className="container product-faq-layout">
          <div className="product-section-heading">
            <p className="product-eyebrow">{t('common.faqEyebrow')}</p>
            <h2 id="erp-faq-title">{t('erp.faqTitle')}</h2>
          </div>
          <div className="product-faq">
            {questions.map(question => (
              <details key={question.title}>
                <summary>{question.title}</summary>
                <p>{question.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="container">
          <aside className="product-agent-strip" aria-labelledby="erp-agent-title">
            <Bot size={22} aria-hidden="true" />
            <div><span className="product-status-label">{t('common.planned')}</span><h3 id="erp-agent-title">{t('erp.agent.title')}</h3><p>{t('erp.agent.description')}</p><p className="product-caption">{t('erp.agent.status')}</p></div>
          </aside>
        </div>
      </section>

      <section className="product-section product-section--closing" id="erp-start" aria-labelledby="erp-contact-title">
        <div className="container">
          <div className="product-section-heading">
            <p className="product-eyebrow">{t('common.nextStep')}</p>
            <h2 id="erp-contact-title">{t('erp.contact.title')}</h2>
            <p>{t('erp.contact.description')}</p>
          </div>
          <ol className="product-flow erp-start-flow">
            {startSteps.map((step, index) => <li key={step.title}><span className="product-step-number" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
          </ol>
          <div className="product-contact-panel">
            <div>
              <h3>{t('erp.contact.resultTitle')}</h3>
              <p>{t('erp.contact.resultDescription')}</p>
              <p className="product-caption">{t('erp.contact.note')}</p>
            </div>
            <a href={contactEmail} className="btn-primary">
              {t('erp.contactCta')} <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
