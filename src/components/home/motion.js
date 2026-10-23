import { useEffect, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const canObserve = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

// True while the element is on screen. Without IntersectionObserver it stays true,
// so content and its end state still render.
export const useInView = (ref, { threshold = 0.3, once = false } = {}) => {
  const [inView, setInView] = useState(() => !canObserve());

  useEffect(() => {
    const el = ref.current;
    if (!el || !canObserve()) return;
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) io.disconnect();
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, once]);

  return inView;
};
