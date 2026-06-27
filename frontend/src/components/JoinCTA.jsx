import { Link } from "react-router-dom";
import "./JoinCTA.css";

function JoinCTA() {
  return (
    <section className="join-section">

      <div className="join-content">

        <span className="join-tag">
          JOIN THE COMMUNITY
        </span>

        <h2>
          Ready to Build the Future of
          <br />
          Drone Technology?
        </h2>

        <p>
          Become a part of Dronex AeroTech and collaborate on
          cutting-edge drone projects, AI, robotics and aerospace
          innovations with passionate students.
        </p>

        <Link
          to="/recruitment"
          className="join-btn"
        >
          Apply Now →
        </Link>

      </div>

    </section>
  );
}

export default JoinCTA;
