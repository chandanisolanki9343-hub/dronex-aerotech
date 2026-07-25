import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Background decorations matching the user request */}
      <div className="hero-decorations">
        <div className="hero-orbital-ring"></div>
        <div className="hero-drone-container">
          <img src="/drone-hero.png" alt="Hovering Drone" className="hero-drone" />
        </div>
      </div>

      <div className="hero-left">

        <div className="welcome-box">
          <span className="welcome-dot"></span> Welcome to Dronex AeroTech
        </div>

        <h1>
          Save & Explore <br />
          Ideas that <span className="text-accent-gradient">Inspire</span> <br />
          <span className="text-accent-gradient">Innovation.</span>
        </h1>

        <p>
          Discover drone technology, aerospace research,
          robotics projects, events and innovations developed
          by the members of Dronex AeroTech.
        </p>

        <div className="hero-buttons">
          <Link to="/projects" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Explore Projects &rarr;
          </Link>

          <Link to="/recruitment" className="btn btn-secondary">
            Join Club
          </Link>

          <Link to="/admin-login" className="btn btn-secondary">
            Admin Login
          </Link>
        </div>

      </div>

      <div className="hero-right">

        <div className="inspiration-card">

          <h2>Explore Collections</h2>

          <input
            type="text"
            placeholder="Search collections..."
          />

          <div className="collection">

            <div className="collection-item">
              <span className="collection-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="collection-icon">
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
                  <path d="M3 3l3.5 3.5M17.5 17.5L21 21M3 21l3.5-3.5M17.5 6.5L21 3" />
                  <circle cx="4.5" cy="4.5" r="1.5" />
                  <circle cx="19.5" cy="4.5" r="1.5" />
                  <circle cx="4.5" cy="19.5" r="1.5" />
                  <circle cx="19.5" cy="19.5" r="1.5" />
                </svg>
                <span>Drone Projects</span>
              </span>
              <span className="chevron-right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>

            <div className="collection-item">
              <span className="collection-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="collection-icon">
                  <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5L16.5 6.5c3-3 6-2.5 6-2.5s.5 3-2.5 6L9.5 20.5c-1.5 1.5-3.75.5-3.75.5s-2.25-1-1.25-2.5z" />
                  <path d="M12 9l-3 3" />
                  <path d="M9 15H4v-5" />
                </svg>
                <span>Aerospace</span>
              </span>
              <span className="chevron-right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>

            <div className="collection-item">
              <span className="collection-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="collection-icon">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4M8 15h.01M16 15h.01M12 18h.01" />
                  <path d="M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Robotics</span>
              </span>
              <span className="chevron-right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>

            <div className="collection-item">
              <span className="collection-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="collection-icon">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span>Programming</span>
              </span>
              <span className="chevron-right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>

            <div className="collection-item">
              <span className="collection-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="collection-icon">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Gallery</span>
              </span>
              <span className="chevron-right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;