import { useEffect, useState } from "react";
import api from "../services/api";

function AdminRecruitment() {
  const [applications, setApplications] = useState([]);
  
  // Bulk Scheduler states
  const [bulkDate, setBulkDate] = useState("");
  const [bulkTime, setBulkTime] = useState("");
  const [bulkLocation, setBulkLocation] = useState("");
  const [bulkSubmitting, setBulkSubmitting] = useState(false);

  // WhatsApp Bulk Send states
  const [showWAModal, setShowWAModal] = useState(false);
  const [waMessage, setWaMessage] = useState(
    `Namaste! 🙏\n\nAapne Dronex AeroTech ke liye apply kiya tha. Hum aapko apne official WhatsApp group mein invite karna chahte hain jahan aapko club ki saari updates, events aur announcements milenge.\n\nGroup join karne ke liye neeche diye link par click karein:\n👉 https://chat.whatsapp.com/HAcHOIKY8Yu9U2BSGf3Yrv\n\nDronex AeroTech Team 🚁`
  );
  const [copied, setCopied] = useState(false);

  // Individual Scheduler states
  const [schedulingId, setSchedulingId] = useState(null);
  const [indivDate, setIndivDate] = useState("");
  const [indivTime, setIndivTime] = useState("");
  const [indivLocation, setIndivLocation] = useState("");
  const [indivSubmitting, setIndivSubmitting] = useState(false);

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

  // Count candidates whose status is "Approved"
  const approvedCount = applications.filter((app) => app.status === "Approved").length;

  // Pending students with phone numbers
  const pendingApps = applications.filter((app) => app.status === "Pending" || !app.status);

  const copyAllNumbers = () => {
    const numbers = pendingApps.map((a) => a.phone).filter(Boolean).join("\n");
    navigator.clipboard.writeText(numbers);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = (phone, message) => {
    // Clean phone number — remove spaces, dashes, +
    let cleaned = phone.replace(/[\s\-().]/g, "");
    if (!cleaned.startsWith("+")) cleaned = "+91" + cleaned.replace(/^0/, "");
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleaned}?text=${encoded}`, "_blank");
  };

  };

  const handleBulkSchedule = async (e) => {
    e.preventDefault();
    if (!bulkDate || !bulkTime || !bulkLocation) {
      alert("Please fill in Date, Time, and Venue/Classroom");
      return;
    }

    if (approvedCount === 0) {
      alert("No approved candidates found to schedule");
      return;
    }

    if (!window.confirm(`Are you sure you want to schedule interviews and notify all ${approvedCount} approved candidate(s)?`)) return;

    setBulkSubmitting(true);
    try {
      await api.put("/recruitment/schedule/bulk", {
        interviewDate: bulkDate,
        interviewTime: bulkTime,
        interviewLocation: bulkLocation
      });
      alert(`Interview Scheduled and emails sent to all ${approvedCount} approved candidate(s) successfully!`);
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

  const handleIndividualSchedule = async (id) => {
    if (!indivDate || !indivTime || !indivLocation) {
      alert("Please fill in Date, Time, and Venue/Location");
      return;
    }

    setIndivSubmitting(true);
    try {
      await api.put(`/recruitment/${id}/schedule`, {
        interviewDate: indivDate,
        interviewTime: indivTime,
        interviewLocation: indivLocation,
      });
      alert("Interview successfully scheduled and email sent to the candidate!");
      // Reset state
      setSchedulingId(null);
      setIndivDate("");
      setIndivTime("");
      setIndivLocation("");
      fetchApplications();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to schedule interview");
    }
    setIndivSubmitting(false);
  };

  const updateStatus = async (id, status) => {
    let actionText = `change status to ${status} for`;
    if (status === "Approved") actionText = "approve (shortlist for interview)";
    if (status === "Selected") actionText = "select and finalize";
    if (status === "Rejected") actionText = "reject";

    if (!window.confirm(`Are you sure you want to ${actionText} this applicant?`)) return;
    
    try {
      await api.put(`/recruitment/${id}`, { status });
      let alertMsg = `Application successfully updated to ${status}`;
      if (status === "Approved") alertMsg = "Application Shortlisted/Approved for Interview";
      if (status === "Selected") alertMsg = "Application Approved & Selected (Welcome email sent and added to Team!)";
      if (status === "Rejected") alertMsg = "Application Rejected";
      alert(alertMsg);
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
      case "Approved":
        return { backgroundColor: "rgba(23, 162, 184, 0.15)", color: "#17a2b8", border: "1px solid rgba(23, 162, 184, 0.3)" };
      case "Rejected":
        return { backgroundColor: "rgba(220, 53, 69, 0.15)", color: "#dc3545", border: "1px solid rgba(220, 53, 69, 0.3)" };
      case "Interview Scheduled":
        return { backgroundColor: "rgba(0, 123, 255, 0.15)", color: "#007bff", border: "1px solid rgba(0, 123, 255, 0.3)" };
      default:
        return { backgroundColor: "rgba(255, 193, 7, 0.15)", color: "#ffc107", border: "1px solid rgba(255, 193, 7, 0.3)" };
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", minHeight: "80vh", color: "#f4f4f7" }}>
      <div style={{ marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", letterSpacing: "-0.5px" }}>Recruitment Applications</h1>
          <p style={{ color: "#aaa", marginTop: "5px" }}>Manage, review, approve, or reject applicants for Dronex AeroTech.</p>
        </div>

        {/* Actions Bar */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          {/* WhatsApp Bulk Send Button */}
          <button
            onClick={() => setShowWAModal(true)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #25D366, #128C44)",
              color: "white", border: "none", padding: "10px 20px",
              borderRadius: "10px", cursor: "pointer", fontWeight: "700",
              fontSize: "14px", boxShadow: "0 4px 15px rgba(37,211,102,0.35)"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="18" height="18">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.454-2.012A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.76-1.848l-.485-.287-5.02 1.195 1.235-4.896-.317-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.861c-.398-.199-2.354-1.161-2.719-1.294-.365-.132-.631-.198-.897.2-.266.397-1.03 1.293-1.262 1.56-.232.265-.465.298-.863.099-.398-.2-1.68-.619-3.2-1.974-1.183-1.054-1.98-2.355-2.213-2.752-.232-.398-.025-.613.175-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.132-.265.066-.497-.033-.696-.1-.2-.897-2.163-1.23-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.265 0-.696.1-1.061.497-.365.398-1.394 1.362-1.394 3.32 0 1.959 1.427 3.851 1.626 4.116.2.266 2.806 4.283 6.797 6.007 4.002 1.726 4.002 1.15 4.724 1.077.722-.073 2.354-.962 2.686-1.892.332-.929.332-1.726.232-1.892-.099-.166-.365-.265-.763-.464z"/>
            </svg>
            WhatsApp Pending ({pendingApps.length})
          </button>

          {/* QR Code Quick Download Card for Admin */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", background: "rgba(255,255,255,0.03)", padding: "12px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <img src="/recruitment-qr.png" alt="Recruitment QR Code" style={{ width: "50px", height: "50px", background: "white", padding: "4px", borderRadius: "6px" }} />
            <div>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#ccc", display: "block" }}>Recruitment QR Code</span>
              <a href="/recruitment-qr.png" download="Dronex-Recruitment-QR.png" style={{ color: "#007bff", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}>📥 Download PNG</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── WhatsApp Bulk Send Modal ── */}
      {showWAModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "#111", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "18px", padding: "32px", width: "100%", maxWidth: "700px",
            maxHeight: "90vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px"
          }}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ color: "#25D366", fontSize: "22px", fontWeight: "700", margin: 0 }}>📱 Send WhatsApp to Pending Students</h2>
                <p style={{ color: "#aaa", fontSize: "13px", marginTop: "4px" }}>{pendingApps.length} pending applicant(s) found</p>
              </div>
              <button onClick={() => setShowWAModal(false)} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", width: "36px", height: "36px", borderRadius: "50%",
                cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center"
              }}>✕</button>
            </div>

            {/* Message Editor */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", color: "#c0c0c0", fontWeight: "700", letterSpacing: "0.8px", textTransform: "uppercase" }}>Message Template (Edit karein)</label>
              <textarea
                rows={9}
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                style={{
                  width: "100%", padding: "14px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "#ffffff", fontSize: "14px", fontFamily: "monospace",
                  lineHeight: "1.6", resize: "vertical", outline: "none"
                }}
              />
            </div>

            {/* Copy All Numbers */}
            {pendingApps.length > 0 && (
              <button
                onClick={copyAllNumbers}
                style={{
                  background: copied ? "rgba(40,167,69,0.2)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${copied ? "#28a745" : "rgba(255,255,255,0.1)"}`,
                  color: copied ? "#28a745" : "#ccc", padding: "10px 18px",
                  borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "13px",
                  transition: "all 0.3s", alignSelf: "flex-start"
                }}
              >
                {copied ? "✅ Copied!" : "📋 Copy All Phone Numbers"}
              </button>
            )}

            {/* Student List */}
            {pendingApps.length === 0 ? (
              <p style={{ textAlign: "center", color: "#aaa", padding: "30px" }}>No pending applicants found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {pendingApps.map((app) => (
                  <div key={app._id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "10px", padding: "14px 18px", gap: "12px", flexWrap: "wrap"
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "15px" }}>{app.name}</span>
                      <span style={{ color: "#c0c0c0", fontSize: "13px" }}>{app.phone} &nbsp;|&nbsp; {app.branch} &nbsp;|&nbsp; {app.domain}</span>
                    </div>
                    <button
                      onClick={() => openWhatsApp(app.phone, waMessage)}
                      style={{
                        background: "#25D366", color: "white", border: "none",
                        padding: "9px 18px", borderRadius: "8px", cursor: "pointer",
                        fontWeight: "700", fontSize: "13px", display: "flex",
                        alignItems: "center", gap: "6px", whiteSpace: "nowrap"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="14" height="14">
                        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.454-2.012A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.274 19.472c-.398-.199-2.354-1.161-2.719-1.294-.365-.132-.631-.198-.897.2-.266.397-1.03 1.293-1.262 1.56-.232.265-.465.298-.863.099-.398-.2-1.68-.619-3.2-1.974-1.183-1.054-1.98-2.355-2.213-2.752-.232-.398-.025-.613.175-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.132-.265.066-.497-.033-.696-.1-.2-.897-2.163-1.23-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.265 0-.696.1-1.061.497-.365.398-1.394 1.362-1.394 3.32 0 1.959 1.427 3.851 1.626 4.116.2.266 2.806 4.283 6.797 6.007 4.002 1.726 4.002 1.15 4.724 1.077.722-.073 2.354-.962 2.686-1.892.332-.929.332-1.726.232-1.892-.099-.166-.365-.265-.763-.464z"/>
                      </svg>
                      Send WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
            Schedule interviews in bulk for all shortlisted/approved candidates. They will automatically receive the interview details email.
          </p>
          
          <form onSubmit={handleBulkSchedule} style={{ display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "150px", flex: 1 }}>
              <label style={{ fontSize: "12px", color: "#c0c0c0", fontWeight: "700", letterSpacing: "0.8px" }}>DATE</label>
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
              <label style={{ fontSize: "12px", color: "#c0c0c0", fontWeight: "700", letterSpacing: "0.8px" }}>TIME</label>
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
              <label style={{ fontSize: "12px", color: "#c0c0c0", fontWeight: "700", letterSpacing: "0.8px" }}>VENUE / CLASSROOM / BUILDING</label>
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
              <span style={{ fontSize: "13px", color: approvedCount > 0 ? "#17a2b8" : "#ffc107", fontWeight: "500", paddingBottom: "5px" }}>
                ● {approvedCount} Approved applicant(s) ready to schedule
              </span>
              <button
                type="submit"
                disabled={bulkSubmitting || approvedCount === 0}
                style={{
                  background: approvedCount > 0 ? "#007bff" : "rgba(255,255,255,0.05)",
                  color: approvedCount > 0 ? "white" : "#666",
                  border: "none",
                  padding: "11px 24px",
                  borderRadius: "8px",
                  cursor: approvedCount > 0 ? "pointer" : "not-allowed",
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
          <p style={{ color: "#aaa", fontSize: "18px" }}>No applications found in the database.</p>
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
                  <h3 style={{ fontSize: "22px", margin: 0, fontWeight: "600", color: "#ffffff" }}>{app.name}</h3>
                  <span style={{ fontSize: "13px", color: "#c0c0c0" }}>Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
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
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#c0c0c0", fontWeight: "700", display: "block", letterSpacing: "0.8px", marginBottom: "4px" }}>EMAIL</span>
                  <a href={`mailto:${app.email}`} style={{ color: "#dfa557", textDecoration: "none", wordBreak: "break-all", fontWeight: "600", fontSize: "14px" }}>{app.email}</a>
                </div>
                <div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#c0c0c0", fontWeight: "700", display: "block", letterSpacing: "0.8px", marginBottom: "4px" }}>PHONE</span>
                  <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "14px" }}>{app.phone}</span>
                </div>
                <div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#c0c0c0", fontWeight: "700", display: "block", letterSpacing: "0.8px", marginBottom: "4px" }}>BRANCH</span>
                  <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "14px" }}>{app.department || app.branch}</span>
                </div>
                <div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#c0c0c0", fontWeight: "700", display: "block", letterSpacing: "0.8px", marginBottom: "4px" }}>YEAR</span>
                  <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "14px" }}>{app.year}</span>
                </div>
                <div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#c0c0c0", fontWeight: "700", display: "block", letterSpacing: "0.8px", marginBottom: "4px" }}>DOMAIN</span>
                  <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "14px" }}>{app.domain || app.skills || "N/A"}</span>
                </div>
              </div>

              {/* Message / Why Join */}
              <div style={{ background: "rgba(255, 255, 255, 0.01)", borderRadius: "8px", padding: "16px", borderLeft: "3px solid var(--accent, #0056b3)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#c0c0c0", fontWeight: "700", display: "block", marginBottom: "8px", letterSpacing: "0.8px" }}>WHY JOIN / APPLICATION STATEMENT</span>
                <p style={{ margin: 0, fontSize: "15px", color: "#ffffff", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
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

              {/* Individual Interview Scheduler Inline Form */}
              {app.status === "Approved" && schedulingId === app._id && (
                <div style={{
                  background: "rgba(0, 123, 255, 0.05)",
                  border: "1px solid rgba(0, 123, 255, 0.2)",
                  borderRadius: "10px",
                  padding: "16px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#007bff" }}>Schedule Individual Interview</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: "120px" }}>
                      <label style={{ fontSize: "11px", color: "#bbb", fontWeight: "600" }}>Date</label>
                      <input
                        type="date"
                        required
                        value={indivDate}
                        onChange={(e) => setIndivDate(e.target.value)}
                        style={{
                          background: "#161616",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                          padding: "8px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: "100px" }}>
                      <label style={{ fontSize: "11px", color: "#bbb", fontWeight: "600" }}>Time</label>
                      <input
                        type="time"
                        required
                        value={indivTime}
                        onChange={(e) => setIndivTime(e.target.value)}
                        style={{
                          background: "#161616",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                          padding: "8px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 2, minWidth: "180px" }}>
                      <label style={{ fontSize: "11px", color: "#bbb", fontWeight: "600" }}>Venue / Classroom / Link</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Room 102, Aero Block"
                        value={indivLocation}
                        onChange={(e) => setIndivLocation(e.target.value)}
                        style={{
                          background: "#161616",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "white",
                          padding: "8px",
                          borderRadius: "6px",
                          fontSize: "13px"
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "4px" }}>
                    <button
                      onClick={() => setSchedulingId(null)}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "#aaa",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "7px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleIndividualSchedule(app._id)}
                      disabled={indivSubmitting}
                      style={{
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}
                    >
                      {indivSubmitting ? "Sending..." : "Confirm & Send Invite"}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
                {/* 1. Pending candidate can be approved (shortlisted) for interview */}
                {app.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(app._id, "Approved")}
                    style={{
                      background: "#17a2b8",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.2s"
                    }}
                    className="btn-shortlist"
                  >
                    Approve for Interview
                  </button>
                )}

                {/* 2. Approved candidate can have interview scheduled */}
                {app.status === "Approved" && schedulingId !== app._id && (
                  <button
                    onClick={() => {
                      setSchedulingId(app._id);
                      setIndivDate("");
                      setIndivTime("");
                      setIndivLocation("");
                    }}
                    style={{
                      background: "#007bff",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.2s"
                    }}
                    className="btn-schedule"
                  >
                    Schedule Interview
                  </button>
                )}

                {/* 3. Candidate whose interview is scheduled can be selected/finalized */}
                {app.status === "Interview Scheduled" && (
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
                    className="btn-select"
                  >
                    Select & Finalize
                  </button>
                )}

                {/* Reject action available for any candidate that is not already selected or rejected */}
                {app.status !== "Selected" && app.status !== "Rejected" && (
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
