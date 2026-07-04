import "./EventPreview.css";

function EventPreview({ event }) {
  const isCompleted = event.isCompleted;

  return (
    <div className={`event-preview ${isCompleted ? "event-completed" : ""}`} style={{ position: "relative" }}>
      {isCompleted && (
        <span className="badge-completed">Completed</span>
      )}

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

        {isCompleted ? (
          <button className="btn btn-secondary" style={{ width: "100%", cursor: "default", opacity: 0.8 }} disabled>
            Simulator highlights ✓
          </button>
        ) : (
          <button className="btn btn-primary">
            View Details →
          </button>
        )}

      </div>

    </div>
  );
}

export default EventPreview;
