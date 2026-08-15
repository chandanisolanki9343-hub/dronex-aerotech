import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stacked-card pinning scroll effect.
 *
 * Each `.pin-section` pins when its full content is revealed in the viewport
 * while the next section slides up and overlaps it. As a section gets covered,
 * it scales down slightly (to 0.93) and a translucent dark veil fades in over it.
 *
 * @param {React.RefObject} containerRef – ref on the wrapper <div>
 * @param {Array} deps – optional dependency array to re-init on dynamic data load
 */
export function useStackedScroll(containerRef, deps = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".pin-section");
      if (sections.length < 2) return;

      sections.forEach((section, i) => {
        const isLast = i === sections.length - 1;
        if (isLast) return;

        const nextSection = sections[i + 1];
        const overlay = section.querySelector(".pin-overlay");

        /* ── Pin current section ── */
        /* If section content is taller than viewport, pin when bottom reaches viewport bottom */
        ScrollTrigger.create({
          trigger: section,
          start: () =>
            section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
          endTrigger: nextSection,
          end: "top top",
          pin: true,
          pinSpacing: false,
          id: `pin-${i}`,
          invalidateOnRefresh: true,
        });

        /* ── Scale + dark-veil animation as NEXT section scrolls over ── */
        gsap.to(section, {
          scale: 0.93,
          borderRadius: "24px",
          ease: "none",
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (overlay) {
          gsap.to(overlay, {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: nextSection,
              start: "top bottom",
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
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
