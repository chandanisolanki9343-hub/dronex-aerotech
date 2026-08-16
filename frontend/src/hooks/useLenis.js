/**
 * Lenis smooth scroll — fast and clean.
 * Also resets body overflow on mount so a previous page's modal
 * lock doesn't bleed through on navigation.
 */
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
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

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
