import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-section">

          <div style={{
            padding: "4px 12px",
            borderRadius: "8px",
            background: "#000000",
            border: "1px solid var(--accent)",
            boxShadow: "0 4px 10px rgba(184, 137, 60, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            width: "fit-content"
          }}>
            <img src="/logo.png" alt="Dronex AeroTech" style={{ height: "24px", objectFit: "contain" }} />
          </div>

          <p>
            Building the future through drone technology,
            AI, robotics and aerospace innovation.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/team">Team</Link>

        </div>

        {/* More */}

        <div className="footer-section">

          <h3>Explore</h3>

          <Link to="/events">Events</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/recruitment">Recruitment</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* Contact */}

        <div className="footer-section">

          <h3>Contact</h3>

          <p>📧 soniparths555@gmail.com</p>

          <p>📍 College Campus, Drone School</p>

          <p>📞 +91 9425168627</p>

        </div>

      </div>

      <hr />

      {/* Developer Credit and Copyright Section */}
      <div className="footer-bottom">
        <p className="copyright-text">
          © 2026 Dronex AeroTech Club. All rights reserved.
        </p>
        
        <div className="developed-by">
          <span>Developed by</span>
          <img 
            src="/chandani.jpg" 
            alt="Chandani Solanki" 
            className="developer-avatar"
          />
          <span className="developer-name">Chandani Solanki</span>
          <span className="developer-separator">•</span>
          <span className="developer-details">Information Technology, 3rd Year</span>
        </div>

        <div className="developer-links">
          <Link to="/portfolio">Portfolio ↗</Link>
          <span className="link-separator">|</span>
          <a href="https://github.com/chandanisolanki9343-hub" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <span className="link-separator">|</span>
          <a href="https://www.linkedin.com/in/chandani-solanki-78299834a" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;