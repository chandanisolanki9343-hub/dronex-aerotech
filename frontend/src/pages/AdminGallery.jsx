import { useEffect, useState } from "react";
import api from "../services/api";

function AdminGallery() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "image",
    mediaUrl: "",
    description: "",
  });

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");
      setItems(res.data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await api.post("/upload/image", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        ...formData,
        mediaUrl: res.data.imageUrl,
      });

      alert("Media Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  const saveItem = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/gallery/${editingId}`, formData);
        alert("Gallery Item Updated");
        setEditingId(null);
      } else {
        await api.post("/gallery", formData);
        alert("Gallery Item Added");
      }

      setFormData({
        title: "",
        type: "image",
        mediaUrl: "",
        description: "",
      });

      fetchGallery();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
      alert("Gallery Item Deleted");
      fetchGallery();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Manage Gallery</h1>

      <form onSubmit={saveItem}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="file"
          onChange={handleUpload}
        />

        <br /><br />

        <button type="submit">
          {editingId ? "Update Item" : "Add Item"}
        </button>

      </form>

      <hr />

      {items.map((item) => (
        <div key={item._id}>

          <h2>{item.title}</h2>

          <p>{item.description}</p>

          {item.type === "image" ? (
            <img
              src={item.mediaUrl}
              alt={item.title}
              width="250"
            />
          ) : (
            <video
              src={item.mediaUrl}
              width="250"
              controls
            />
          )}

          <br /><br />

          <button
            onClick={() => {
              setEditingId(item._id);

              setFormData({
                title: item.title,
                type: item.type,
                mediaUrl: item.mediaUrl,
                description: item.description,
              });
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteItem(item._id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminGallery;
