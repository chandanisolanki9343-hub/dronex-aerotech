import { useEffect, useState } from "react";
import api from "../services/api";
import EventPreview from "../components/EventPreview";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data.events || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const upcomingEvents = events.filter((e) => !e.isCompleted);
  const pastEvents = events.filter((e) => e.isCompleted);

  return (
    <div className="container" style={{ padding: "120px 24px", minHeight: "80vh" }}>
      <div className="section-header" style={{ marginBottom: "60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "40px", marginBottom: "15px", fontFamily: "var(--font-heading)" }}>
          Club Events & Workshops
        </h2>
        <p style={{ fontSize: "17px", color: "var(--secondary)", maxWidth: "600px", margin: "0 auto" }}>
          Explore our upcoming flight challenges and workshops, as well as high-flying highlights of past events.
        </p>
      </div>

      {/* Upcoming Events Section */}
      <h3 style={{ 
        fontSize: "26px", 
        color: "var(--primary)", 
        borderBottom: "1px solid var(--border)", 
        paddingBottom: "10px", 
        marginBottom: "30px", 
        fontFamily: "var(--font-heading)" 
      }}>
        Upcoming Events
      </h3>
      {upcomingEvents.length > 0 ? (
        <div className="events-grid" style={{ marginBottom: "80px" }}>
          {upcomingEvents.map((event) => (
            <EventPreview key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--secondary)", marginBottom: "80px", fontSize: "15px" }}>
          No upcoming events scheduled at the moment. Keep an eye out for future announcements!
        </p>
      )}

      {/* Past Events Section */}
      <h3 style={{ 
        fontSize: "26px", 
        color: "var(--primary)", 
        borderBottom: "1px solid var(--border)", 
        paddingBottom: "10px", 
        marginBottom: "30px", 
        fontFamily: "var(--font-heading)" 
      }}>
        Past Events & Highlights
      </h3>
      {pastEvents.length > 0 ? (
        <div className="events-grid">
          {pastEvents.map((event) => (
            <EventPreview key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--secondary)", fontSize: "15px" }}>
          No past events recorded yet.
        </p>
      )}
    </div>
  );
}

export default Events;
