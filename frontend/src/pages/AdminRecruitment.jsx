import { useEffect, useState } from "react";
import api from "../services/api";

function AdminRecruitment() {
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openScheduleModal = (id, defaultDate, defaultTime, defaultLocation) => {
    setSelectedAppId(id);
    setInterviewDate(defaultDate || "");
    setInterviewTime(defaultTime || "");
    setInterviewLocation(defaultLocation || "");
    setIsModalOpen(true);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!interviewDate || !interviewTime) {
      alert("Please fill in both Date and Time");
      return;
    }

    setSubmitting(true);
    try {
      await api.put(`/recruitment/${selectedAppId}/schedule`, {
        interviewDate,
        interviewTime,
        interviewLocation
      });
      alert("Interview Scheduled Successfully & Email Sent to Applicant!");
      setIsModalOpen(false);
      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Failed to schedule interview");
    }
    setSubmitting(false);
  };

  const fetchApplications = async () => {
    try {
      const res = await api.get("/recruitment");
      setApplications(res.data.applications || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    const actionText = status === "Selected" ? "approve and select" : "reject";
    if (!window.confirm(`Are you sure you want to ${actionText} this applicant?`)) return;
    
    try {
      await api.put(`/recruitment/${id}`, { status });
      alert(`Application successfully ${status === "Selected" ? "Approved" : "Rejected"}`);
      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Failed to update application status");
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this application?")) return;
    try {
      await api.delete(`/recruitment/${id}`);
      alert("Application Deleted Successfully");
      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // Helper for status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Selected":
        return { backgroundColor: "rgba(40, 167, 69, 0.15)", color: "#28a745", border: "1px solid rgba(40, 167, 69, 0.3)" };
      case "Rejected":
        return { backgroundColor: "rgba(220, 53, 69, 0.15)", color: "#dc3545", border: "1px solid rgba(220, 53, 69, 0.3)" };
      case "Interview Scheduled":
        return { backgroundColor: "rgba(0, 123, 255, 0.15)", color: "#007bff", border: "1px solid rgba(0, 123, 255, 0.3)" };
      default:
        return { backgroundColor: "rgba(255, 193, 7, 0.15)", color: "#ffc107", border: "1px solid rgba(255, 193, 7, 0.3)" };
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", minHeight: "80vh", color: "var(--primary, #333)" }}>
      <div style={{ marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", letterSpacing: "-0.5px" }}>Recruitment Applications</h1>
        <p style={{ color: "#777", marginTop: "5px" }}>Manage, review, approve, or reject applicants for Dronex AeroTech.</p>
      </div>

      {applications.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#777", fontSize: "18px" }}>No applications found in the database.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "25px" }}>
          {applications.map((app) => (
            <div
              key={app._id}
              style={{
                background: "var(--card-bg, rgba(255, 255, 255, 0.02))",
                border: "1px solid var(--border, rgba(255, 255, 255, 0.08))",
                borderRadius: "14px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "all 0.3s ease"
              }}
            >
              {/* Header with name and status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h3 style={{ fontSize: "22px", margin: 0, fontWeight: "600" }}>{app.name}</h3>
                  <span style={{ fontSize: "13px", color: "#666" }}>Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "30px",
                    fontSize: "13px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    ...getStatusStyle(app.status)
                  }}
                >
                  {app.status || "Pending"}
                </span>
              </div>

              {/* Grid detail summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px", margin: "10px 0" }}>
                <div>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block" }}>Email</span>
                  <a href={`mailto:${app.email}`} style={{ color: "var(--accent, #0056b3)", textDecoration: "none", wordBreak: "break-all" }}>{app.email}</a>
                </div>
                <div>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block" }}>Phone</span>
                  <span>{app.phone}</span>
                </div>
                <div>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block" }}>Department / Branch</span>
                  <span>{app.department || app.branch}</span>
                </div>
                <div>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block" }}>Academic Year</span>
                  <span>{app.year}</span>
                </div>
                <div>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block" }}>Target Domain</span>
                  <span>{app.domain || app.skills || "N/A"}</span>
                </div>
              </div>

              {/* Message / Why Join */}
              <div style={{ background: "rgba(255, 255, 255, 0.01)", borderRadius: "8px", padding: "16px", borderLeft: "3px solid var(--accent, #0056b3)" }}>
                <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block", marginBottom: "8px" }}>Why Join / Application Statement</span>
                <p style={{ margin: 0, fontSize: "15px", color: "#ccc", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                  {app.whyJoin || app.message || app.reason || "No details provided."}
                </p>
              </div>

              {/* Display interview details if scheduled */}
              {(app.status === "Interview Scheduled" || (app.interviewDate && app.interviewTime)) && (
                <div style={{ background: "rgba(0, 123, 255, 0.03)", borderRadius: "8px", padding: "16px", borderLeft: "3px solid #007bff" }}>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#007bff", fontWeight: "600", display: "block", marginBottom: "4px" }}>Scheduled Interview</span>
                  <p style={{ margin: 0, fontSize: "14px", color: "#ccc" }}>
                    Date: <strong>{app.interviewDate}</strong> | Time: <strong>{app.interviewTime}</strong>
                  </p>
                  {app.interviewLocation && (
                    <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#ccc" }}>
                      Venue: <strong>{app.interviewLocation}</strong>
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
                {(app.status === "Pending" || app.status === "Interview Scheduled") && (
                  <>
                    <button
                      onClick={() => openScheduleModal(app._id, app.interviewDate, app.interviewTime, app.interviewLocation)}
                      style={{
                        background: "rgba(0, 123, 255, 0.15)",
                        color: "#007bff",
                        border: "1px solid rgba(0, 123, 255, 0.3)",
                        padding: "9px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s"
                      }}
                    >
                      {app.status === "Interview Scheduled" ? "Reschedule" : "Schedule Interview"}
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Selected")}
                      style={{
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s"
                      }}
                      className="btn-approve"
                    >
                      Approve & Select
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "Rejected")}
                      style={{
                        background: "rgba(220, 53, 69, 0.15)",
                        color: "#dc3545",
                        border: "1px solid rgba(220, 53, 69, 0.3)",
                        padding: "9px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.2s"
                      }}
                      className="btn-reject"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => deleteApplication(app._id)}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#aaa",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "9px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.2s"
                  }}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "#1e1e1e",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "30px",
            borderRadius: "14px",
            width: "90%",
            maxWidth: "450px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "22px", color: "white" }}>Schedule Interview</h3>
            <form onSubmit={handleScheduleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", color: "#aaa" }}>Select Date</label>
                <input
                  type="date"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  style={{
                    background: "#2a2a2a",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "15px"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", color: "#aaa" }}>Select Time</label>
                <input
                  type="time"
                  required
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  style={{
                    background: "#2a2a2a",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "15px"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", color: "#aaa" }}>Venue / Classroom / Building</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Classroom 102, Main Building or Meet link"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  style={{
                    background: "#2a2a2a",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "15px"
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: "transparent",
                    color: "#aaa",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "9px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}
                >
                  {submitting ? "Scheduling..." : "Confirm Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRecruitment;
