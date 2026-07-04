import { useEffect, useState } from "react";
import api from "../services/api";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    image: "",
    isCompleted: false,
  });

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.events || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const res = await api.post("/upload/image", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        ...formData,
        image: res.data.imageUrl,
      });

      alert("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Image Upload Failed");
    }
  };

  const saveEvent = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/events/${editingId}`, formData);
        alert("Event Updated");
        setEditingId(null);
      } else {
        await api.post("/events", formData);
        alert("Event Added");
      }

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        image: "",
        isCompleted: false,
      });

      fetchEvents();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      alert("Event Deleted");
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>Manage Events</h1>

      <form onSubmit={saveEvent} style={{ background: "#222", padding: "20px", borderRadius: "10px", color: "#fff" }}>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Event Title</label>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "#fff" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "#fff", minHeight: "80px" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Date</label>
            <input
              type="text"
              name="date"
              placeholder="e.g. Feb 21-23, 2026"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "#fff" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Time</label>
            <input
              type="text"
              name="time"
              placeholder="e.g. All Day or 2:00 PM"
              value={formData.time}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "#fff" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #444", background: "#333", color: "#fff" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: "8px" }}
          />
          {formData.image && <p style={{ fontSize: "12px", color: "#aaa" }}>Current URL: {formData.image}</p>}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
            />
            Completed / Past Event
          </label>
        </div>

        <button type="submit" style={{ padding: "10px 20px", background: "var(--accent, #B8893C)", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600" }}>
          {editingId ? "Update Event" : "Add Event"}
        </button>

      </form>

      <hr style={{ margin: "40px 0", borderColor: "#444" }} />

      <h2>All Events</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {events.map((event) => (
          <div key={event._id} style={{ display: "flex", gap: "20px", background: "#222", padding: "15px", borderRadius: "8px", border: "1px solid #333", color: "#fff" }}>

            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                width="150"
                style={{ objectFit: "cover", borderRadius: "5px" }}
              />
            )}

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 10px 0" }}>
                {event.title} {event.isCompleted && <span style={{ background: "#d97706", fontSize: "11px", padding: "2px 6px", borderRadius: "4px", marginLeft: "10px", textTransform: "uppercase" }}>Completed</span>}
              </h3>

              <p style={{ margin: "0 0 10px 0", color: "#ccc" }}>{event.description}</p>

              <div style={{ fontSize: "13px", color: "#aaa" }}>
                <p style={{ margin: "2px 0" }}><b>Date:</b> {event.date}</p>
                <p style={{ margin: "2px 0" }}><b>Time:</b> {event.time}</p>
                <p style={{ margin: "2px 0" }}><b>Venue:</b> {event.venue}</p>
              </div>

              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => {
                    setEditingId(event._id);

                    setFormData({
                      title: event.title,
                      description: event.description,
                      date: event.date,
                      time: event.time,
                      venue: event.venue,
                      image: event.image,
                      isCompleted: event.isCompleted || false,
                    });
                  }}
                  style={{ padding: "6px 12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEvent(event._id)}
                  style={{ padding: "6px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEvents;
