import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Recruitment from "./pages/Recruitment";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminProjects from "./pages/AdminProjects";
import AdminEvents from "./pages/AdminEvents";
import AdminTeam from "./pages/AdminTeam";
import AdminGallery from "./pages/AdminGallery";
import AdminMessages from "./pages/AdminMessages";
import AdminSubscribers from "./pages/AdminSubscribers";
import AdminRecruitment from "./pages/AdminRecruitment";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminPage = location.pathname.startsWith("/dashboard") || location.pathname === "/admin-login";

  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/team" element={<Team />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/recruitment" element={<Recruitment />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/portfolio" element={<Portfolio />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/dashboard/projects" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminProjects />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard/events" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminEvents />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard/team" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminTeam />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard/gallery" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminGallery />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard/messages" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminMessages />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard/subscribers" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminSubscribers />
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/dashboard/recruitment" element={
        <ProtectedRoute>
          <AdminLayout>
            <AdminRecruitment />
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
    {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
