import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { useLenis } from "../hooks/useLenis";
import { useStackedScroll } from "../hooks/useStackedScroll";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const stackRef = useRef(null);

  useLenis();
  useStackedScroll(stackRef, [projects]);

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
        // Sort Trinetra to top
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
      // Fallback default
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
    <div ref={stackRef} className="pin-stack-wrapper projects-stack-page">
      
      {/* ── CARD 0: Header Section ───────────────────────────────────── */}
      <div className="pin-section pin-section--projects-header">
        <div className="pin-overlay" />
        <div className="pin-section__inner projects-header-inner">
          <span className="projects-eyebrow">AEROSPACE &amp; ROBOTICS PORTFOLIO</span>
          <h1>Explore Our Projects</h1>
          <p>
            Discover autonomous flight systems, AI-powered computer vision, custom UAV hardware, and competition robotics engineered by Dronex AeroTech.
          </p>
          <div className="scroll-down-hint">
            <span>Scroll down to explore projects</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </div>

      {/* ── CARDS 1..N: Individual Stacked Project Cards ─────────────── */}
      {projects.map((project, idx) => (
        <div key={project._id || idx} className="pin-section pin-section--project-card">
          <div className="pin-overlay" />
          <div className="pin-section__inner project-card-inner">
            <div className="project-card-container">
              <ProjectCard project={project} />
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default Projects;
