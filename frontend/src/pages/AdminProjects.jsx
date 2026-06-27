import { useEffect, useState } from "react";
import api from "../services/api";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProject = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData);

        alert("Project Updated Successfully");

        setEditingId(null);
      } else {
        await api.post("/projects", formData);

        alert("Project Added Successfully");
      }

      setFormData({
        title: "",
        description: "",
        image: "",
      });

      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };
  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);

      alert("Project Deleted");

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const res = await api.post("/upload/image", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        ...formData,
        image: res.data.imageUrl,
      });

      alert("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Image Upload Failed");
    }
  };

  return (
    <div>
      <h1>Manage Projects</h1>

      <form onSubmit={addProject}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        <br /><br />

        <button type="submit">
          Add Project
        </button>
      </form>

      <hr />

      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              width="200"
            />
          )}

          <br /><br />
          <button onClick={() => deleteProject(project._id)}>
            Delete
          </button>
          <button onClick={() => {
            setEditingId(project._id);
            setFormData({
              title: project.title,
              description: project.description,
              image: project.image || "",
            });
          }}>
            Edit
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminProjects;
