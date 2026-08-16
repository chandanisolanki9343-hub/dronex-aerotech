import { useEffect, useState } from "react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { useLenis } from "../hooks/useLenis";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useLenis();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      const fetched = res.data.projects || [];

      const hasTrinetra = fetched.some(p => p.title?.toLowerCase().includes("trinetra"));
      if (!hasTrinetra) {
        const trinetraCard = {
          _id: "team-trinetra-featured",
          isTrinetra: true,
          title: "Team Trinetra",
          description: "MITS Gwalior's First International UAV Competition Team",
          image: "/drone-showcase-bg.jpg"
        };
        setProjects([trinetraCard, ...fetched]);
      } else {
        const sorted = [...fetched].sort((a, b) => {
          const aIs = a.title?.toLowerCase().includes("trinetra");
          const bIs = b.title?.toLowerCase().includes("trinetra");
          if (aIs) return -1;
          if (bIs) return 1;
          return 0;
        });
        setProjects(sorted);
      }
    } catch (err) {
      console.error(err);
      setProjects([{
        _id: "team-trinetra-featured",
        isTrinetra: true,
        title: "Team Trinetra",
        description: "MITS Gwalior's First International UAV Competition Team",
        image: "/drone-showcase-bg.jpg"
      }]);
    }
  };

  return (
    <div className="projects-stack-page">

      {/* ── Page Header ──────────────────────────────── */}
      <section className="projects-header-section">
        <div className="projects-header-inner">
          <span className="projects-eyebrow">AEROSPACE &amp; ROBOTICS PORTFOLIO</span>
          <h1>Explore Our Projects</h1>
          <p>
            Discover autonomous flight systems, AI-powered computer vision, custom UAV hardware,
            and competition robotics engineered by Dronex AeroTech.
          </p>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────────── */}
      <section className="projects-grid-section">
        <div className="project-card-container">
          <div className="projects-grid-layout">
            {projects.map((project, idx) => (
              <ProjectCard key={project._id || idx} project={project} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Projects;
