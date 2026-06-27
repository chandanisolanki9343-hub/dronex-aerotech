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

  return (
    <div className="container" style={{ padding: "100px 24px", minHeight: "80vh" }}>
      <div className="section-header" style={{ marginBottom: "50px" }}>
        <h2>Club Events & Workshops</h2>
        <p>Stay updated with our upcoming events, flight competitions, workshops, and aerotech bootcamps.</p>
      </div>

      {events.length > 0 ? (
        <div className="projects-grid">
          {events.map((event) => (
            <EventPreview key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "var(--secondary)", marginTop: "40px" }}>
          No upcoming events scheduled. Join our mailing list to stay informed!
        </p>
      )}
    </div>
  );
}

export default Events;
