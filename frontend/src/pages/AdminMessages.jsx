import { useEffect, useState } from "react";
import api from "../services/api";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [replyInputs, setReplyInputs] = useState({}); // Stores reply text by message id
  const [activeReplyId, setActiveReplyId] = useState(null); // Active message being replied to
  const [submittingReply, setSubmittingReply] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data.messages || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplyInputs({
      ...replyInputs,
      [id]: value
    });
  };

  const submitReply = async (id) => {
    const replyText = replyInputs[id];
    if (!replyText || !replyText.trim()) {
      alert("Please enter a reply message.");
      return;
    }

    if (!window.confirm("Are you sure you want to send this reply email?")) return;

    setSubmittingReply(true);
    try {
      await api.post(`/messages/${id}/reply`, { replyText });
      alert("Reply sent successfully!");
      setActiveReplyId(null);
      // Clear input
      setReplyInputs({
        ...replyInputs,
        [id]: ""
      });
      fetchMessages();
    } catch (error) {
      console.log(error);
      alert("Failed to send reply email.");
    } finally {
      setSubmittingReply(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`/messages/${id}`);
      alert("Message Deleted Successfully");
      fetchMessages();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", minHeight: "80vh", color: "var(--primary, #333)" }}>
      <div style={{ marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", letterSpacing: "-0.5px" }}>Contact Messages</h1>
        <p style={{ color: "#777", marginTop: "5px" }}>Review, reply, and manage incoming user inquiries from the website.</p>
      </div>

      {messages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#777", fontSize: "18px" }}>No messages found in the database.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "25px" }}>
          {messages.map((msg) => (
            <div
              key={msg._id}
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
              {/* Header with sender and status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <h3 style={{ fontSize: "20px", margin: 0, fontWeight: "600" }}>{msg.name}</h3>
                  <span style={{ fontSize: "13px", color: "#666" }}>Received on: {new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    backgroundColor: msg.isReplied ? "rgba(40, 167, 69, 0.15)" : "rgba(255, 193, 7, 0.15)",
                    color: msg.isReplied ? "#28a745" : "#ffc107",
                    border: msg.isReplied ? "1px solid rgba(40, 167, 69, 0.3)" : "1px solid rgba(255, 193, 7, 0.3)"
                  }}
                >
                  {msg.isReplied ? "Replied" : "Pending Reply"}
                </span>
              </div>

              {/* Grid metadata */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px", margin: "5px 0" }}>
                <div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block" }}>Email</span>
                  <a href={`mailto:${msg.email}`} style={{ color: "var(--accent, #0056b3)", textDecoration: "none", wordBreak: "break-all", fontSize: "15px" }}>{msg.email}</a>
                </div>
                <div>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block" }}>Subject</span>
                  <span style={{ fontSize: "15px", fontWeight: "500" }}>{msg.subject}</span>
                </div>
              </div>

              {/* Message text */}
              <div style={{ background: "rgba(255, 255, 255, 0.01)", borderRadius: "8px", padding: "16px", borderLeft: "3px solid rgba(255,255,255,0.2)" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#666", fontWeight: "600", display: "block", marginBottom: "8px" }}>Message</span>
                <p style={{ margin: 0, fontSize: "15px", color: "#ccc", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                  {msg.message}
                </p>
              </div>

              {/* Render sent reply if already replied */}
              {msg.isReplied && (
                <div style={{ background: "rgba(40, 167, 69, 0.03)", borderRadius: "8px", padding: "16px", borderLeft: "3px solid #28a745" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#28a745", fontWeight: "600" }}>Your Reply</span>
                    {msg.repliedAt && <span style={{ fontSize: "11px", color: "#666" }}>Replied on: {new Date(msg.repliedAt).toLocaleString()}</span>}
                  </div>
                  <p style={{ margin: 0, fontSize: "15px", color: "#ccc", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                    {msg.replyText}
                  </p>
                </div>
              )}

              {/* Inline Reply Form */}
              {activeReplyId === msg._id && (
                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "12px", textTransform: "uppercase", color: "#888", fontWeight: "600" }}>Compose Email Reply</label>
                  <textarea
                    rows="5"
                    value={replyInputs[msg._id] || ""}
                    onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                    placeholder="Type your professional reply here... This will be sent directly to their email address."
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                      fontSize: "15px",
                      fontFamily: "var(--font-body)",
                      lineHeight: "1.5",
                      resize: "vertical",
                      outline: "none"
                    }}
                  />
                  <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => submitReply(msg._id)}
                      disabled={submittingReply}
                      style={{
                        background: "var(--accent, #0056b3)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        opacity: submittingReply ? 0.7 : 1
                      }}
                    >
                      {submittingReply ? "Sending..." : "Send Email Reply"}
                    </button>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      style={{
                        background: "transparent",
                        color: "#aaa",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "9px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px"
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {activeReplyId !== msg._id && (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                  <button
                    onClick={() => setActiveReplyId(msg._id)}
                    style={{
                      background: "var(--accent, #0056b3)",
                      color: "white",
                      border: "none",
                      padding: "9px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.2s"
                    }}
                  >
                    {msg.isReplied ? "Reply Again" : "Reply"}
                  </button>
                  <button
                    onClick={() => deleteMessage(msg._id)}
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
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
