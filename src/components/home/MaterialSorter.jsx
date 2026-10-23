import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView, prefersReducedMotion } from './motion';

// Rule explainer, not model output: each item maps to a fixed accept/stop/redirect rule.
const VERDICTS = {
  accept: { color: '#34A853' },
  stop: { color: '#EA4335' },
  redirect: { color: '#FBBC05' },
};

const ITEMS = [
  { id: 'bag', code: 4, material: 'LDPE', verdict: 'accept', reason: 'reasonAccept' },
  { id: 'bento', code: 5, material: 'PP', verdict: 'accept', reason: 'reasonAccept' },
  { id: 'foam', code: 6, material: 'PS', verdict: 'accept', reason: 'reasonAccept' },
  { id: 'bottle', code: 1, material: 'PET', verdict: 'redirect', reason: 'reasonPET' },
  { id: 'pipe', code: 3, material: 'PVC', verdict: 'stop', reason: 'reasonPVC' },
  { id: 'carton', code: null, material: null, verdict: 'stop', reason: 'reasonFoil' },
];

const STEP_MS = 1800;

const ResinMark = ({ code, color }) => (
  code ? (
    <svg width="28" height="26" viewBox="0 0 28 26" aria-hidden="true">
      <path d="M14 2 L26 24 H2 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <text x="14" y="20" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={color}>{code}</text>
    </svg>
  ) : (
    <svg width="28" height="26" viewBox="0 0 28 26" aria-hidden="true">
      <rect x="3" y="4" width="22" height="18" rx="4" fill="none" stroke={color} strokeWidth="1.6" strokeDasharray="3 2" />
    </svg>
  )
);

const MaterialSorter = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const [selected, setSelected] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));
  const [touched, setTouched] = useState(false);

  // One unattended pass, only while on screen; stops for good on the first tap
  useEffect(() => {
    if (!inView || touched || selected >= ITEMS.length - 1 || prefersReducedMotion()) return;
    const id = setTimeout(() => {
      const next = selected + 1;
      setSelected(next);
      setSeen(s => new Set(s).add(next));
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [inView, touched, selected]);

  const pick = (i) => {
    setTouched(true);
    setSelected(i);
    setSeen(s => new Set(s).add(i));
  };

  const item = ITEMS[selected];
  const v = VERDICTS[item.verdict];

  return (
    <div ref={ref} className="sorter">
      <div className="sorter-grid" role="list">
        {ITEMS.map((it, i) => {
          const color = seen.has(i) ? VERDICTS[it.verdict].color : '#475569';
          const active = i === selected;
          return (
            <button
              key={it.id}
              type="button"
              role="listitem"
              onClick={() => pick(i)}
              aria-pressed={active}
              className={`sorter-chip${active ? ' is-active' : ''}`}
              style={{ borderColor: active ? color : undefined }}
            >
              <ResinMark code={it.code} color={color} />
              <span className="sorter-chip-name">{t(`home.sorter.items.${it.id}`)}</span>
              <span className="sorter-chip-mat">{it.material ?? '\u00a0'}</span>
            </button>
          );
        })}
      </div>

      <div className="sorter-panel" aria-live="polite">
        <div className="sorter-panel-label">{t('home.sorter.panelLabel')}</div>
        <div key={selected} className="sorter-verdict">
          <div className="sorter-verdict-word" style={{ color: v.color }}>{t(`home.sorter.${item.verdict}`)}</div>
          <div className="sorter-verdict-item">
            {t(`home.sorter.items.${item.id}`)}{item.material ? ` · ${item.material}` : ''}
          </div>
          <div className="sorter-verdict-reason">{t(`home.sorter.${item.reason}`)}</div>
        </div>
        <div className="sorter-hint">{touched ? ' ' : t('home.sorter.hint')}</div>
      </div>
    </div>
  );
};

export default MaterialSorter;
