import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import EventPreview from "../components/EventPreview";
import GalleryPreview from "../components/GalleryPreview";
import StatsSection from "../components/StatsSection";
import WhyChoose from "../components/WhyChoose";
import JoinCTA from "../components/JoinCTA";

function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchEvents();
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

      {/* Merged About Section */}
      <section className="home-about" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "24px", fontFamily: "var(--font-heading)", color: "var(--primary)" }}>
          About Dronex AeroTech
        </h2>
        <p style={{ fontSize: "19px", color: "var(--secondary)", lineHeight: "1.8", maxWidth: "900px", margin: "0 auto" }}>
          Dronex AeroTech is a premium research and development club dedicated to advancing the frontiers of autonomous flight, robotics, embedded systems, and aerospace engineering. Our mission is to inspire student engineers to design, build, and fly next-generation drone technologies.
        </p>
      </section>
    </>
  );
}

export default Home;