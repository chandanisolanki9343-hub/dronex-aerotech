import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import TeamPreview from "../components/TeamPreview";

function Team() {
  const [team, setTeam] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active tab from query parameter, fallback to 'All'
  const activeTab = searchParams.get("department") || "All";

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get("/team");
        setTeam(res.data.members || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  const handleTabChange = (tabName) => {
    if (tabName === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ department: tabName });
    }
  };

  const departments = [
    "All",
    "President",
    "Event Management",
    "Photo & Video Editing",
    "Promotion & Social Media",
    "Photography & Videography",
    "Technical",
    "Content Writing",
    "Web Development",
    "Graphic Designing & Auto CAD"
  ];

  // Helper to render a group of members with the leader highlighted
  const renderDepartmentGroup = (deptName, members) => {
    // Sort members so that Club President is first, Vice President is second, Secretary is third
    // and Arpita Makwana is sorted first among remaining sub-team members.
    const sortedMembers = [...members].sort((a, b) => {
      const order = {
        "Club President": 1,
        "Vice President": 2,
        "Vice president": 2,
        "Secretary": 3,
        "Secratary": 3,
      };
      const nameOrder = {
        "Arpita Makwana": 4,
        "Arpita makwana": 4,
      };
      const rankA = order[a.position] || nameOrder[a.name] || 99;
      const rankB = order[b.position] || nameOrder[b.name] || 99;
      return rankA - rankB;
    });

    const leaders = sortedMembers.filter(m => m.isLeader);
    const subTeam = sortedMembers.filter(m => !m.isLeader);

    return (
      <div key={deptName} className="dept-group" style={{ marginBottom: "60px" }}>
        <h3 style={{ 
          fontSize: "28px", 
          color: "var(--primary)", 
          borderBottom: "2px solid var(--border)", 
          paddingBottom: "10px", 
          marginBottom: "30px",
          fontFamily: "var(--font-heading)",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          {deptName}
        </h3>

        {leaders.length > 0 && (
          <div className="leader-container" style={{ marginBottom: "40px" }}>
            <h4 style={{ 
              fontSize: "14px", 
              textTransform: "uppercase", 
              letterSpacing: "2px", 
              color: "var(--accent)", 
              marginBottom: "15px",
              fontFamily: "var(--font-body)",
              fontWeight: 600
            }}>
              {leaders.length > 1 ? "Domain Leads / Executive" : "Domain Lead"}
            </h4>
            <div className="projects-grid">
              {leaders.map((leader) => (
                <div key={leader._id} style={{ maxWidth: "350px", width: "100%" }}>
                  <TeamPreview member={leader} />
                </div>
              ))}
            </div>
          </div>
        )}

        {subTeam.length > 0 && (
          <div>
            <h4 style={{ 
              fontSize: "14px", 
              textTransform: "uppercase", 
              letterSpacing: "2px", 
              color: "var(--secondary)", 
              marginBottom: "20px",
              fontFamily: "var(--font-body)",
              fontWeight: 600
            }}>
              Sub-Team Members
            </h4>
            <div className="projects-grid">
              {subTeam.map((member) => (
                <TeamPreview key={member._id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const studentTeam = team.filter((m) => m.position !== "Club Coordinator");

  // Group members by department
  const groupedTeam = studentTeam.reduce((acc, member) => {
    const dept = member.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(member);
    return acc;
  }, {});

  return (
    <div className="container" style={{ padding: "100px 24px", minHeight: "80vh" }}>
      <div className="section-header" style={{ marginBottom: "40px" }}>
        <h2>Meet Our Members</h2>
        <p>Passionate students, developers, designers, and innovators building the future of drone and aerospace technology.</p>
      </div>

      {/* Club Coordinator Section */}
      {team.find((m) => m.position === "Club Coordinator") && (
        <div className="coordinator-section" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "60px",
          textAlign: "center"
        }}>
          <h3 style={{
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: "var(--accent)",
            marginBottom: "20px",
            fontFamily: "var(--font-body)",
            fontWeight: 600
          }}>
            Club Coordinator
          </h3>
          <div style={{ maxWidth: "350px", width: "100%" }}>
            <TeamPreview member={team.find((m) => m.position === "Club Coordinator")} />
          </div>
        </div>
      )}

      {/* Tabs for filtering */}
      <div className="team-tabs" style={{ 
        display: "flex", 
        justifyContent: "center", 
        flexWrap: "wrap", 
        gap: "12px", 
        marginBottom: "50px" 
      }}>
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => handleTabChange(dept)}
            style={{
              padding: "10px 24px",
              borderRadius: "30px",
              border: activeTab === dept ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: activeTab === dept ? "var(--accent)" : "transparent",
              color: activeTab === dept ? "var(--bg)" : "var(--primary)",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "var(--font-body)",
              transition: "all 0.3s ease",
            }}
            className="team-tab-btn"
          >
            {dept}
          </button>
        ))}
      </div>

      {team.length > 0 ? (
        <div className="team-content-section">
          {activeTab === "All" ? (
            // Render all departments in standard order
            departments
              .filter((d) => d !== "All")
              .map((dept) => {
                if (groupedTeam[dept] && groupedTeam[dept].length > 0) {
                  return renderDepartmentGroup(dept, groupedTeam[dept]);
                }
                return null;
              })
          ) : (
            // Render specific department
            groupedTeam[activeTab] ? (
              renderDepartmentGroup(activeTab, groupedTeam[activeTab])
            ) : (
              <p style={{ textAlign: "center", color: "var(--secondary)", marginTop: "40px" }}>
                No members found in this department.
              </p>
            )
          )}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "var(--secondary)", marginTop: "40px" }}>
          No team members found. Check back later!
        </p>
      )}
    </div>
  );
}

export default Team;
