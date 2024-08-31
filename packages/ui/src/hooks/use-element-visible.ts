/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

export const useElementVisible = (target: any, options = {} as IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      setIsIntersecting(entries[0].isIntersecting);
    };

    observer?.disconnect();

    if (target) {
      const _observer = new IntersectionObserver(callback, options);
      _observer.observe(target);
      setObserver(_observer);
    }

    return () => {
      observer?.disconnect();
    };
  }, [target, options.root, options.rootMargin, options.threshold]);

  return isIntersecting;
};
