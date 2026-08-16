import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className={scrolled ? "navbar navbar-scroll" : "navbar"}>
      <div className="navbar-logo">
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <div className="logo-badge" style={{
            padding: "3px 10px",
            borderRadius: "8px",
            background: "#000000",
            border: "1px solid var(--accent)",
            boxShadow: "0 4px 10px rgba(184, 137, 60, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <img src="/logo.png" alt="Dronex AeroTech" style={{ height: "24px", objectFit: "contain" }} />
          </div>
          <span className="logo-text" style={{
            fontSize: "20px",
            fontWeight: "700",
            fontFamily: "var(--font-heading)",
            color: "#ffffff"
          }}>
            Dronex <span style={{ color: "var(--accent)" }}>AeroTech</span>
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-links desktop-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/members">Members</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/recruitment">Recruitment</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      {/* Desktop Search */}
      <div className="navbar-search desktop-search">
        <input
          type="text"
          placeholder="Search projects..."
        />
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        className="mobile-hamburger-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} />
        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} />
        <span className={`hamburger-bar ${mobileMenuOpen ? "open" : ""}`} />
      </button>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-search-box">
          <input
            type="text"
            placeholder="Search projects..."
          />
        </div>
        <div className="mobile-nav-links">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</NavLink>
          <NavLink to="/members" onClick={() => setMobileMenuOpen(false)}>Members</NavLink>
          <NavLink to="/events" onClick={() => setMobileMenuOpen(false)}>Events</NavLink>
          <NavLink to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</NavLink>
          <NavLink to="/recruitment" onClick={() => setMobileMenuOpen(false)}>Recruitment</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;