import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio-page container">
      {/* Hero Header */}
      <div className="portfolio-hero fade-up">
        <div className="portfolio-avatar-container">
          <img src="/chandani.jpg" alt="Chandani Solanki" className="portfolio-avatar" />
          <div className="avatar-glow"></div>
        </div>
        <div className="portfolio-intro">
          <span className="portfolio-badge">Available for Projects</span>
          <h1>Chandani Solanki</h1>
          <h2>Full Stack Developer & IT Student</h2>
          <p className="portfolio-tagline">
            Crafting elegant solutions to complex web challenges. Passionate about building seamless user interfaces and high-performance backend systems.
          </p>
          <div className="portfolio-socials">
            <a href="https://www.linkedin.com/in/chandani-solanki-78299834a" target="_blank" rel="noopener noreferrer" className="btn-social linkedin">
              LinkedIn
            </a>
            <a href="https://github.com/chandanisolanki9343-hub" target="_blank" rel="noopener noreferrer" className="btn-social github">
              GitHub
            </a>
            <a href="mailto:chandanisolanki9343@gmail.com" className="btn-social email">
              Email Me
            </a>
          </div>
        </div>
      </div>

      {/* Grid Layout for Details */}
      <div className="portfolio-grid fade-up" style={{ animationDelay: "0.2s" }}>
        {/* Left: About & Skills */}
        <div className="portfolio-left">
          <div className="portfolio-card">
            <h3>About Me</h3>
            <p>
              I am a third-year <b>Information Technology</b> student at <b>Madhav Institute of Technology & Science (MITS)</b>. I specialize in designing and engineering scalable, interactive web platforms.
            </p>
            <p>
              Currently, I manage the digital infrastructure and web presence for <b>Dronex AeroTech</b>, building custom tools that enable club administrators to recruit new talent, post club events, manage project portfolios, and interact with subscribers.
            </p>
          </div>

          <div className="portfolio-card">
            <h3>Technical Skills</h3>
            <div className="skills-section">
              <h4>Frontend</h4>
              <div className="skills-list">
                <span className="skill-tag">HTML5 / CSS3</span>
                <span className="skill-tag">JavaScript (ES6+)</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Vite & Webpack</span>
                <span className="skill-tag">Responsive Design</span>
              </div>
            </div>
            <div className="skills-section" style={{ marginTop: "20px" }}>
              <h4>Backend & DB</h4>
              <div className="skills-list">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">RESTful APIs</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Mongoose ORM</span>
              </div>
            </div>
            <div className="skills-section" style={{ marginTop: "20px" }}>
              <h4>Tools & Other</h4>
              <div className="skills-list">
                <span className="skill-tag">Git & GitHub</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">UI/UX Design</span>
                <span className="skill-tag">Postman</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Featured Projects */}
        <div className="portfolio-right">
          <div className="portfolio-card">
            <h3>Featured Projects</h3>
            
            <div className="featured-project-item">
              <div className="project-header">
                <h4>Dronex AeroTech Club Portal</h4>
                <span className="project-date">2026</span>
              </div>
              <p className="project-desc">
                A premium, full-stack website designed for the college aerotech club. Built with React and Node.js/Express, featuring a complete Admin Dashboard to manage club events, projects list, image gallery, subscriber emails, recruitment forms, and contact messages.
              </p>
              <div className="project-tags">
                <span className="p-tag">React</span>
                <span className="p-tag">Node.js</span>
                <span className="p-tag">MongoDB</span>
                <span className="p-tag">Express</span>
                <span className="p-tag">Glassmorphism UI</span>
              </div>
            </div>

            <div className="featured-project-item" style={{ marginTop: "25px", borderTop: "1px solid var(--border)", paddingTop: "25px" }}>
              <div className="project-header">
                <h4>Dynamic Contact & Messaging System</h4>
                <span className="project-date">2026</span>
              </div>
              <p className="project-desc">
                A secure real-time message storage and retrieval system. Includes validation, automated email notifications integration, administrative dashboards to filter read/unread messages, and bulk actions.
              </p>
              <div className="project-tags">
                <span className="p-tag">Express API</span>
                <span className="p-tag">Mongoose</span>
                <span className="p-tag">Axios</span>
                <span className="p-tag">Admin UI</span>
              </div>
            </div>

            <div className="featured-project-item" style={{ marginTop: "25px", borderTop: "1px solid var(--border)", paddingTop: "25px" }}>
              <div className="project-header">
                <h4>Clubs Recruitment Manager</h4>
                <span className="project-date">2025</span>
              </div>
              <p className="project-desc">
                An online application pipeline that handles student recruitment workflows. Supports document/answer uploads, tracking student domains (Technical, Graphics, Social Media), and updating status in real-time.
              </p>
              <div className="project-tags">
                <span className="p-tag">React Router</span>
                <span className="p-tag">State Management</span>
                <span className="p-tag">REST Backend</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
