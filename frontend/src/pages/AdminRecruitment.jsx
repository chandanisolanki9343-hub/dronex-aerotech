import { useEffect, useState } from "react";
import api from "../services/api";

function AdminRecruitment() {
  const [applications, setApplications] = useState([]);
  
  // Bulk Scheduler states
  const [bulkDate, setBulkDate] = useState("");
  const [bulkTime, setBulkTime] = useState("");
  const [bulkLocation, setBulkLocation] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);

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

  // Count candidates whose status is "Selected"
  const selectedCount = applications.filter((app) => app.status === "Selected").length;

  const handleBulkSchedule = async (e) => {
    e.preventDefault();
    if (!bulkDate || !bulkTime || !bulkLocation) {
      alert("Please fill in Date, Time, and Venue/Classroom");
      return;
    }

    if (selectedCount === 0) {
      alert("No selected candidates found to schedule");
      return;
    }

    if (!window.confirm(`Are you sure you want to schedule interviews and notify all ${selectedCount} selected candidate(s)?`)) return;

    setBulkSubmitting(true);
    try {
      await api.put("/recruitment/schedule/bulk", {
        interviewDate: bulkDate,
        interviewTime: bulkTime,
        interviewLocation: bulkLocation
      });
      alert(`Interview Scheduled and emails sent to all ${selectedCount} selected candidate(s) successfully!`);
      // Clear inputs
      setBulkDate("");
      setBulkTime("");
      setBulkLocation("");
      fetchApplications();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to bulk schedule interviews");
    }
    setBulkSubmitting(false);
  };

  const updateStatus = async (id, status) => {
    const actionText = status === "Selected" ? "approve and select" : "reject";
    if (!window.confirm(`Are you sure you want to ${actionText} this applicant?`)) return;
    
    try {
      await api.put(`/recruitment/${id}`, { status });
      alert(`Application successfully ${status === "Selected" ? "Approved & Selected" : "Rejected"}`);
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

      {/* Batch Interview Scheduler Panel */}
      {applications.length > 0 && (
        <div style={{
          background: "var(--card-bg, rgba(255, 255, 255, 0.02))",
          border: "1px solid var(--border, rgba(255, 255, 255, 0.08))",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "30px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 10px 0", color: "#fff" }}>Batch Interview Scheduler</h2>
          <p style={{ color: "#aaa", fontSize: "14px", margin: "0 0 20px 0" }}>
            Schedule interviews in bulk for all selected/approved candidates. They will automatically receive the interview details email.
          </p>
          
          <form onSubmit={handleBulkSchedule} style={{ display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "150px", flex: 1 }}>
              <label style={{ fontSize: "12px", color: "#888", fontWeight: "600" }}>DATE</label>
              <input
                type="date"
                required
                value={bulkDate}
                onChange={(e) => setBulkDate(e.target.value)}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "120px", flex: 1 }}>
              <label style={{ fontSize: "12px", color: "#888", fontWeight: "600" }}>TIME</label>
              <input
                type="time"
                required
                value={bulkTime}
                onChange={(e) => setBulkTime(e.target.value)}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "220px", flex: 2 }}>
              <label style={{ fontSize: "12px", color: "#888", fontWeight: "600" }}>VENUE / CLASSROOM / BUILDING</label>
              <input
                type="text"
                required
                placeholder="e.g. Classroom 102, Aero Block"
                value={bulkLocation}
                onChange={(e) => setBulkLocation(e.target.value)}
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "200px" }}>
              <span style={{ fontSize: "13px", color: selectedCount > 0 ? "#28a745" : "#ffc107", fontWeight: "500", paddingBottom: "5px" }}>
                ● {selectedCount} Selected applicant(s) ready to schedule
              </span>
              <button
                type="submit"
                disabled={bulkSubmitting || selectedCount === 0}
                style={{
                  background: selectedCount > 0 ? "#007bff" : "rgba(255,255,255,0.05)",
                  color: selectedCount > 0 ? "white" : "#666",
                  border: "none",
                  padding: "11px 24px",
                  borderRadius: "8px",
                  cursor: selectedCount > 0 ? "pointer" : "not-allowed",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s"
                }}
              >
                {bulkSubmitting ? "Scheduling..." : "Schedule & Notify All"}
              </button>
            </div>
          </form>
        </div>
      )}

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
                {app.status === "Pending" && (
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
                )}
                {app.status !== "Rejected" && (
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
    </div>
  );
}

export default AdminRecruitment;
