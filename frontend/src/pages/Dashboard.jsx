import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <h1>Welcome Admin</h1>

        <p>Dronex AeroTech Management Panel</p>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;