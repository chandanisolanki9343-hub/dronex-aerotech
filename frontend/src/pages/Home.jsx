import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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

        {events.filter(event => !event.isCompleted).length > 0 ? (
          <div className="projects-grid">
            {events.filter(event => !event.isCompleted).slice(0, 3).map((event) => (
              <EventPreview key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "var(--secondary)", width: "100%", marginTop: "20px" }}>
            No upcoming events scheduled. Keep an eye out for updates!
          </p>
        )}
      </section>

      <section className="home-team">
        <div className="section-header">
          <h2>Meet Our Members</h2>
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
            <div 
              style={{ maxWidth: "350px", width: "100%", cursor: "pointer" }} 
              className="president-card-wrap"
              onClick={() => navigate("/team?department=President")}
            >
              <TeamPreview member={team.find((member) => member.position === "Club President")} />
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
            Meet My Members
          </h3>
        </div>
 
        <div className="projects-grid">
          {team
            .filter((member) => member.isLeader && member.position !== "Club President" && member.position !== "Club Coordinator")
            .map((member) => (
              <div
                key={member._id}
                className="team-leader-link"
                style={{ cursor: "pointer", display: "block" }}
                onClick={() => navigate(`/team?department=${encodeURIComponent(member.department)}`)}
              >
                <TeamPreview member={member} />
              </div>
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