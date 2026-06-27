import "./TeamPreview.css";

function TeamPreview({ member }) {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="team-card">

      <div className="team-image">

        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
          />
        ) : (
          <div className="avatar-placeholder" style={{
            width: "100%",
            height: "320px",
            background: "linear-gradient(135deg, var(--card) 0%, var(--border) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "700",
            color: "var(--accent)",
            letterSpacing: "2px",
            fontFamily: "var(--font-heading)"
          }}>
            {getInitials(member.name)}
          </div>
        )}

      </div>

      <div className="team-content">

        <h3>{member.name}</h3>

        <span>{member.position}</span>

        <p>{member.department}</p>

        <div className="social-links">

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}

          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}

        </div>

      </div>

    </div>
  );
}

export default TeamPreview;
