import "dotenv/config";
import cloudinary from "./config/cloudinary.js";
import dns from "dns";

// Prevent connection issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const localImagePath = "c:/Users/Ghans/OneDrive/Desktop/Dronex/backend/jet-bg.png";

const upload = async () => {
  try {
    console.log("Uploading jet background image to Cloudinary...");
    const uploadResult = await cloudinary.uploader.upload(localImagePath, {
      folder: "dronex-aerotech"
    });
    console.log("Upload successful!");
    console.log("IMAGE_URL:", uploadResult.secure_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

upload();
