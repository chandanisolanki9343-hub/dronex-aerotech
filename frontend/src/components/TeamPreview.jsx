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
          <div className="avatar-placeholder">
            {getInitials(member.name)}
          </div>
        )}

      </div>

      <div className="team-content">

        <h3>{member.name}</h3>

        <span>{member.position}</span>

        {member.department && 
         member.department.toLowerCase() !== "president" && 
         member.department.toLowerCase() !== "secretary" && (
          <p>{member.department}</p>
        )}

        <div className="social-links" onClick={(e) => e.stopPropagation()}>

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

          {member.portfolio && (
            <a
              href={member.portfolio}
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          )}

        </div>

      </div>

    </div>
  );
}

export default TeamPreview;
