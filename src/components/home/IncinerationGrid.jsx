import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw } from 'lucide-react';
import { useInView, prefersReducedMotion } from './motion';

// 100 dots; 50 stand for the ~50.11% sent to incineration (the caption carries the exact figure).
const DOTS = 100;
const HALF = 50;
const STAGGER_MS = 24;
const GOAL_DELAY_MS = HALF * STAGGER_MS + 1600;

const IncinerationGrid = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.5, once: true });
  const reduced = prefersReducedMotion();
  // 0: not started, 1: half burned (today), 2: half back as feedstock (the goal)
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const toBurn = setTimeout(() => setPhase(1), 200);
    const toGoal = setTimeout(() => setPhase(2), 200 + GOAL_DELAY_MS);
    return () => { clearTimeout(toBurn); clearTimeout(toGoal); };
  }, [inView, reduced, run]);

  const shown = reduced ? 1 : phase;
  const replay = () => { setPhase(0); setRun(r => r + 1); };

  return (
    <div ref={ref} className="burn">
      <div className="burn-grid" aria-hidden="true">
        {Array.from({ length: DOTS }, (_, i) => {
          const inHalf = i < HALF;
          const color = !inHalf || shown === 0 ? '#16251F' : shown === 1 ? 'var(--stop)' : 'var(--accent)';
          return (
            <span
              key={i}
              className="burn-dot"
              style={{ background: color, transitionDelay: reduced || !inHalf ? '0ms' : `${i * STAGGER_MS}ms` }}
            />
          );
        })}
      </div>
      <div className="burn-legend">
        <p className={`burn-line${shown >= 1 ? ' is-on' : ''}`}>
          <span className="burn-swatch" style={{ background: 'var(--stop)' }} />{t('home.vision.line1')}
        </p>
        <p className={`burn-line${shown >= 2 || reduced ? ' is-on' : ''}`}>
          <span className="burn-swatch" style={{ background: 'var(--accent)' }} />{t('home.vision.line2')}
        </p>
        {!reduced && phase === 2 && (
          <button type="button" className="ghost-btn burn-replay" onClick={replay}>
            <RotateCcw size={14} /> {t('home.vision.replay')}
          </button>
        )}
      </div>
    </div>
  );
};

export default IncinerationGrid;
