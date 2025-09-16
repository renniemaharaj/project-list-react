import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /**
   * How long (ms) to ignore further intersection updates after the
   * first update is received. Default: 150
   */
  windowMs?: number;
  threshold?: number | number[];
  rootMargin?: string;
};

export function useInView<T extends HTMLElement>({
  windowMs = 150,
  threshold = 0.5,
  rootMargin = "100px",
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setInView] = useState(false);

  // blocks further updates while true
  const blockedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // If we're inside the "window" ignore successive updates
        if (blockedRef.current) return;

        // Accept the current update (leading edge)
        setInView(entry.isIntersecting);

        // Block further updates for the configured window
        blockedRef.current = true;
        timeoutRef.current = setTimeout(() => {
          blockedRef.current = false;
          timeoutRef.current = null;
        }, windowMs);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      observer.disconnect();
    };
  }, [windowMs, threshold, rootMargin]);

  return { ref, isInView };
}
