import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView, prefersReducedMotion } from './motion';
import { LidIcon, SortIcon, ReactorIcon } from './Illustrations';

// Product roadmap, drawn after the 2026-11 roadmap slide: intake (ASPER Gate) → sorting line
// (ASPER Sort) → reuse plant. Solid = the material path; dashed = the data path. Screening images
// from Gate and sorting data from after Sort both flow back to train the sorting model.
// No status labels and no digital twin on the website, by Jasper's call.

// SMIL needs literal colours; these match --text-2, --accent and --stop in index.css.
const NEUTRAL = '#8FA39A';
const ACCENT = '#5BE49B';
const STOP = '#FF6B6B';
const SPEED = 120; // px per second along the material path
const PARTICLES = 8;
const STOPPED = new Set([2, 6]); // illustrative only: some items are turned away at the lid

const NODES = [
  { id: 'gate', Icon: LidIcon, key: true },
  { id: 'sort', Icon: SortIcon, key: true },
  { id: 'plant', Icon: ReactorIcon },
];

const LAYOUTS = {
  horizontal: {
    viewBox: '0 0 1000 450',
    at: { gate: [170, 170], sort: [525, 170], plant: [870, 170] },
    name: (x, y) => ({ x, y: y - 96, anchor: 'middle' }),
    extra: (x, y) => ({ x, y: y + 84, anchor: 'middle' }),
    input: { d: 'M24 170H106', label: { x: 24, y: 156, anchor: 'start' } },
    material: [
      { d: 'M226 170H461', label: { x: 343, y: 156, anchor: 'middle' }, key: 'accepted' },
      { d: 'M581 170H806', label: { x: 694, y: 156, anchor: 'middle' }, key: 'sorted' },
    ],
    classes: { x: 600, y: 194, anchor: 'start' },
    reject: {
      d: 'M262 170V310M262 250H284M262 310H284',
      labels: [
        { x: 294, y: 255, key: 'notPlastic' },
        { x: 294, y: 315, key: 'rejected' },
        { x: 294, y: 337, key: 'rejectedTypes' },
      ],
    },
    data: [
      { d: 'M170 226V400H525', label: { x: 300, y: 390, anchor: 'middle' }, key: 'imagesData' },
      { d: 'M740 170V400H525', label: { x: 650, y: 390, anchor: 'middle' }, key: 'sortData' },
    ],
    train: { d: 'M525 400V234', label: { x: 537, y: 320, anchor: 'start' } },
    tap: [740, 170],
    pass: { d: 'M24 170H870', length: 846 },
    stop: { d: 'M24 170H262V310H284', length: 400 },
    judgeAt: 200, plantAt: 790,
    legend: { x: 790, y: 300, stacked: true },
  },
  vertical: {
    viewBox: '0 0 360 1010',
    at: { gate: [70, 130], sort: [70, 500], plant: [70, 860] },
    name: (x, y) => ({ x: x + 76, y: y - 8, anchor: 'start' }),
    extra: (x, y) => ({ x: x + 76, y: y + 36, anchor: 'start' }),
    input: { d: 'M70 10V66', label: { x: 82, y: 34, anchor: 'start' } },
    material: [
      { d: 'M70 186V436', label: { x: 82, y: 400, anchor: 'start' }, key: 'accepted' },
      { d: 'M70 556V796', label: { x: 82, y: 660, anchor: 'start' }, key: 'sorted' },
    ],
    classes: { x: 146, y: 534, anchor: 'start' },
    reject: {
      d: 'M70 222H104M104 222V306M104 260H124M104 306H124',
      labels: [
        { x: 132, y: 265, key: 'notPlastic' },
        { x: 132, y: 304, key: 'rejected' },
        { x: 132, y: 324, key: 'rejectedTypes' },
      ],
    },
    data: [
      { d: 'M126 166H330V470', label: { x: 318, y: 190, anchor: 'end' }, key: 'imagesData' },
      { d: 'M70 720H330V470', label: { x: 318, y: 708, anchor: 'end' }, key: 'sortData' },
    ],
    train: { d: 'M330 470H134', label: { x: 318, y: 458, anchor: 'end' } },
    tap: [70, 720],
    pass: { d: 'M70 10V860', length: 850 },
    stop: { d: 'M70 10V222H104V306H124', length: 350 },
    judgeAt: 180, plantAt: 794,
    legend: { x: 14, y: 990 },
  },
};

const Pipeline = ({ layout, lit, running, animate }) => {
  const { t } = useTranslation();
  const svgRef = useRef(null);
  const L = LAYOUTS[layout];
  const arrowId = `pipe-arrow-${layout}`;
  const dataArrowId = `pipe-data-arrow-${layout}`;

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
    const judged = (Math.min(L.judgeAt, path.length - 12) / path.length).toFixed(3);
    const after = (Math.min(L.judgeAt + 12, path.length) / path.length).toFixed(3);
    const madeAt = (Math.min(L.plantAt, path.length) / path.length).toFixed(3);
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

  const label = (l, text, className) => (
    <text x={l.x} y={l.y} textAnchor={l.anchor || 'start'} className={className}>{text}</text>
  );

  return (
    <svg ref={svgRef} viewBox={L.viewBox} className={`pipe pipe-${layout}${lit ? ' is-on' : ''}`} role="img"
      aria-label={NODES.map(n => t(`home.pipe.${n.id}`)).join(' → ')}>
      <defs>
        <marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M1 1L8 5L1 9" className="pipe-arrowhead" />
        </marker>
        <marker id={dataArrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M1 1L8 5L1 9" className="pipe-data-arrowhead" />
        </marker>
      </defs>

      {/* Material path */}
      <path d={L.input.d} pathLength="1" className="pipe-seg pipe-input" style={{ '--i': 0 }} markerEnd={`url(#${arrowId})`} />
      {label(L.input.label, t('home.pipe.input'), 'pipe-path-label')}
      {L.material.map((m, i) => (
        <g key={m.d}>
          <path d={m.d} pathLength="1" className="pipe-seg" style={{ '--i': i + 1 }} markerEnd={`url(#${arrowId})`} />
          {label(m.label, t(`home.pipe.${m.key}`), 'pipe-path-label')}
        </g>
      ))}
      {label(L.classes, t('home.pipe.classes'), 'pipe-classes')}

      {/* Items turned away at the lid */}
      <path d={L.reject.d} className="pipe-reject" />
      {L.reject.labels.map(l => (
        <text key={l.key} x={l.x} y={l.y} className={l.key === 'rejectedTypes' ? 'pipe-reject-types' : 'pipe-reject-label'}>
          {t(`home.pipe.${l.key}`)}
        </text>
      ))}

      {/* Data path: both streams train the sorting model */}
      {L.data.map(({ d, label: l, key }) => (
        <g key={d}>
          <path d={d} className="pipe-data" />
          {label(l, t(`home.pipe.${key}`), 'pipe-data-label')}
        </g>
      ))}
      <path d={L.train.d} className="pipe-data" markerEnd={`url(#${dataArrowId})`} />
      {label(L.train.label, t('home.pipe.train'), 'pipe-data-label')}
      <circle cx={L.tap[0]} cy={L.tap[1]} r="5" className="pipe-tap" />

      {animate && Array.from({ length: PARTICLES }, (_, i) => particle(i))}

      {NODES.map((n, i) => {
        const [x, y] = L.at[n.id];
        const nm = L.name(x, y);
        const ex = L.extra(x, y);
        return (
          <g key={n.id} className={`pipe-node${n.key ? ' is-key' : ''}`} style={{ '--i': i }}>
            <rect x={x - 56} y={y - 56} width="112" height="112" rx="24" className="pipe-node-bg" />
            <n.Icon x={x - 36} y={y - 36} width="72" height="72" className="pipe-icon" />
            <text x={nm.x} y={nm.y} textAnchor={nm.anchor} className="pipe-label">{t(`home.pipe.${n.id}`)}</text>
            <text x={nm.x} y={nm.y + 22} textAnchor={nm.anchor} className="pipe-sub">{t(`home.pipe.${n.id}Sub`)}</text>
            {n.id === 'plant' && (
              <text x={ex.x} y={ex.y} textAnchor={ex.anchor} className="pipe-extra">{t('home.pipe.plantSoftware')}</text>
            )}
          </g>
        );
      })}

      <g className="pipe-legend" transform={`translate(${L.legend.x} ${L.legend.y})`}>
        <path d="M0 -5H28" className="pipe-legend-solid" />
        <text x="38" y="0" className="pipe-legend-text">{t('home.pipe.materialPath')}</text>
        <g transform={L.legend.stacked ? 'translate(0 30)' : 'translate(150 0)'}>
          <path d="M0 -5H28" className="pipe-legend-dashed" />
          <text x="38" y="0" className="pipe-legend-text">{t('home.pipe.dataPath')}</text>
        </g>
      </g>
    </svg>
  );
};

const FlowPipeline = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  // Nodes light up once; the moving pieces only run while the diagram is on screen
  const seen = useInView(ref, { threshold: 0.3, once: true });
  const inView = useInView(ref, { threshold: 0.1 });
  const animate = !prefersReducedMotion();

  return (
    <>
      <div ref={ref} className="pipe-wrap">
        <Pipeline layout="horizontal" lit={seen} running={inView} animate={animate} />
        <Pipeline layout="vertical" lit={seen} running={inView} animate={animate} />
      </div>
      <div className="products">
        {['gate', 'sort'].map(id => (
          <div key={id} className="product">
            <h3 className="product-name">
              {t(`home.pipe.${id}`)}
              <span className="product-kind">{t(`home.products.${id}Kind`)}</span>
            </h3>
            <p className="product-line">{t(`home.products.${id}Line`)}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlowPipeline;
