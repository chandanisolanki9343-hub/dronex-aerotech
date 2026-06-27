import { useEffect, useState } from "react";
import api from "../services/api";
import GalleryPreview from "../components/GalleryPreview";

function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/gallery");
        setGallery(res.data.items || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="container" style={{ padding: "100px 24px", minHeight: "80vh" }}>
      <div className="section-header" style={{ marginBottom: "50px" }}>
        <h2>Gallery</h2>
        <p>A visual showcase of our drone tests, workshops, hackathons, and key team achievements.</p>
      </div>

      {gallery.length > 0 ? (
        <div className="projects-grid">
          {gallery.map((item) => (
            <GalleryPreview key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "var(--secondary)", marginTop: "40px" }}>
          No gallery images available. Check back soon!
        </p>
      )}
    </div>
  );
}

export default Gallery;
