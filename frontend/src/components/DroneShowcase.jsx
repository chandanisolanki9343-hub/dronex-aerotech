import React, { useEffect, useRef } from "react";
import "./DroneShowcase.css";

/* ── Easy customization ──────────────────────────────────── */

const COMPONENT_CALLOUTS = [
  {
    label: "Flight Controller",
    name: "Pixhawk Cube Orange",
    desc: "Triple-redundant IMU, CAN bus, ArduCopter firmware",
  },
  {
    label: "Propulsion",
    name: "Hexsoon EDU-450 Motors",
    desc: "980 KV brushless, 40A ESCs, 10-inch props",
  },
  {
    label: "Navigation",
    name: "Here3+ GPS / GNSS",
    desc: "RTK-ready, CAN bus, 10 Hz position update",
  },
  {
    label: "Telemetry",
    name: "SkyDroid T12 / SiK Radio",
    desc: "915 MHz link, MAVLink, 1–3 km range",
  },
];

const SPECS = [
  { value: "6", key: "Motors" },
  { value: "~4kg", key: "MTOW" },
  { value: "18min", key: "Endurance" },
  { value: "3km", key: "Link Range" },
];

/* ─────────────────────────────────────────────────────────── */

function DroneShowcase() {
  const contentRef = useRef(null);

  /* Intersection Observer – animate content in on scroll */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Scan-ring tick positions */
  const TICK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <section className="drone-showcase" aria-label="Our Own Build drone showcase">

      {/* ── Main stage ─────────────────────────────────── */}
      <div className="showcase-stage">

        {/* Ken Burns background photo */}
        <div className="showcase-photo-layer" aria-hidden="true">
          <img
            src="/drone-showcase-bg.jpg"
            alt="Dronex AeroTech custom-built hexacopter"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Dark gradient overlay */}
        <div className="showcase-overlay" aria-hidden="true" />

        {/* Rotating scan rings (decorative) */}
        <div className="scan-ring-container" aria-hidden="true">
          <div className="scan-ring scan-ring-1" />
          <div className="scan-ring scan-ring-2" />
          <div className="scan-ring scan-ring-3" />
          <div className="scan-sweep" />

          {TICK_ANGLES.map((angle) => (
            <div
              key={angle}
              className="scan-tick"
              style={{ transform: `translateX(-50%) rotate(${angle}deg) translateX(225px)` }}
            />
          ))}
        </div>

        {/* ── Content panel ────────────────────────────── */}
        <div className="showcase-content" ref={contentRef}>

          {/* Live badge */}
          <div className="live-badge">
            <span className="live-dot" />
            <span className="live-text">Student Built · Field Ready</span>
          </div>

          {/* Heading */}
          <h2 className="showcase-heading">
            Engineered by <em>Students.</em>
            <br />
            Flown in the <em>Field.</em>
          </h2>

          {/* Body copy */}
          <p className="showcase-description">
            Every component chosen, wired, and calibrated by Dronex AeroTech
            members. Powered by ArduPilot and professional-grade hardware,
            this hexacopter is the centrepiece of our R&amp;D programme.
          </p>

          {/* Component callouts */}
          <div className="callouts-grid">
            {COMPONENT_CALLOUTS.map((c, i) => (
              <div className="callout-card" key={i}>
                <div className="callout-info">
                  <span className="callout-label">{c.label}</span>
                  <span className="callout-name">{c.name}</span>
                  <span className="callout-desc">{c.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Spec strip */}
          <div className="spec-strip">
            {SPECS.map((s, i) => (
            <React.Fragment key={s.key}>
              <div className="spec-item">
                <span className="spec-value">{s.value}</span>
                <span className="spec-key">{s.key}</span>
              </div>
              {i < SPECS.length - 1 && (
                <div className="spec-divider" />
              )}
            </React.Fragment>
          ))}
          </div>
        </div>

        {/* Bottom glow strip */}
        <div className="showcase-bottom-strip" aria-hidden="true" />
      </div>

    </section>
  );
}

export default DroneShowcase;
