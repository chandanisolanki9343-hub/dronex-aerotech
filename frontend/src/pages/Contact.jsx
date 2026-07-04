import { useState } from "react";
import api from "../services/api";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await api.post("/messages", formData);
      if (res.data.success) {
        setSuccessMsg("Your message has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(res.data.message || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "120px 24px", minHeight: "80vh" }}>
      <div className="fade-up" style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "15px", fontFamily: "var(--font-heading)" }}>
          Contact Us
        </h1>
        <p style={{ fontSize: "17px", color: "var(--secondary)", maxWidth: "600px", margin: "0 auto" }}>
          Have questions or want to collaborate with Dronex AeroTech? Reach out to us directly or drop us a message.
        </p>
      </div>

      <div className="contact-grid fade-up">
        {/* Left Side: Contact Methods */}
        <div className="contact-info-section">
          {/* Email Card */}
          <div className="contact-method-card">
            <div className="contact-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <div className="contact-method-content">
              <h3>Email Us</h3>
              <p><a href="mailto:soniparths555@gmail.com">soniparths555@gmail.com</a></p>
            </div>
          </div>

          {/* Location Card */}
          <div className="contact-method-card">
            <div className="contact-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="contact-method-content">
              <h3>Our Location</h3>
              <p>College Campus, Drone School</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="contact-method-card">
            <div className="contact-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="contact-method-content">
              <h3>Call Us</h3>
              <p><a href="tel:+919425168627">+91 9425168627</a></p>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="contact-method-card">
            <div className="contact-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="contact-method-content">
              <h3>Follow Us</h3>
              <p>
                <a href="https://www.instagram.com/dronex_aerotech.mitsdu?igsh=MWZ1N3lrOGN4dG9mMg==" target="_blank" rel="noopener noreferrer">
                  @dronex_aerotech.mitsdu
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="contact-form-card">
          <h2>Send us a Message</h2>
          
          {successMsg && <div className="alert alert-success">{successMsg}</div>}
          {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                placeholder="Enter message subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: "100%", padding: "14px", marginTop: "10px" }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
