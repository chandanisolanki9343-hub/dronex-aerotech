/**
 * Lenis smooth scroll — fast and clean.
 * Also resets body overflow on mount so a previous page's modal
 * lock doesn't bleed through on navigation.
 * Uses ResizeObserver to dynamically recalculate scroll limits
 * when async API data or images load.
 */
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis(deps = []) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Reset any overflow lock left by a previous page (e.g. modal on TeamTrinetra)
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Auto-resize Lenis whenever page height changes (API data, images, DOM updates)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.resize();
    }
  }, deps);

  return lenisRef;
}
