import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLenis } from "../hooks/useLenis";
import { useStackedScroll } from "../hooks/useStackedScroll";
import "./TeamTrinetra.css";

function TeamTrinetra() {
  const stackRef = useRef(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useLenis();
  useStackedScroll(stackRef);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsImageModalOpen(false);
      }
    };
    if (isImageModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageModalOpen]);

  const stats = [
    { value: "17", label: "Global Flight Order" },
    { value: "1st", label: "International Team from M.P." },
    { value: "2", label: "Indian Teams Qualified" },
    { value: "₹12L", label: "Hardware Support" },
    { value: "8+", label: "National Newspaper Features" }
  ];

  const techCategories = [
    {
      num: "01",
      title: "Aerospace & Mechanical",
      skills: ["UAV Design & Aerodynamics", "Airframe Fabrication", "Advanced Aerial Robotics"]
    },
    {
      num: "02",
      title: "Avionics & Control",
      skills: ["Autonomous Flight Systems", "Flight Control Calibration", "Custom Ground Control Station"]
    },
    {
      num: "03",
      title: "Computing & Software",
      skills: ["Computer Vision & Target Detection", "AI System Integration", "Embedded Hardware & Mission Planning"]
    }
  ];

  const timelineSteps = [
    {
      step: "01",
      title: "DroneX AeroTech Club",
      desc: "Established at MITS Gwalior as a premier student-led UAV & aerospace initiative."
    },
    {
      step: "02",
      title: "Team Trinetra Formed",
      desc: "Created as the dedicated competitive technical arm for international aerial robotics challenges."
    },
    {
      step: "03",
      title: "Industry Backing",
      desc: "Secured ₹12 Lakhs in hardware and sponsorship support from leading industry partners."
    },
    {
      step: "04",
      title: "SUAS Qualification",
      desc: "Cleared rigorous international evaluation stages and achieved Flight Order #17."
    },
    {
      step: "05",
      title: "Current Phase",
      desc: "Final flight optimization and telemetry testing for deployment to Tulsa, Oklahoma, USA."
    }
  ];

  const teamMembers = [
    {
      name: "Parth Soni",
      role: "Team Lead & Aerospace Specialist",
      image: "/parth_soni.jpg"
    },
    {
      name: "Rishabh Dohare",
      role: "Avionics & Flight Operations Lead",
      image: null
    },
    {
      name: "Harshvardhan Kaushal",
      role: "Mechanical & Airframe Fabrication Lead",
      image: null
    },
    {
      name: "Ankit Gurjar",
      role: "AI & Computer Vision Specialist",
      image: null
    },
    {
      name: "Aryan Bhadoriya",
      role: "Embedded Systems & Controls Specialist",
      image: null
    },
    {
      name: "Kuldeep Shikarwar",
      role: "Ground Control Station Engineer",
      image: null
    },
    {
      name: "Moksh Dandotiya",
      role: "Autonomous Navigation & Software Engineer",
      image: null
    }
  ];

  const pipelineStages = [
    { name: "DESIGN", active: false, done: true },
    { name: "BUILD", active: false, done: true },
    { name: "TEST", active: false, done: true },
    { name: "QUALIFY", active: false, done: true },
    { name: "OPTIMIZE", active: true, done: false, isCurrent: true },
    { name: "USA", active: false, done: false }
  ];

  const mediaCoverage = [
    {
      title: "ETV Bharat Live Coverage",
      tag: "Broadcast Media",
      desc: "Live feature on MITS Gwalior's student UAV team qualifying for US International competition."
    },
    {
      title: "National Newspaper Spotlight",
      tag: "Print Media",
      desc: "Featured across 8+ national daily publications highlighting Flight Order #17 achievement."
    },
    {
      title: "State Aerospace Pioneer",
      tag: "Press Release",
      desc: "Recognized as Madhya Pradesh's 1st international UAV competitive squad."
    }
  ];

  return (
    <div ref={stackRef} className="pin-stack-wrapper trinetra-page">

      {/* ── CARD 1: HERO ─────────────────────────────────────────────── */}
      <div className="pin-section pin-section--trinetra-hero">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <header className="trinetra-hero">
            <div className="trinetra-hero__bg">
              <img src="/drone-showcase-bg.jpg" alt="Team Trinetra UAV Drone" />
              <div className="trinetra-hero__overlay" />
              <div className="trinetra-hero__scanline" />
            </div>

            <div className="trinetra-hero__content">
              <div className="trinetra-badge-top">
                <span className="live-dot" />
                SUAS 2026 · TULSA, OKLAHOMA · USA
              </div>

              <h1 className="trinetra-hero__title">
                TEAM <span className="gold-gradient">TRINETRA</span>
              </h1>

              <p className="trinetra-hero__quote">
                “From Gwalior to the Global Skies.”
              </p>

              <p className="trinetra-hero__subtitle">
                MITS Gwalior's First International UAV Competition Team
              </p>

              <div className="trinetra-hero__quickstats">
                <span>🌍 SUAS 2026</span>
                <span className="divider">•</span>
                <span>🏆 Flight Order #17</span>
                <span className="divider">•</span>
                <span>🇮🇳 1 of only 2 Indian Teams</span>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* ── CARD 2: EXECUTIVE OVERVIEW ───────────────────────────────── */}
      <div className="pin-section pin-section--trinetra-overview">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-overview">
            <div className="section-label">01 // INTRODUCTION</div>
            <h2 className="trinetra-heading">Executive Overview</h2>
            <div className="overview-grid">
              <div className="overview-main-card">
                <p className="lead-p">
                  <strong>Team Trinetra</strong> is the flagship UAV team of the <strong>DroneX AeroTech Club</strong> at MITS Gwalior. Focused on aerospace and autonomous systems, the team has achieved a historic milestone by becoming the institute's first team to qualify for the prestigious <strong>Student Unmanned Aerial Systems (SUAS) Competition</strong> in Tulsa, Oklahoma, USA.
                </p>
                <div className="highlight-callout">
                  Backed by significant industry support, Team Trinetra represents a new generation of student-led technical excellence on the global stage.
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 3: KEY ACHIEVEMENTS ─────────────────────────────────── */}
      <div className="pin-section pin-section--trinetra-achievements">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-achievements">
            <div className="section-label">02 // MILESTONES</div>
            <h2 className="trinetra-heading">Historic Achievements</h2>
            <div className="stats-cards-grid">
              {stats.map((s, idx) => (
                <div className="stat-card" key={idx}>
                  <div className="stat-card__number">{s.value}</div>
                  <div className="stat-card__label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 4: SUAS 2026 INTERNATIONAL ACHIEVEMENT ─────────────── */}
      <div className="pin-section pin-section--trinetra-suas">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-suas">
            <div className="suas-card">
              <div className="suas-card__header">
                <span className="eyebrow-accent">INTERNATIONAL ACHIEVEMENT</span>
                <h2>SUAS 2026</h2>
                <div className="suas-location">📍 Tulsa, Oklahoma, USA</div>
              </div>

              <p className="suas-card__desc">
                The SUAS Competition provides a challenging international platform for university teams to demonstrate their capabilities in unmanned aerial systems, autonomous navigation, object recognition, and payload delivery.
              </p>

              <div className="suas-flight-banner">
                <span className="banner-title">FLIGHT ORDER #17</span>
                <span className="banner-sub">Selected among elite international universities worldwide</span>
              </div>

              <p className="suas-card__statement">
                Securing Flight Order 17 represents the successful transition of home-grown Indian engineering capabilities to a strictly regulated international testing ground.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 5: TECHNICAL CAPABILITIES ──────────────────────────── */}
      <div className="pin-section pin-section--trinetra-tech">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-tech">
            <div className="section-label">03 // ENGINEERING</div>
            <h2 className="trinetra-heading">Technical Capabilities</h2>
            <div className="tech-cards-grid">
              {techCategories.map((cat, idx) => (
                <div className="tech-card" key={idx}>
                  <div className="tech-card__num">{cat.num}</div>
                  <h3 className="tech-card__title">{cat.title}</h3>
                  <ul className="tech-card__list">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx}>
                        <span className="bullet">✦</span> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 6: INDUSTRY SUPPORT ─────────────────────────────────── */}
      <div className="pin-section pin-section--trinetra-industry">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-industry">
            <div className="industry-banner">
              <div className="industry-banner__left">
                <div className="industry-amount">₹12 LAKHS</div>
                <div className="industry-title">Hardware &amp; Industry Support</div>
                <div className="industry-subtitle">External backing secured for advanced UAV development</div>
              </div>
              <div className="industry-banner__right">
                <p>
                  Drone-related industry sponsorship and hardware support were secured to develop and optimize the UAV platform using advanced and high-grade aerospace components, precision sensors, and custom propulsion setups.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 7: MEDIA RECOGNITION (SHOWCASE) ────────────────────────── */}
      <div className="pin-section pin-section--trinetra-media">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-media">
            <div className="section-label">04 // IN THE PRESS</div>
            <h2 className="trinetra-heading">National Recognition &amp; Media Coverage</h2>
            <p className="section-subtext">
              Team Trinetra has received widespread national media recognition across leading newspapers and broadcast channels for securing a position among the Top 50 global UAV teams.
            </p>

            <div className="press-showcase-card">
              <div 
                className="press-showcase-image-container clickable"
                onClick={() => setIsImageModalOpen(true)}
                title="Click to view full size high quality image"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsImageModalOpen(true); }}
              >
                <img
                  src="/trinetra_media_coverage.jpg"
                  alt="Team Trinetra National Media Coverage &amp; Felicitations"
                  className="press-clipping-img"
                />
                <div className="press-zoom-badge">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span>Click to Enlarge HD</span>
                </div>
                <div className="press-image-overlay">
                  <span>📰 National Daily Coverage (25-06-2026) — 🔍 Click for HD</span>
                </div>
              </div>

              <div className="press-showcase-content">
                <span className="media-tag">FEATURED PRESS &amp; FELICITATION</span>
                <h3>Felicitated by Confederation of All India Traders (CAT)</h3>
                <p>
                  CAT Gwalior honored Team Trinetra at the MITS campus for qualifying in the top 50 global teams for the prestigious international SUAS competition in Oklahoma, USA.
                </p>
                
                <blockquote className="press-hindi-quote">
                  “मेहनत, समर्पण और टीमवर्क का यह परिणाम हम सभी के लिए प्रेरणादायक है।”
                </blockquote>

                <div className="press-publications-tags">
                  <span>Dainik Bhaskar</span>
                  <span>Swadesh</span>
                  <span>Hindustan Express</span>
                  <span>Darshan Post</span>
                  <span>Satta Sudhar</span>
                  <span>ETV Bharat</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 8: MEDIA COVERAGE HIGHLIGHTS GRID ─────────────────────── */}
      <div className="pin-section pin-section--trinetra-media-grid">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-media">
            <div className="section-label">04.1 // BROADCAST &amp; PRESS</div>
            <h2 className="trinetra-heading">Media Highlights</h2>
            <div className="media-grid">
              {mediaCoverage.map((item, idx) => (
                <div className="media-card" key={idx}>
                  <span className="media-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 9: FACULTY MENTOR PROFILE ───────────────────────────── */}
      <div className="pin-section pin-section--trinetra-mentor">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-mentor">
            <div className="section-label">05 // LEADERSHIP &amp; GUIDANCE</div>
            <h2 className="trinetra-heading">Faculty Mentor</h2>
            <div className="mentor-card">
              <div className="mentor-image-wrapper">
                <img src="/yashwant_sawle.png" alt="Dr. Yashwant Sawle" />
                <div className="mentor-image-glow" />
              </div>
              <div className="mentor-content">
                <span className="mentor-eyebrow">UNDER THE GUIDANCE OF</span>
                <h2 className="mentor-name">Dr. Yashwant Sawle</h2>
                <span className="mentor-role">Faculty Mentor &amp; Assistant Professor, MITS Gwalior</span>
                <blockquote className="mentor-quote">
                  “His constant mentorship, technical expertise, and invaluable guidance have been instrumental in transforming our ideas into practical solutions. His support in project development and team coordination has greatly contributed to the growth and achievements of Team Trinetra.”
                </blockquote>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 10: ON-FIELD MENTORSHIP PHOTO ───────────────────────── */}
      <div className="pin-section pin-section--trinetra-mentor-field">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-mentor">
            <div className="section-label">05.1 // FLIGHT TESTING &amp; GUIDANCE</div>
            <h2 className="trinetra-heading">On-Field Flight Operations</h2>
            <div className="mentor-field-showcase" style={{ marginTop: 0 }}>
              <div className="mentor-field-image-container">
                <img
                  src="/yashwant_sawle_mentorship.png"
                  alt="Dr. Yashwant Sawle On-field Drone Mentorship with Team Trinetra"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 9: TEAM JOURNEY — TIMELINE ───────────────────────────── */}
      <div className="pin-section pin-section--trinetra-timeline">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-timeline">
            <div className="section-label">06 // ROADMAP</div>
            <h2 className="trinetra-heading">Team Journey</h2>
            <div className="timeline-container">
              {timelineSteps.map((t, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className="timeline-marker">
                    <span>{t.step}</span>
                  </div>
                  <div className="timeline-content">
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 10: TEAM MEMBERS ────────────────────────────────────── */}
      <div className="pin-section pin-section--trinetra-team">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-team">
            <div className="section-label">07 // SQUAD</div>
            <h2 className="trinetra-heading">The Team Behind Trinetra</h2>
            <div className="team-grid">
              {teamMembers.map((m, idx) => (
                <div className="trinetra-member-card" key={idx}>
                  <div className="member-avatar">
                    {m.image ? (
                      <img src={m.image} alt={m.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {m.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                  </div>
                  <div className="member-info">
                    <h3>{m.name}</h3>
                    <span>{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 11: CURRENT STATUS & PIPELINE ───────────────────────── */}
      <div className="pin-section pin-section--trinetra-status">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-status">
            <div className="status-card">
              <span className="eyebrow-accent">MISSION STATUS</span>
              <h2>FINAL FLIGHT OPTIMIZATION</h2>
              <p className="status-desc">
                The team is currently in the advanced stages of preparation for its US deployment, optimizing the UAV platform for strict environmental and competition parameters.
              </p>

              <div className="pipeline-container">
                {pipelineStages.map((stg, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`pipeline-stage ${stg.isCurrent ? "stage-current" : stg.done ? "stage-done" : ""}`}>
                      <span className="stage-dot" />
                      <span className="stage-name">{stg.name}</span>
                      {stg.isCurrent && <span className="stage-badge">CURRENT STAGE</span>}
                    </div>
                    {idx < pipelineStages.length - 1 && (
                      <div className={`pipeline-line ${stg.done ? "line-done" : ""}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 12 & 13: VISION & CTA ────────────────────────────────── */}
      <div className="pin-section pin-section--trinetra-vision">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="trinetra-section trinetra-vision">
            <div className="vision-card">
              <span className="eyebrow-accent">THE FUTURE IS AUTONOMOUS</span>
              <p className="vision-obj">
                The long-term objective is to establish MITS Gwalior as a premier center for student-led UAV innovation.
              </p>

              <h2 className="vision-giant-text">
                BUILD THE FUTURE OF DRONES.
              </h2>

              <p className="vision-final-line">
                Team Trinetra will continue to engineer “The Third Eye” and push Indian aerospace innovation to the global skies.
              </p>
            </div>
          </section>

          <section className="trinetra-section trinetra-cta" style={{ marginTop: "40px" }}>
            <div className="cta-box">
              <h2>TEAM TRINETRA</h2>
              <p className="cta-tagline">FROM GWALIOR TO THE GLOBAL SKIES.</p>

              <Link to="/projects" className="btn-back">
                ← BACK TO PROJECTS
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* ── HIGH RESOLUTION PRESS IMAGE MODAL ──────────────────────────── */}
      {isImageModalOpen && (
        <div 
          className="press-image-modal-overlay" 
          onClick={() => setIsImageModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="High Quality Press Coverage"
        >
          <div className="press-image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="press-image-modal-close" 
              onClick={() => setIsImageModalOpen(false)}
              aria-label="Close modal"
              title="Close (ESC)"
            >
              ✕
            </button>
            <div className="press-image-modal-body">
              <img 
                src="/trinetra_media_coverage_hd.jpg" 
                alt="Team Trinetra National Media Coverage &amp; Felicitations - Full Newspaper Clippings" 
                className="press-modal-hd-img"
              />
            </div>
            <div className="press-image-modal-caption">
              <span className="press-modal-title">📰 National Daily Coverage (25-06-2026) — Team Trinetra Felicitated by CAT</span>
              <span className="press-modal-hint">Click outside or press ESC to close</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TeamTrinetra;
