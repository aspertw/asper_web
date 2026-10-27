import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './motion';

// Fades content up when it scrolls into view. Content is visible by default;
// the hidden state is only added once JS runs and motion is allowed.
const Reveal = ({ children, delay = 0, className = '', style }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || prefersReducedMotion()) return;
    el.classList.add('reveal');
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('reveal-in');
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}>
      {children}
    </div>
  );
};

export default Reveal;
