import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  const isTrinetra = project?.title?.toLowerCase().includes("trinetra") || project?.isTrinetra;

  if (isTrinetra) {
    return (
      <Link to="/projects/team-trinetra" className="project-card trinetra-featured-card">
        {project.image && (
          <div className="project-card__image-wrapper">
            <img src={project.image} alt="Team Trinetra" />
            <div className="trinetra-badge-overlay">FEATURED PROJECT</div>
          </div>
        )}
        <div className="project-content">
          <div className="trinetra-card-header">
            <h3>TEAM TRINETRA</h3>
            <span className="trinetra-subhead">
              MITS Gwalior's First International UAV Competition Team
            </span>
          </div>

          <p className="trinetra-quote">“From Gwalior to the Global Skies.”</p>

          <div className="trinetra-stats-grid">
            <span className="stat-pill">🌍 SUAS 2026</span>
            <span className="stat-pill">🏆 Flight Order #17</span>
            <span className="stat-pill">🇮🇳 1st International Team from M.P.</span>
            <span className="stat-pill">🇮🇳 1 of only 2 Indian Teams</span>
            <span className="stat-pill">💰 ₹12L Hardware Support</span>
            <span className="stat-pill">📰 8+ National Media Features</span>
          </div>

          <div className="btn-explore-project">
            EXPLORE PROJECT &rarr;
          </div>
        </div>
      </Link>
    );
  }

  const projectUrl = project?.link || project?.url;
  const isExternal = projectUrl && (projectUrl.startsWith("http://") || projectUrl.startsWith("https://"));

  if (isExternal) {
    return (
      <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="project-card">
        {project.image && <img src={project.image} alt={project.title} />}
        <div className="project-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="btn-explore-project-simple">
            Learn More &rarr;
          </div>
        </div>
      </a>
    );
  }

  return (
    <Link to={projectUrl || "/projects"} className="project-card">
      {project.image && <img src={project.image} alt={project.title} />}
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="btn-explore-project-simple">
          Learn More &rarr;
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
