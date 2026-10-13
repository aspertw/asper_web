import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Bot, Factory, Leaf, Recycle } from 'lucide-react';
import './product-pages.css';

const solutions = [
  { id: 'waste', icon: Recycle },
  { id: 'carbon', icon: Factory },
  { id: 'pcf', icon: Leaf },
];
const solutionFromHash = (hash) => solutions.find(({ id }) => hash === `#esg-${id}`)?.id ?? null;

export default function ESG() {
  const { t } = useTranslation('products');
  const { hash } = useLocation();
  const [view, setView] = useState(() => {
    const selected = solutionFromHash(hash);
    return { hash, selected, expanded: selected ? [selected] : [] };
  });
  // Keep the chosen outcome when navigation moves to preparation or contact.
  if (view.hash !== hash) {
    const selected = solutionFromHash(hash);
    setView({
      hash,
      selected: selected ?? view.selected,
      expanded:
        selected && !view.expanded.includes(selected)
          ? [...view.expanded, selected]
          : view.expanded,
    });
  }
  const choose = (id, reveal = false) =>
    setView((previous) => ({
      ...previous,
      selected: id,
      expanded:
        reveal && !previous.expanded.includes(id) ? [...previous.expanded, id] : previous.expanded,
    }));
  const toggleDetails = (id, open) =>
    setView((previous) => {
      if (previous.expanded.includes(id) === open) return previous;
      return {
        ...previous,
        selected: open ? id : previous.selected,
        expanded: open
          ? [...previous.expanded, id]
          : previous.expanded.filter((value) => value !== id),
      };
    });
  const workflow = t('esg.workflow.steps', { returnObjects: true });
  const initialItems = t('esg.start.items', { returnObjects: true });
  const startSteps = t('esg.start.steps', { returnObjects: true });
  const questions = t('esg.questions', { returnObjects: true });
  const contactEmail = (id) => {
    const outcome = id ? t(`esg.solutions.${id}.title`) : t('esg.undecidedOutcome');
    return (
      'mailto:d@aspertw.com?subject=' +
      encodeURIComponent(t('esg.emailSubject', { outcome })) +
      '&body=' +
      encodeURIComponent(t('esg.emailBody', { outcome }))
    );
  };

  return (
    <div className="product-page product-page--esg product-page--compact">
      <section className="product-hero">
        <div className="container product-hero-grid">
          <div>
            <p className="product-eyebrow">{t('esg.eyebrow')}</p>
            <h1>{t('esg.title')}</h1>
            <p className="product-lead">{t('esg.description')}</p>
            <div className="product-actions">
              <a href="#esg-outcomes" className="btn-primary">
                {t('esg.primaryCta')} <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a href="#esg-start" className="product-text-link">
                {t('esg.startCta')} <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="product-caption">{t('esg.heroNote')}</p>
          </div>
          <aside className="product-status-panel" aria-labelledby="esg-entry-title">
            <div className="product-panel-icon">
              <Factory size={24} aria-hidden="true" />
            </div>
            <span className="product-status-label">{t('esg.entry.badge')}</span>
            <h2 id="esg-entry-title">{t('esg.entry.title')}</h2>
            <p>{t('esg.entry.description')}</p>
            <dl className="product-facts">
              <div>
                <dt>{t('esg.entry.sourceLabel')}</dt>
                <dd>{t('esg.entry.source')}</dd>
              </div>
              <div>
                <dt>{t('esg.entry.startLabel')}</dt>
                <dd>{t('esg.entry.start')}</dd>
              </div>
              <div>
                <dt>{t('esg.entry.deliveryLabel')}</dt>
                <dd>{t('esg.entry.delivery')}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="product-section" id="esg-outcomes" aria-labelledby="esg-outcomes-title">
        <div className="container">
          <div className="product-section-heading">
            <p className="product-eyebrow">{t('esg.outcomes.eyebrow')}</p>
            <h2 id="esg-outcomes-title">{t('esg.outcomes.title')}</h2>
            <p>{t('esg.outcomes.description')}</p>
          </div>
          <div className="product-grid product-grid--three">
            {solutions.map((solution) => {
              const { id, icon: Icon } = solution;
              return (
                <article className="product-card esg-outcome-card" key={id}>
                  <Icon size={26} className="product-card-icon" aria-hidden="true" />
                  <h3>{t(`esg.solutions.${id}.title`)}</h3>
                  <p className="esg-card-request">
                    <span>{t('esg.requestLabel')}</span>
                    {t(`esg.solutions.${id}.request`)}
                  </p>
                  <p>
                    <span className="esg-card-label">{t('esg.summaryOutputLabel')}</span>
                    {t(`esg.solutions.${id}.summary`)}
                  </p>
                  <div className="esg-card-actions">
                    <a href={contactEmail(id)} onClick={() => choose(id)} className="btn-primary">
                      {t(`esg.solutions.${id}.cta`)} <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <a
                      href={`#esg-${id}`}
                      onClick={() => choose(id, true)}
                      className="product-text-link"
                    >
                      {t('esg.outcomes.cardCta')} <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="esg-paid-summary">
            <h3>{t('esg.service.title')}</h3>
            <p>
              {t('esg.service.description')} {t('esg.service.scopeNote')}
            </p>
          </div>
          <details className="product-disclosure">
            <summary>{t('esg.service.detailsCta')}</summary>
            <div className="product-disclosure-body esg-scope-details">
              <h4>{t('esg.service.initialTitle')}</h4>
              <p>{t('esg.service.initialDescription')}</p>
              <h4>{t('esg.service.ongoingTitle')}</h4>
              <p>{t('esg.service.ongoingDescription')}</p>
            </div>
          </details>
        </div>
      </section>

      <section
        className="product-section product-section--tinted"
        id="esg-start"
        aria-labelledby="esg-start-title"
      >
        <div className="container">
          <div className="product-split">
            <div className="product-section-heading">
              <p className="product-eyebrow">{t('esg.start.eyebrow')}</p>
              <h2 id="esg-start-title">{t('esg.start.title')}</h2>
              <p>{t('esg.start.description')}</p>
              <p className="product-caption">{t('esg.start.note')}</p>
              <a href="#esg-contact" className="product-text-link esg-start-link">
                {t('esg.start.cta')} <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="product-data-panel">
              <h3>{t('esg.start.initialTitle')}</h3>
              <ul className="product-bullet-list">
                {initialItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="product-section-heading esg-start-process">
            <h3>{t('esg.start.processTitle')}</h3>
            <p>{t('esg.start.processDescription')}</p>
          </div>
          <ol className="product-flow esg-start-flow">
            {startSteps.map((step, index) => (
              <li key={step.title}>
                <span className="product-step-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="product-section product-section--closing"
        id="esg-contact"
        aria-labelledby="esg-contact-title"
      >
        <div className="container">
          <div className="product-contact-panel">
            <div>
              <p className="product-eyebrow">{t('common.nextStep')}</p>
              <h2 id="esg-contact-title">{t('esg.contact.title')}</h2>
              <p>{t('esg.contact.description')}</p>
              <p className="esg-selected-outcome">
                <span>{t('esg.contact.selectionLabel')}</span>{' '}
                {view.selected
                  ? t(`esg.solutions.${view.selected}.title`)
                  : t('esg.undecidedOutcome')}{' '}
                <a href="#esg-outcomes" className="product-text-link">
                  {t('esg.contact.changeCta')}
                </a>
              </p>
              <p className="product-caption">
                {t('esg.contact.note')} <span className="draft-address">d@aspertw.com</span>
              </p>
            </div>
            <a href={contactEmail(view.selected)} className="btn-primary">
              {t('esg.contactCta')} <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="product-related-link">
            {t('esg.erp.description')}{' '}
            <Link to="/nexus/erp">
              {t('esg.erp.cta')} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="product-section product-section--optional esg-detail-section">
        <div className="container">
          {solutions.map((solution) => {
            const { id, icon: Icon } = solution;
            return (
              <details
                className="product-disclosure esg-solution-details"
                id={`esg-${id}`}
                key={id}
                open={view.expanded.includes(id)}
                onToggle={(event) => toggleDetails(id, event.currentTarget.open)}
              >
                <summary>
                  <Icon size={20} aria-hidden="true" />
                  <span>
                    {t(`esg.solutions.${id}.title`)} · {t('esg.outcomes.cardCta')}
                  </span>
                </summary>
                <div className="product-disclosure-body">
                  <p className="product-eyebrow">{t(`esg.solutions.${id}.audience`)}</p>
                  <p className="product-caption">{t(`esg.solutions.${id}.description`)}</p>
                  <p className="product-caption esg-input-note">{t('esg.inputNote')}</p>
                  <div className="product-grid product-grid--two">
                    <div className="product-data-panel product-data-panel--output">
                      <h3>{t('esg.outputLabel')}</h3>
                      <ul className="product-bullet-list">
                        {t(`esg.solutions.${id}.outputs`, { returnObjects: true }).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="product-data-panel">
                      <h3>{t('esg.inputLabel')}</h3>
                      <ul className="product-bullet-list">
                        {t(`esg.solutions.${id}.inputs`, { returnObjects: true }).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="esg-delivery-scope">
                    <h3>{t('esg.scopeLabel')}</h3>
                    <p>{t(`esg.solutions.${id}.scope`)}</p>
                  </div>
                  <div className="product-delivery-next">
                    <p>
                      <span>{t('common.nextStep')}</span>
                      {t(`esg.solutions.${id}.nextStep`)}
                    </p>
                    <a href="#esg-contact" onClick={() => choose(id)} className="product-text-link">
                      {t('esg.prepareCta')} <ArrowRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                  <p className="product-caption">{t('esg.emailNote')}</p>
                </div>
              </details>
            );
          })}
          <details className="product-disclosure">
            <summary>{t('esg.workflow.detailsCta')}</summary>
            <div className="product-disclosure-body">
              <div className="product-section-heading">
                <p className="product-eyebrow">{t('esg.workflow.eyebrow')}</p>
                <h2 id="esg-workflow-title">{t('esg.workflow.title')}</h2>
                <p>{t('esg.workflow.description')}</p>
              </div>
              <ol className="product-flow">
                {workflow.map((step, index) => (
                  <li key={step.title}>
                    <span className="product-step-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ol>
              <aside className="product-agent-strip" aria-labelledby="esg-agent-title">
                <Bot size={27} aria-hidden="true" />
                <div>
                  <span className="product-status-label">{t('common.planned')}</span>
                  <h3 id="esg-agent-title">{t('esg.agent.title')}</h3>
                  <p>{t('esg.agent.description')}</p>
                  <p className="product-caption">{t('esg.agent.status')}</p>
                </div>
              </aside>
            </div>
          </details>
        </div>
      </section>
      <section className="product-section" aria-labelledby="esg-faq-title">
        <div className="container product-faq-layout">
          <div className="product-section-heading">
            <p className="product-eyebrow">{t('common.faqEyebrow')}</p>
            <h2 id="esg-faq-title">{t('esg.faqTitle')}</h2>
          </div>
          <div className="product-faq">
            {questions.map((question) => (
              <details key={question.title}>
                <summary>{question.title}</summary>
                <p>{question.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
