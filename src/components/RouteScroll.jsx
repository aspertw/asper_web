import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    let target;
    try {
      target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    } catch {
      target = null;
    }
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}
