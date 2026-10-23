import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView, prefersReducedMotion } from './motion';
import { FactoryIcon, PhoneIcon, ReactorIcon, FeedstockIcon, BinIcon } from './Illustrations';

// SMIL needs literal colours; these match --text-2, --accent and --stop in index.css.
const NEUTRAL = '#8FA39A';
const ACCENT = '#5BE49B';
const STOP = '#FF6B6B';
const SPEED = 110; // px per second along the pipe
const PARTICLES = 10;
const STOPPED = new Set([2, 6]); // about one in five pieces gets stopped at the judgment step

const LAYOUTS = {
  horizontal: {
    viewBox: '0 0 1000 320',
    nodes: [
      { id: 'site', Icon: FactoryIcon, x: 110, y: 160 },
      { id: 'asper', Icon: PhoneIcon, x: 380, y: 160 },
      { id: 'plant', Icon: ReactorIcon, x: 650, y: 160 },
      { id: 'out', Icon: FeedstockIcon, x: 890, y: 160 },
    ],
    label: (n) => ({ x: n.x, y: n.y + 78, anchor: 'middle' }),
    segments: ['M166 160H324', 'M436 160H594', 'M706 160H834'],
    branch: 'M380 104V64',
    bin: { x: 380, y: 34, labelX: 414, labelY: 40, anchor: 'start' },
    pass: { d: 'M110 160H890', length: 780 },
    stop: { d: 'M110 160H380V34', length: 396 },
    judgeAt: 270, plantAt: 540,
  },
  vertical: {
    viewBox: '0 0 320 820',
    nodes: [
      { id: 'site', Icon: FactoryIcon, x: 90, y: 80 },
      { id: 'asper', Icon: PhoneIcon, x: 90, y: 290 },
      { id: 'plant', Icon: ReactorIcon, x: 90, y: 500 },
      { id: 'out', Icon: FeedstockIcon, x: 90, y: 710 },
    ],
    label: (n) => ({ x: n.x + 66, y: n.y - 6, anchor: 'start' }),
    segments: ['M90 136V234', 'M90 346V444', 'M90 556V654'],
    branch: 'M90 346V370H230',
    bin: { x: 256, y: 370, labelX: 256, labelY: 418, anchor: 'middle' },
    pass: { d: 'M90 80V710', length: 630 },
    stop: { d: 'M90 80V370H256', length: 456 },
    judgeAt: 210, plantAt: 420,
  },
};

const Pipeline = ({ layout, lit, running, animate }) => {
  const { t } = useTranslation();
  const svgRef = useRef(null);
  const L = LAYOUTS[layout];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg?.pauseAnimations) return;
    if (running) svg.unpauseAnimations(); else svg.pauseAnimations();
  }, [running]);

  const particle = (i) => {
    const stopped = STOPPED.has(i);
    const path = stopped ? L.stop : L.pass;
    const dur = path.length / SPEED;
    const begin = `${(i * L.pass.length) / SPEED / PARTICLES}s`;
    const judged = (L.judgeAt / path.length).toFixed(3);
    const after = (Math.min(L.judgeAt + 12, path.length) / path.length).toFixed(3);
    const madeAt = (L.plantAt / path.length).toFixed(3);
    const madeAfter = (Math.min(L.plantAt + 12, path.length) / path.length).toFixed(3);
    return (
      <circle key={i} r="4" fill={NEUTRAL} opacity="0">
        <set attributeName="opacity" to="1" begin={begin} />
        <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={path.d} />
        <animate attributeName="fill" dur={`${dur}s`} begin={begin} repeatCount="indefinite"
          values={`${NEUTRAL};${NEUTRAL};${stopped ? STOP : ACCENT};${stopped ? STOP : ACCENT}`}
          keyTimes={`0;${judged};${after};1`} />
        {!stopped && (
          <animate attributeName="r" dur={`${dur}s`} begin={begin} repeatCount="indefinite"
            values="4;4;6;6" keyTimes={`0;${madeAt};${madeAfter};1`} />
        )}
      </circle>
    );
  };

  return (
    <svg ref={svgRef} viewBox={L.viewBox} className={`pipe pipe-${layout}${lit ? ' is-on' : ''}`} role="img"
      aria-label={L.nodes.map(n => t(`home.pipe.${n.id}`)).join(' → ')}>
      {L.segments.map((d, i) => <path key={d} d={d} className="pipe-seg" style={{ '--i': i }} />)}
      <path d={L.branch} className="pipe-branch" />
      {animate && Array.from({ length: PARTICLES }, (_, i) => particle(i))}

      <g className="pipe-bin">
        <rect x={L.bin.x - 26} y={L.bin.y - 26} width="52" height="52" rx="12" className="pipe-node-bg" />
        <BinIcon x={L.bin.x - 18} y={L.bin.y - 18} width="36" height="36" style={{ color: STOP }} />
        <text x={L.bin.labelX} y={L.bin.labelY} textAnchor={L.bin.anchor} className="pipe-bin-label">{t('home.pipe.stopped')}</text>
      </g>

      {L.nodes.map((n, i) => {
        const lab = L.label(n);
        const sub = n.id === 'plant' ? t('home.pipe.plantSub') : null;
        return (
          <g key={n.id} className="pipe-node" style={{ '--i': i }}>
            <rect x={n.x - 56} y={n.y - 56} width="112" height="112" rx="24" className="pipe-node-bg" />
            <n.Icon x={n.x - 36} y={n.y - 36} width="72" height="72" className="pipe-icon" />
            <text x={lab.x} y={lab.y} textAnchor={lab.anchor} className="pipe-label">{t(`home.pipe.${n.id}`)}</text>
            {sub && <text x={lab.x} y={lab.y + 22} textAnchor={lab.anchor} className="pipe-sub">{sub}</text>}
          </g>
        );
      })}
    </svg>
  );
};

const FlowPipeline = () => {
  const ref = useRef(null);
  // Nodes light up once; the moving pieces only run while the diagram is on screen
  const seen = useInView(ref, { threshold: 0.3, once: true });
  const inView = useInView(ref, { threshold: 0.1 });
  const animate = !prefersReducedMotion();

  return (
    <div ref={ref} className="pipe-wrap">
      <Pipeline layout="horizontal" lit={seen} running={inView} animate={animate} />
      <Pipeline layout="vertical" lit={seen} running={inView} animate={animate} />
    </div>
  );
};

export default FlowPipeline;
