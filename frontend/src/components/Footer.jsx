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

          <p>📧 dronexaerotech@gmail.com</p>

          <p>📍 Your College Name</p>

          <p>📞 +91 XXXXX XXXXX</p>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © 2026 Dronex AeroTech. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;