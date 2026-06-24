"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Measures the width of a container element and updates on resize.
 * Returns [ref callback, measuredWidth].
 * Falls back to a sensible default (600px) until measured.
 */
export function useChartWidth(fallback = 600): [
  (el: HTMLDivElement | null) => void,
  number
] {
  const [width, setWidth] = useState(fallback);
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  const ref = useCallback((node: HTMLDivElement | null) => {
    setEl(node);
  }, []);

  useEffect(() => {
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setWidth(w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);

  return [ref, width];
}
