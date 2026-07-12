import { useEffect, useState } from "react";
import api from "../services/api";

function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    bio: "",
    image: "",
    linkedin: "",
    github: "",
    portfolio: "",
    isLeader: false,
  });

  const fetchMembers = async () => {
    try {
      const res = await api.get("/team");
      setMembers(res.data.members || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

      alert("Photo Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  const saveMember = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/team/${editingId}`, formData);
        alert("Member Updated");
        setEditingId(null);
      } else {
        await api.post("/team", formData);
        alert("Member Added");
      }

      setFormData({
        name: "",
        position: "",
        department: "",
        bio: "",
        image: "",
        linkedin: "",
        github: "",
        portfolio: "",
        isLeader: false,
      });

      fetchMembers();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
    try {
      await api.delete(`/team/${id}`);
      alert("Member Deleted");
      fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Manage Team</h1>

      <form onSubmit={saveMember}>
        <input
          type="text"
          name="name"
          placeholder="Member Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        <br /><br />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="portfolio"
          placeholder="Portfolio URL"
          value={formData.portfolio}
          onChange={handleChange}
        />

        <br /><br />

        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "var(--font-body)", color: "var(--primary)" }}>
          <input
            type="checkbox"
            name="isLeader"
            checked={formData.isLeader}
            onChange={handleChange}
            style={{ width: "auto", margin: 0 }}
          />
          Mark as Domain/Team Leader
        </label>

        <br /><br />

        <button type="submit">
          {editingId ? "Update Member" : "Add Member"}
        </button>
      </form>

      <hr />

      {members.map((member) => (
        <div key={member._id}>
          {member.image && (
            <img
              src={member.image}
              alt={member.name}
              width="150"
            />
          )}

          <h2>
            {member.name}
            {member.isLeader && (
              <span style={{ 
                fontSize: "12px", 
                background: "var(--accent)", 
                color: "var(--bg)", 
                padding: "2px 8px", 
                borderRadius: "12px", 
                marginLeft: "10px",
                verticalAlign: "middle"
              }}>
                Leader
              </span>
            )}
          </h2>

          <p>{member.position}</p>

          <p>{member.department}</p>

          <p>{member.bio}</p>

          <p>{member.linkedin}</p>

          <p>{member.github}</p>

          {member.portfolio && <p>{member.portfolio}</p>}

          <button
            onClick={() => {
              setEditingId(member._id);

              setFormData({
                name: member.name,
                position: member.position,
                department: member.department,
                bio: member.bio,
                image: member.image,
                linkedin: member.linkedin || "",
                github: member.github || "",
                portfolio: member.portfolio || "",
                isLeader: member.isLeader || false,
              });
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteMember(member._id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminTeam;
