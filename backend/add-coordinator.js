import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import dns from "dns";

// Prevent connection issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const addCoordinator = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    const name = "Dr. Yashwant Sawle";
    const position = "Club Coordinator";
    const department = "Coordinator";
    const bio = "Club Coordinator guiding the technical and management operations of Dronex AeroTech.";
    const image = "/yashwant_sawle.png";
    const isLeader = true;

    let member = await Team.findOne({ name: "Dr. Yashwant Sawle" });

    if (member) {
      console.log("Found Dr. Yashwant Sawle. Updating details...");
      member.position = position;
      member.department = department;
      member.bio = bio;
      member.image = image;
      member.isLeader = isLeader;
      await member.save();
      console.log("Updated Dr. Yashwant Sawle.");
    } else {
      console.log("Dr. Yashwant Sawle not found. Creating new member entry...");
      await Team.create({
        name,
        position,
        department,
        bio,
        image,
        isLeader,
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      });
      console.log("Created Dr. Yashwant Sawle.");
    }
  } catch (error) {
    console.error("Failed to add coordinator:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

addCoordinator();
