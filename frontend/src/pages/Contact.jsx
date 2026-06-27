function Contact() {
  return (
    <div className="container" style={{ padding: "100px 24px", minHeight: "80vh" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "20px", fontFamily: "var(--font-heading)" }}>
        Contact Us
      </h1>
      <p style={{ fontSize: "18px", color: "var(--secondary)", marginBottom: "40px", maxWidth: "600px" }}>
        Have questions or want to collaborate with Dronex AeroTech? Reach out to us through any of the channels below.
      </p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "16px" }}>
        <p><strong>📧 Email:</strong> dronexaerotech@gmail.com</p>
        <p><strong>📍 Location:</strong> Your College Campus, Aero Lab - Block C</p>
        <p><strong>📞 Phone:</strong> +91 XXXXX XXXXX</p>
      </div>
    </div>
  );
}

export default Contact;
