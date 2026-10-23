import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from './motion';

const NODES = [
  { id: 'up', color: '#94A3B8' },
  { id: 'asper', color: '#4285F4' },
  { id: 'down', color: '#34A853', note: true },
  { id: 'out', color: '#34A853' },
];

// Upstream site → Asper's judgment → affiliate's pyrolysis plant → feedstock.
// Nodes light up one after another when the diagram scrolls into view.
const ValueChainFlow = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, once: true });

  return (
    <div ref={ref} className={`flow${inView ? ' flow-on' : ''}`}>
      {NODES.map((node, i) => (
        <div key={node.id} className="flow-step" style={{ '--i': i }}>
          {i > 0 && <div className="flow-link" aria-hidden="true"><span className="flow-dot" /></div>}
          <div className="flow-node" style={{ '--node-color': node.color }}>
            <div className="flow-node-label">{t(`home.flow.${node.id}.label`)}</div>
            <div className="flow-node-title">{t(`home.flow.${node.id}.title`)}</div>
            {node.note && <div className="flow-node-note">{t(`home.flow.${node.id}.note`)}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ValueChainFlow;
