import { useState } from "react";
import api from "../services/api";
import "./Recruitment.css";

function Recruitment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    domain: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/recruitment", formData);

      alert("Application Submitted Successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        year: "",
        domain: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("Submission Failed");
    }

    setLoading(false);
  };

  return (
    <div className="recruitment-container">
      <div className="recruitment-header">
        <h1>Dronex AeroTech Recruitment</h1>
        <p>Fill the form below to join our club.</p>
      </div>

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
              <option>Event Management</option>
              <option>Photo & Video Editing</option>
              <option>Promotion & Social Media</option>
              <option>Photography & Videography</option>
              <option>Technical</option>
              <option>Content Writing</option>
              <option>Web Development</option>
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
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Recruitment;
