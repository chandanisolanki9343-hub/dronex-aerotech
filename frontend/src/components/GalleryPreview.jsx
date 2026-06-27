import "./GalleryPreview.css";

function GalleryPreview({ item }) {
  return (
    <div className="gallery-card">

      {item.type === "image" ? (
        <img
          src={item.mediaUrl}
          alt={item.title}
        />
      ) : (
        <video
          src={item.mediaUrl}
          controls
        />
      )}

      <div className="gallery-overlay">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

    </div>
  );
}

export default GalleryPreview;
