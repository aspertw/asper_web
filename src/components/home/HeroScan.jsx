import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView, prefersReducedMotion } from './motion';
import { SCAN_ITEMS, VERDICT_COLORS } from './scanItems';

// Illustration, not a live demo: a phone frame cycles through items,
// a scan line passes over each one, then the rule's tag appears.
const ORDER = ['bento', 'bottle', 'pipe', 'bag', 'carton', 'foam'];
const CYCLE_MS = 3200;

const HeroScan = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const reduced = prefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setTimeout(() => setStep(s => (s + 1) % ORDER.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [inView, reduced, step]);

  const item = SCAN_ITEMS.find(it => it.id === ORDER[step]);
  const color = VERDICT_COLORS[item.verdict];
  const label = `${t(`home.scan.${item.verdict}`)} · ${item.material ?? t(`home.scan.items.${item.id}`)}`;
  const { Icon } = item;

  return (
    <div ref={ref} className={`hero-scan${reduced ? ' is-static' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 240 440" className="hero-phone">
        <defs>
          <linearGradient id="scanGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.28" />
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="200" height="420" rx="32" className="hero-phone-body" />
        <rect x="95" y="24" width="50" height="8" rx="4" className="hero-phone-notch" />
        <rect x="34" y="44" width="172" height="290" rx="14" className="hero-phone-screen" />
        <path d="M54 86V70h16M186 86V70h-16M54 284v16h16M186 284v16h-16" className="hero-finder" />
        <g key={`item-${step}`} className="hero-item" style={{ color: 'var(--text)' }}>
          <Icon x="70" y="135" width="100" height="100" />
        </g>
        <g key={`scan-${step}`} className="hero-scanline">
          <rect x="46" y="-34" width="148" height="34" fill="url(#scanGlow)" />
          <rect x="46" y="0" width="148" height="2" fill="var(--accent)" />
        </g>
        <g key={`chip-${step}`} className="hero-chip">
          <rect x="50" y="350" width="140" height="42" rx="21" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="74" cy="371" r="5" fill={color} />
          <text x="128" y="377" textAnchor="middle" fill={color} className="hero-chip-text">{label}</text>
        </g>
        <rect x="95" y="410" width="50" height="4" rx="2" className="hero-phone-notch" />
      </svg>
    </div>
  );
};

export default HeroScan;
