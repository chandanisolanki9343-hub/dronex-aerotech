import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Recruitment.css";

// ── Toggle recruitment status (Set to false to close recruitment) ──
const IS_RECRUITMENT_OPEN = false;

function Recruitment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    domain: "",
    message: "",
    paymentProof: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploadingProof, setUploadingProof] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProofUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG/JPG screenshot)");
      return;
    }

    setUploadingProof(true);
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await api.post("/upload/image", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        paymentProof: res.data.imageUrl,
      }));

      alert("Payment proof screenshot uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload screenshot. Please try again.");
    } finally {
      setUploadingProof(false);
    }
  };

  const removePaymentProof = () => {
    setFormData((prev) => ({
      ...prev,
      paymentProof: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/recruitment", formData);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        year: "",
        domain: "",
        message: "",
        paymentProof: "",
      });
    } catch (err) {
      console.log(err);
      alert("Submission Failed");
    }

    setLoading(false);
  };

  // ── Recruitment Closed Screen ──
  if (!IS_RECRUITMENT_OPEN) {
    return (
      <div className="recruitment-container" style={{ maxWidth: "860px" }}>
        <div className="recruitment-closed-card">
          {/* Status Badge */}
          <div className="closed-badge">
            <span className="closed-badge-dot"></span>
            <span>APPLICATIONS CLOSED</span>
          </div>

          {/* Icon Header */}
          <div className="closed-icon-container">
            <div className="closed-icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="48"
                height="48"
                color="#dfa557"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="closed-main-heading">
            Dronex AeroTech Recruitment is Closed
          </h1>
          <p className="closed-sub-heading">
            Thank you for the tremendous enthusiasm and interest! Applications for the current recruitment drive are now officially closed.
          </p>

          <div className="closed-hindi-notice">
            📢 <strong>Dronex AeroTech</strong> ki recruitment abhi ke liye <strong>close (band)</strong> ho chuki hai. Agar aapne apply kiya hai, toh hamari team aage ke rounds (interview schedule) ke liye aapke Phone Number / WhatsApp aur Email par contact karegi.
          </div>

          {/* Important Info Cards Grid */}
          <div className="closed-info-grid">
            <div className="closed-info-box">
              <div className="closed-info-icon">📩</div>
              <h4>Applied Candidates</h4>
              <p>Check your WhatsApp &amp; Email regularly for interview schedule updates.</p>
            </div>
            <div className="closed-info-box">
              <div className="closed-info-icon">🚁</div>
              <h4>Next Recruitment Cycle</h4>
              <p>Follow our social channels to get notified when new positions reopen.</p>
            </div>
            <div className="closed-info-box">
              <div className="closed-info-icon">🤝</div>
              <h4>Contact &amp; Queries</h4>
              <p>Have questions? Reach out to our club coordinators anytime.</p>
            </div>
          </div>

          {/* WhatsApp Group Banner */}
          <a
            href="https://chat.whatsapp.com/HAcHOIKY8Yu9U2BSGf3Yrv"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-join-banner"
            style={{ width: "100%", margin: "10px 0" }}
          >
            <div className="whatsapp-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="28" height="28">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.454-2.012A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.76-1.848l-.485-.287-5.02 1.195 1.235-4.896-.317-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.861c-.398-.199-2.354-1.161-2.719-1.294-.365-.132-.631-.198-.897.2-.266.397-1.03 1.293-1.262 1.56-.232.265-.465.298-.863.099-.398-.2-1.68-.619-3.2-1.974-1.183-1.054-1.98-2.355-2.213-2.752-.232-.398-.025-.613.175-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.132-.265.066-.497-.033-.696-.1-.2-.897-2.163-1.23-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.265 0-.696.1-1.061.497-.365.398-1.394 1.362-1.394 3.32 0 1.959 1.427 3.851 1.626 4.116.2.266 2.806 4.283 6.797 6.007 4.002 1.726 4.002 1.15 4.724 1.077.722-.073 2.354-.962 2.686-1.892.332-.929.332-1.726.232-1.892-.099-.166-.365-.265-.763-.464z"/>
              </svg>
            </div>
            <div className="whatsapp-banner-text">
              <span className="whatsapp-banner-title">Join Our WhatsApp Group</span>
              <span className="whatsapp-banner-sub">Stay connected for future announcements &amp; club events</span>
            </div>
            <div className="whatsapp-banner-btn">
              Join Group →
            </div>
          </a>

          {/* Action Buttons */}
          <div className="closed-action-buttons">
            <Link to="/" className="btn btn-primary" style={{ padding: "12px 28px" }}>
              Explore Website &amp; Home
            </Link>
            <Link to="/projects" className="btn btn-secondary" style={{ padding: "12px 28px" }}>
              View Our Drone Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recruitment-container">
      <div className="recruitment-header">
        <h1>Dronex AeroTech Recruitment</h1>
        <p>Fill the form below to join our club.</p>
      </div>

      {submitted ? (
        /* ── Success Screen ── */
        <div className="recruitment-success-screen">
          <div className="success-checkmark">✅</div>
          <h2 className="success-title">Application Submitted!</h2>
          <p className="success-subtitle">
            Thank you for applying to Dronex AeroTech. We will review your application and get back to you soon.
          </p>

          <a
            href="https://chat.whatsapp.com/HAcHOIKY8Yu9U2BSGf3Yrv?s=cl&p=a&mlu=4&ilr=4"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-join-banner"
          >
            <div className="whatsapp-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="32" height="32">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.454-2.012A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.76-1.848l-.485-.287-5.02 1.195 1.235-4.896-.317-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.861c-.398-.199-2.354-1.161-2.719-1.294-.365-.132-.631-.198-.897.2-.266.397-1.03 1.293-1.262 1.56-.232.265-.465.298-.863.099-.398-.2-1.68-.619-3.2-1.974-1.183-1.054-1.98-2.355-2.213-2.752-.232-.398-.025-.613.175-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.132-.265.066-.497-.033-.696-.1-.2-.897-2.163-1.23-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.265 0-.696.1-1.061.497-.365.398-1.394 1.362-1.394 3.32 0 1.959 1.427 3.851 1.626 4.116.2.266 2.806 4.283 6.797 6.007 4.002 1.726 4.002 1.15 4.724 1.077.722-.073 2.354-.962 2.686-1.892.332-.929.332-1.726.232-1.892-.099-.166-.365-.265-.763-.464z"/>
              </svg>
            </div>
            <div className="whatsapp-banner-text">
              <span className="whatsapp-banner-title">Join Our WhatsApp Group</span>
              <span className="whatsapp-banner-sub">Get updates, announcements &amp; connect with the team instantly</span>
            </div>
            <div className="whatsapp-banner-btn">
              Join Now →
            </div>
          </a>

          <button
            className="btn btn-primary"
            style={{ marginTop: "8px", alignSelf: "center" }}
            onClick={() => setSubmitted(false)}
          >
            Submit Another Application
          </button>
        </div>
      ) : (

      <form className="recruitment-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="e.g. +91 XXXXX XXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              name="branch"
              placeholder="e.g. CSE, AIML, ECE..."
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Select Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="domain">Preferred Domain</label>
            <select
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
            >
              <option value="">Preferred Domain</option>
              <option>Web Development</option>
              <option>Event Management</option>
              <option>Photo & Video Editing</option>
              <option>Promotion & Social Media</option>
              <option>Photography & Videography</option>
              <option>Technical</option>
              <option>Content Writing</option>
              <option>Graphic Designing & Auto CAD</option>
            </select>
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="message">Why do you want to join Dronex AeroTech?</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell us about your interests, skills, or what you hope to learn..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="recruitment-btn-container">
          <button className="btn btn-primary" type="submit" disabled={loading || uploadingProof}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}

export default Recruitment;
