import { useEffect, useState } from "react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="container" style={{ padding: "100px 24px", minHeight: "80vh" }}>
      <div className="section-header" style={{ marginBottom: "50px" }}>
        <h2>All Projects</h2>
        <p>Explore the full portfolio of drone systems, robotics, and aerospace innovations built by Dronex AeroTech.</p>
      </div>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "var(--secondary)", marginTop: "40px" }}>
          No projects found. Check back soon!
        </p>
      )}
    </div>
  );
}

export default Projects;
