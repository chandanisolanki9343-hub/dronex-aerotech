import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin-login");
    };

    return (
        <div className="sidebar">
            <div style={{
                padding: "6px 16px",
                borderRadius: "10px",
                background: "#000000",
                border: "1px solid var(--accent)",
                boxShadow: "0 4px 12px rgba(184, 137, 60, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
                width: "fit-content"
            }}>
                <img src="/logo.png" alt="Dronex AeroTech" style={{ height: "32px", objectFit: "contain" }} />
            </div>

            <ul style={{ flexGrow: 1 }}>
                <li><Link to="/dashboard/projects">Projects</Link></li>
                <li><Link to="/dashboard/team">Team</Link></li>
                <li><Link to="/dashboard/events">Events</Link></li>
                <li><Link to="/dashboard/gallery">Gallery</Link></li>
                <li><Link to="/dashboard/recruitment">Recruitment</Link></li>
                <li><Link to="/dashboard/messages">Messages</Link></li>
                <li><Link to="/dashboard/subscribers">Subscribers</Link></li>
            </ul>

            <button 
                onClick={handleLogout}
                style={{
                    marginTop: "auto",
                    width: "100%",
                    padding: "12px",
                    background: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "var(--font-body)"
                }}
                className="logout-btn"
            >
                Logout
            </button>
        </div>
    );
}

export default Sidebar;