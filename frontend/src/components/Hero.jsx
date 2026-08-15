import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./Hero.css";

function Hero() {
  const heroRef      = useRef(null);
  const cursorBtnRef = useRef(null);

  /* ── Floating cursor "Join Club" button ─────────────── */
  useEffect(() => {
    const hero = heroRef.current;
    const btn  = cursorBtnRef.current;
    if (!hero || !btn) return;

    let mouseX = 0, mouseY = 0;
    let posX   = 0, posY   = 0;
    let lastClientX = 0, lastClientY = 0;
    let rafId  = null;
    let active = false;
    let isVisible = false;

    const tick = () => {
      if (!active) return;
      posX += (mouseX - posX) * 0.07;
      posY += (mouseY - posY) * 0.07;
      const rotation = (mouseX - posX) * 0.04;
      gsap.set(btn, {
        x: posX,
        y: posY,
        rotation: rotation,
        transformOrigin: "center center"
      });

      /* Check collision with hero text container (.hero-left) */
      const heroLeft = hero.querySelector(".hero-left");
      let isOverText = false;
      if (heroLeft) {
        const leftRect = heroLeft.getBoundingClientRect();
        const btnWidth = btn.offsetWidth || 120;
        const btnHeight = btn.offsetHeight || 50;

        const r = hero.getBoundingClientRect();
        const btnLeft = r.left + posX;
        const btnRight = btnLeft + btnWidth;
        const btnTop = r.top + posY;
        const btnBottom = btnTop + btnHeight;

        const isOverlappingText = !(
          btnRight < leftRect.left - 15 ||
          btnLeft > leftRect.right + 15 ||
          btnBottom < leftRect.top - 15 ||
          btnTop > leftRect.bottom + 15
        );

        const isCursorOverText = (
          lastClientX >= leftRect.left - 15 &&
          lastClientX <= leftRect.right + 15 &&
          lastClientY >= leftRect.top - 15 &&
          lastClientY <= leftRect.bottom + 15
        );

        isOverText = isOverlappingText || isCursorOverText;
      }

      const shouldBeVisible = !isOverText;
      if (shouldBeVisible !== isVisible) {
        isVisible = shouldBeVisible;
        if (shouldBeVisible) {
          gsap.to(btn, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            onStart: () => { btn.style.pointerEvents = "auto"; }
          });
        } else {
          gsap.to(btn, {
            opacity: 0,
            scale: 0.7,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => { btn.style.pointerEvents = "none"; }
          });
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;

      const r = hero.getBoundingClientRect();
      const offsetX = 55;
      const offsetY = 20;
      mouseX = e.clientX - r.left - btn.offsetWidth / 2 + offsetX;
      mouseY = e.clientY - r.top - btn.offsetHeight / 2 + offsetY;

      const maxX = r.width - btn.offsetWidth - 18;
      const maxY = r.height - btn.offsetHeight - 18;

      mouseX = Math.min(Math.max(mouseX, 18), maxX);
      mouseY = Math.min(Math.max(mouseY, 18), maxY);
    };

    const onEnter = () => {
      active = true;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      active = false;
      isVisible = false;
      cancelAnimationFrame(rafId);
      gsap.to(btn, {
        opacity: 0,
        scale: 0.7,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => { btn.style.pointerEvents = "none"; }
      });
    };

    hero.addEventListener("mousemove",  onMove);
    hero.addEventListener("mouseenter", onEnter);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove",  onMove);
      hero.removeEventListener("mouseenter", onEnter);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>

      {/* ── Floating cursor button (interactive Link) ── */}
      <Link to="/recruitment" className="hero-cursor-btn" ref={cursorBtnRef}>
        <span className="hero-cursor-btn__arrow">✦</span>
        <span className="hero-cursor-btn__label">Join Club</span>
      </Link>

      {/* ── Left Column: Headline + text + buttons ────────────────────── */}
      <div className="hero-left">

        <div className="welcome-box">
          <span className="welcome-dot" /> Welcome to Dronex AeroTech
        </div>

        <h1>
          Save &amp; Explore <br />
          Ideas that <span className="text-accent-gradient">Inspire</span> <br />
          <span className="text-accent-gradient">Innovation.</span>
        </h1>

        <p>
          Discover drone technology, aerospace research,
          robotics projects, events and innovations developed
          by the members of Dronex AeroTech.
        </p>

        <div className="hero-buttons">
          <Link
            to="/projects"
            className="btn btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            Explore Projects &rarr;
          </Link>

          <Link to="/recruitment" className="btn btn-secondary">
            Register Now
          </Link>

          <Link to="/admin-login" className="btn btn-secondary">
            Admin Login
          </Link>
        </div>

      </div>

      {/* ── Right Column: Reserved Space for future components ── */}
      <div className="hero-right">
        {/* Reserved for future right-side element */}
      </div>

    </section>
  );
}

export default Hero;