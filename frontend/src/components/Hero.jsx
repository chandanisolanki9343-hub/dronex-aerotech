import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <div className="welcome-box">
          🚀 Welcome to Dronex AeroTech
        </div>

        <h1>
          Save & Explore <br />
          Ideas that Inspire <br />
          Innovation.
        </h1>

        <p>
          Discover drone technology, aerospace research,
          robotics projects, events and innovations developed
          by the members of Dronex AeroTech.
        </p>

        <div className="hero-buttons">
          <Link to="/projects" className="btn btn-primary">
            Explore Projects
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
              🚁 Drone Projects
            </div>

            <div className="collection-item">
              🛰 Aerospace
            </div>

            <div className="collection-item">
              🤖 Robotics
            </div>

            <div className="collection-item">
              💻 Programming
            </div>

            <div className="collection-item">
              📷 Gallery
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;