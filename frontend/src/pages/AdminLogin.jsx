import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAdmin(
        formData.email,
        formData.password
      );

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-bg-wrapper">
        <div className="admin-login-banner">
          Dronex Aerotech | Fly Higher. Innovate Further.
        </div>

        <form
          className="admin-login-card"
          onSubmit={handleSubmit}
        >
          <div style={{
            padding: "8px 20px",
            borderRadius: "10px",
            background: "#000000",
            border: "1px solid var(--accent)",
            boxShadow: "0 4px 12px rgba(184, 137, 60, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            width: "fit-content",
            alignSelf: "center"
          }}>
            <img src="/logo.png" alt="Dronex AeroTech" style={{ height: "35px", objectFit: "contain" }} />
          </div>

          <hr />

          <h2>Admin Login</h2>

          <div className="admin-form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Password *</label>
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="admin-signin-btn"
          >
            Admin Login
          </button>

          <div className="admin-login-footer">
            Don't have an account? <a href="#create">Create One</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;