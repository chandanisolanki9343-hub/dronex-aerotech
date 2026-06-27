import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import dns from "dns";

// Prevent connection issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const imageUrl = "https://res.cloudinary.com/dbkednkcg/image/upload/v1782485715/dronex-aerotech/dcbnt5oetlnil3kfd0d1.jpg";

const updateDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    // Try finding Priya Sharma first
    let member = await Team.findOne({ name: "Priya Sharma" });

    if (member) {
      console.log("Found Priya Sharma. Updating...");
      member.name = "Arpita Makwana";
      member.position = "Domain Graphics Design";
      member.department = "Information Technology";
      member.image = imageUrl;
      await member.save();
      console.log("Updated team member to Arpita Makwana.");
    } else {
      // Fallback: check if Arpita already exists
      member = await Team.findOne({ name: "Arpita Makwana" });
      if (member) {
        console.log("Arpita Makwana already exists. Updating details...");
        member.position = "Domain Graphics Design";
        member.department = "Information Technology";
        member.image = imageUrl;
        await member.save();
        console.log("Updated Arpita Makwana's details.");
      } else {
        console.log("Creating new member Arpita Makwana...");
        await Team.create({
          name: "Arpita Makwana",
          position: "Domain Graphics Design",
          department: "Information Technology",
          bio: "Creative graphic designer focusing on user interface design, aesthetics, and promotional materials for Dronex.",
          image: imageUrl,
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        });
        console.log("Created Arpita Makwana.");
      }
    }
  } catch (error) {
    console.error("DB Update failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

updateDb();
