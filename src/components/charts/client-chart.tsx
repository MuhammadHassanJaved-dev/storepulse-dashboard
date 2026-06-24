"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Renders children only after the browser has painted and measured the container.
 * This guarantees Recharts gets a real pixel width — never 0.
 */
export function ClientChart({
  children,
  height = 300,
}: {
  children: (width: number) => React.ReactNode;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      const w = containerRef.current?.offsetWidth ?? 0;
      if (w > 0) setWidth(w);
    };

    // Use double-rAF to ensure layout is complete
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });

    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(id);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height }}>
      {width !== null && children(width)}
    </div>
  );
}
