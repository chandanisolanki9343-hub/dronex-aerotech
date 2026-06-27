import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
