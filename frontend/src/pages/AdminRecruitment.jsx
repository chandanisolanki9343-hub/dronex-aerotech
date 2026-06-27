import { useEffect, useState } from "react";
import api from "../services/api";

function AdminRecruitment() {
  const [applications, setApplications] = useState([]);

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

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await api.delete(`/recruitment/${id}`);
      alert("Application Deleted Successfully");
      fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Recruitment Applications</h1>

      {applications.length === 0 ? (
        <p>No Applications Found</p>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>{app.name}</h3>

            <p>
              <strong>Email:</strong> {app.email}
            </p>

            <p>
              <strong>Phone:</strong> {app.phone}
            </p>

            <p>
              <strong>Department:</strong> {app.department}
            </p>

            <p>
              <strong>Year:</strong> {app.year}
            </p>

            <p>
              <strong>Reason:</strong> {app.reason}
            </p>

            <button onClick={() => deleteApplication(app._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminRecruitment;
