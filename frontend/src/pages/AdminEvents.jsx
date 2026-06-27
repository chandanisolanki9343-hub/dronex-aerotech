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
      });

      fetchEvents();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      alert("Event Deleted");
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Manage Events</h1>

      <form onSubmit={saveEvent}>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        <br /><br />

        <button type="submit">
          {editingId ? "Update Event" : "Add Event"}
        </button>

      </form>

      <hr />

      {events.map((event) => (
        <div key={event._id}>

          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              width="250"
            />
          )}

          <h2>{event.title}</h2>

          <p>{event.description}</p>

          <p><b>Date:</b> {event.date}</p>

          <p><b>Time:</b> {event.time}</p>

          <p><b>Venue:</b> {event.venue}</p>

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
              });
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteEvent(event._id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminEvents;
