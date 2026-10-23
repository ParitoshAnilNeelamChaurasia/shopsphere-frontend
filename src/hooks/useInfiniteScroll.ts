import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (onLoadMore: () => void, enabled = true) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return undefined;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) onLoadMore();
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, onLoadMore]);

  return ref;
};
