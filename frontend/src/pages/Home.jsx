import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import EventPreview from "../components/EventPreview";
import TeamPreview from "../components/TeamPreview";
import GalleryPreview from "../components/GalleryPreview";
import StatsSection from "../components/StatsSection";
import WhyChoose from "../components/WhyChoose";
import JoinCTA from "../components/JoinCTA";

function Home() {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchEvents();
    fetchTeam();
    fetchGallery();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.events || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTeam = async () => {
    try {
      const res = await api.get("/team");
      setTeam(res.data.members || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");
      setGallery(res.data.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Hero />

      <section className="home-projects">
        <div className="section-header">
          <h2>Continue Exploring</h2>
          <p>Latest innovations from Dronex AeroTech</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      <section className="home-events">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <p>Workshops, Competitions and Drone Activities</p>
        </div>

        <div className="projects-grid">
          {events.slice(0, 3).map((event) => (
            <EventPreview key={event._id} event={event} />
          ))}
        </div>
      </section>

      <section className="home-team">
        <div className="section-header">
          <h2>Meet Our Team</h2>
          <p>Passionate students building the future of drones.</p>
        </div>

        {/* Club President Card Prominently Center-Aligned */}
        {team.find((member) => member.position === "Club President") && (
          <div className="president-section" style={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "50px"
          }}>
            <h3 style={{ 
              fontSize: "14px", 
              textTransform: "uppercase", 
              letterSpacing: "3px", 
              color: "var(--accent)", 
              marginBottom: "20px",
              fontFamily: "var(--font-body)",
              fontWeight: 600
            }}>
              Club President
            </h3>
            <div style={{ maxWidth: "350px", width: "100%" }} className="president-card-wrap">
              <Link
                to="/team?department=President"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <TeamPreview member={team.find((member) => member.position === "Club President")} />
              </Link>
            </div>
          </div>
        )}

        <div className="section-header" style={{ marginBottom: "30px", marginTop: "20px" }}>
          <h3 style={{ 
            fontSize: "14px", 
            textTransform: "uppercase", 
            letterSpacing: "3px", 
            color: "var(--secondary)", 
            fontFamily: "var(--font-body)",
            fontWeight: 600
          }}>
            Domain Leads
          </h3>
        </div>

        <div className="projects-grid">
          {team
            .filter((member) => member.isLeader && member.position !== "Club President")
            .map((member) => (
              <Link
                to={`/team?department=${encodeURIComponent(member.department)}`}
                key={member._id}
                className="team-leader-link"
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <TeamPreview member={member} />
              </Link>
            ))}
        </div>
      </section>

      <section className="home-gallery">
        <div className="section-header">
          <h2>Gallery</h2>
          <p>Moments captured from workshops, competitions and projects.</p>
        </div>

        <div className="projects-grid">
          {gallery.slice(0, 10).map((item) => (
            <GalleryPreview key={item._id} item={item} />
          ))}
        </div>
      </section>

      <StatsSection />
      <WhyChoose />
      <JoinCTA />
    </>
  );
}

export default Home;