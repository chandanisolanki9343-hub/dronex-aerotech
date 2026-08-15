import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import Hero from "../components/Hero";
import DroneShowcase from "../components/DroneShowcase";
import ProjectCard from "../components/ProjectCard";
import EventPreview from "../components/EventPreview";
import GalleryPreview from "../components/GalleryPreview";
import StatsSection from "../components/StatsSection";
import WhyChoose from "../components/WhyChoose";
import JoinCTA from "../components/JoinCTA";

import { useLenis } from "../hooks/useLenis";
import { useStackedScroll } from "../hooks/useStackedScroll";

import "./Home.css";

function Home() {
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  const stackRef = useRef(null);

  useLenis();
  useStackedScroll(stackRef);

  useEffect(() => {
    fetchProjects();
    fetchEvents();
    fetchGallery();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      const fetched = res.data.projects || [];
      const hasTrinetra = fetched.some(p => p.title?.toLowerCase().includes("trinetra"));
      if (!hasTrinetra) {
        setProjects([{
          _id: "team-trinetra-featured",
          isTrinetra: true,
          title: "Team Trinetra",
          description: "MITS Gwalior's First International UAV Competition Team",
          image: "/drone-showcase-bg.jpg"
        }, ...fetched]);
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
      console.log(err); 
      setProjects([{
        _id: "team-trinetra-featured",
        isTrinetra: true,
        title: "Team Trinetra",
        description: "MITS Gwalior's First International UAV Competition Team",
        image: "/drone-showcase-bg.jpg"
      }]);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.events || []);
    } catch (err) { console.log(err); }
  };

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");
      setGallery(res.data.items || []);
    } catch (err) { console.log(err); }
  };

  return (
    <div ref={stackRef} className="pin-stack-wrapper">

      {/* ── CARD 1 · Drone Showcase ─────────────────── */}
      <div className="pin-section pin-section--showcase">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <DroneShowcase />
        </div>
      </div>

      {/* ── CARD 2 · Hero "Save & Explore" ──────────── */}
      <div className="pin-section pin-section--hero">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <Hero />
        </div>
      </div>

      {/* ── CARD 3 · About Our Mission ───────────────── */}
      <div className="pin-section pin-section--about">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="home-about-section">
            <div className="home-about-grid">

              {/* Left: drone image */}
              <div className="about-image-container">
                <div className="gold-frame" />
                <div className="about-dot-grid" aria-hidden="true" />
                <img src="/drone-about.png" alt="Dronex AeroTech Drone" />
              </div>

              {/* Right: copy */}
              <div className="home-about-copy">
                <span className="about-eyebrow">Who We Are</span>
                <h2 className="about-heading">About Our Mission</h2>
                <p className="about-body">
                  Dronex AeroTech is a premium research and development club
                  dedicated to advancing the frontiers of autonomous flight,
                  robotics, embedded systems, and aerospace engineering. Our
                  mission is to inspire student engineers to design, build, and
                  fly next-generation drone technologies.
                </p>
                <div className="about-stats">
                  <div>
                    <h4 className="about-stat-value">R&amp;D</h4>
                    <span className="about-stat-label">Focused Research</span>
                  </div>
                  <div className="about-stat-divider" />
                  <div>
                    <h4 className="about-stat-value">100%</h4>
                    <span className="about-stat-label">Hands-on Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 4 · Projects ────────────────────────── */}
      <div className="pin-section pin-section--projects">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
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
        </div>
      </div>

      {/* ── CARD 5 · Upcoming Events ─────────────────── */}
      <div className="pin-section pin-section--events">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="home-events">
            <div className="section-header">
              <h2>Upcoming Events</h2>
              <p>Workshops, Competitions and Drone Activities</p>
            </div>
            {events.filter((e) => !e.isCompleted).length > 0 ? (
              <div className="projects-grid">
                {events.filter((e) => !e.isCompleted).slice(0, 3).map((event) => (
                  <EventPreview key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <p className="no-content-msg">
                No upcoming events scheduled. Keep an eye out for updates!
              </p>
            )}
          </section>
        </div>
      </div>

      {/* ── CARD 6 · Gallery ─────────────────────────── */}
      <div className="pin-section pin-section--gallery">
        <div className="pin-overlay" />
        <div className="pin-section__inner">
          <section className="home-gallery">
            <div className="section-header">
              <h2>Gallery</h2>
              <p>Moments captured from workshops, competitions and projects.</p>
            </div>
            <div className="projects-grid">
              {gallery.slice(0, 9).map((item) => (
                <GalleryPreview key={item._id} item={item} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ── CARD 7 · Why Choose + Stats + CTA (last) ── */}
      <div className="pin-section pin-section--why">
        <div className="pin-section__inner">
          <StatsSection />
          <WhyChoose />
          <JoinCTA />
        </div>
      </div>

    </div>
  );
}

export default Home;