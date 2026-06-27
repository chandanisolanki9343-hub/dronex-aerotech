import "./EventPreview.css";

function EventPreview({ event }) {
  return (
    <div className="event-preview">

      <img
        src={event.image}
        alt={event.title}
      />

      <div className="event-info">

        <span className="event-date">
          {event.date}
        </span>

        <h3>{event.title}</h3>

        <p>{event.description}</p>

        <button className="btn btn-primary">
          View Details →
        </button>

      </div>

    </div>
  );
}

export default EventPreview;
