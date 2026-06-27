import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "navbar navbar-scroll" : "navbar"}>
      <div className="navbar-logo">
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <div style={{
            padding: "4px 14px",
            borderRadius: "10px",
            background: "#000000",
            border: "1px solid var(--accent)",
            boxShadow: "0 4px 12px rgba(184, 137, 60, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }} className="logo-badge">
            <img src="/logo.png" alt="Dronex AeroTech" style={{ height: "32px", objectFit: "contain" }} />
          </div>
        </Link>
      </div>

      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/about">About</NavLink>

        <NavLink to="/projects">Projects</NavLink>

        <NavLink to="/team">Team</NavLink>

        <NavLink to="/events">Events</NavLink>

        <NavLink to="/gallery">Gallery</NavLink>

        <NavLink to="/recruitment">Recruitment</NavLink>

        <NavLink to="/contact">Contact</NavLink>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search projects..."
        />
      </div>
    </nav>
  );
}

export default Navbar;