import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw } from 'lucide-react';
import { useInView, prefersReducedMotion } from './motion';
import { SCAN_ITEMS, VERDICT_COLORS } from './scanItems';

const SWEEP_MS = 3600;
const STEP_MS = SWEEP_MS / SCAN_ITEMS.length;

// A beam sweeps across six items; each gets its rule stamp as the beam passes.
// Tapping an item shows the reason. Rules, not model output.
const ScanRow = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.45, once: true });
  const reduced = prefersReducedMotion();
  const [stamped, setStamped] = useState(0);
  const [run, setRun] = useState(0);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (!inView || reduced) return;
    const timers = SCAN_ITEMS.map((_, i) =>
      setTimeout(() => setStamped(i + 1), Math.round((i + 0.6) * STEP_MS)));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced, run]);

  const shown = reduced ? SCAN_ITEMS.length : stamped;
  const sweeping = !reduced && inView && shown < SCAN_ITEMS.length;
  const replay = () => { setStamped(0); setRun(r => r + 1); };
  const pickedItem = picked === null ? null : SCAN_ITEMS[picked];

  return (
    <div ref={ref} className="scanrow">
      <div className="scanrow-track">
        {sweeping && <span key={run} className="scanrow-beam" style={{ animationDuration: `${SWEEP_MS}ms` }} />}
        {SCAN_ITEMS.map((it, i) => {
          const done = i < shown;
          const color = done ? VERDICT_COLORS[it.verdict] : 'var(--text-3)';
          const { Icon } = it;
          return (
            <button
              key={it.id}
              type="button"
              className={`scanrow-item${done ? ' is-done' : ''}${picked === i ? ' is-picked' : ''}`}
              onClick={() => setPicked(i)}
              aria-pressed={picked === i}
            >
              <span className="scanrow-icon" style={{ color }}><Icon width="100%" height="100%" /></span>
              <span className="scanrow-name">{t(`home.scan.items.${it.id}`)}</span>
              <span className="scanrow-stamp" style={{ color, borderColor: done ? color : 'transparent' }}>
                {done ? t(`home.scan.${it.verdict}`) : '·'}
              </span>
            </button>
          );
        })}
      </div>
      <div className="scanrow-foot">
        <p className="scanrow-reason" aria-live="polite">
          {pickedItem
            ? <><strong style={{ color: VERDICT_COLORS[pickedItem.verdict], marginRight: 12 }}>{t(`home.scan.items.${pickedItem.id}`)}{pickedItem.material ? ` · ${pickedItem.material}` : ''}</strong>{t(`home.scan.${pickedItem.reason}`)}</>
            : t('home.scan.hint')}
        </p>
        {!reduced && shown === SCAN_ITEMS.length && (
          <button type="button" className="ghost-btn" onClick={replay}>
            <RotateCcw size={14} /> {t('home.vision.replay')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ScanRow;
