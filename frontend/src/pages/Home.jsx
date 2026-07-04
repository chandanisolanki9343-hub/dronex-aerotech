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

      {/* Premium About Section */}
      <section className="home-about-section" style={{
        padding: "100px 24px",
        background: "radial-gradient(circle at top right, rgba(0, 86, 179, 0.08), transparent 50%), radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.4), transparent 70%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          maxWidth: "1200px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "60px",
          alignItems: "center"
        }}>
          {/* Left Column: Visual Emblem/Logo */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            position: "relative"
          }}>
            {/* Glowing Backdrop */}
            <div style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "var(--accent, #0056b3)",
              filter: "blur(60px)",
              opacity: 0.15,
              zIndex: 0
            }}></div>
            
            <div style={{
              position: "relative",
              zIndex: 1,
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "40px",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
              textAlign: "center",
              maxWidth: "340px",
              width: "100%"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 20px auto",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent, #0056b3), #003366)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                boxShadow: "0 10px 20px rgba(0, 86, 179, 0.3)"
              }}>
                🚀
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: "600", margin: "0 0 10px 0", color: "#fff" }}>Dronex AeroTech</h3>
              <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>Research & Development Club</p>
            </div>
          </div>

          {/* Right Column: Content */}
          <div style={{ zIndex: 1, textAlign: "left" }}>
            <span style={{
              fontSize: "13px",
              fontWeight: "750",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "var(--accent, #0056b3)",
              display: "block",
              marginBottom: "12px"
            }}>
              Who We Are
            </span>
            <h2 style={{
              fontSize: "38px",
              fontWeight: "850",
              lineHeight: "1.2",
              margin: "0 0 20px 0",
              fontFamily: "var(--font-heading)",
              color: "var(--primary)"
            }}>
              About Our Mission
            </h2>
            <p style={{
              fontSize: "17px",
              color: "var(--secondary)",
              lineHeight: "1.8",
              margin: 0
            }}>
              Dronex AeroTech is a premium research and development club dedicated to advancing the frontiers of autonomous flight, robotics, embedded systems, and aerospace engineering. Our mission is to inspire student engineers to design, build, and fly next-generation drone technologies.
            </p>
          </div>
        </div>
      </section>

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
    </>
  );
}

export default Home;