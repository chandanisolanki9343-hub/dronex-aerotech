import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stacked-card pinning scroll effect.
 *
 * Each `.pin-section` is pinned at the top of the viewport while the next
 * section slides up and overlaps it. As a section gets covered, it scales
 * down slightly (to 0.96) and a translucent dark veil fades in over it,
 * giving the premium "stacked card" feel.
 *
 * @param {React.RefObject} containerRef  – ref on the wrapper <div> in Home
 */
export function useStackedScroll(containerRef, deps = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".pin-section");
      if (sections.length < 2) return;

      sections.forEach((section, i) => {
        const isLast = i === sections.length - 1;

        /* ── Pin each section (except the last – it stays static) ── */
        if (!isLast) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () =>
              `+=${sections[i + 1].offsetHeight}`,
            pin: true,
            pinSpacing: false,
            id: `pin-${i}`,
          });
        }

        /* ── Scale + dark-veil animation as NEXT section scrolls over ── */
        if (!isLast) {
          const overlay = section.querySelector(".pin-overlay");

          gsap.to(section, {
            scale: 0.92,
            borderRadius: "24px",
            ease: "none",
            scrollTrigger: {
              trigger: sections[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });

          if (overlay) {
            gsap.to(overlay, {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sections[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          }
        }
      });
      // Refresh after a short delay so the DOM has fully painted
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      // Also refresh on window resize
      window.addEventListener("resize", ScrollTrigger.refresh);

      return () => {
        clearTimeout(refreshTimer);
        window.removeEventListener("resize", ScrollTrigger.refresh);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, ...deps]);
}
