import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import dns from "dns";

// Prevent connection issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const addDivyansh = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    const name = "Divyansh Sharma";
    const position = "Technical Executive";
    const department = "Technical";
    const bio = "Focuses on drone software integration, flight testing, telemetry systems, and hardware-software synchronization.";
    const image = "/divyansh_sharma.png";
    const linkedin = "https://www.linkedin.com/in/workdivyanshsharma/";
    const github = "https://github.com/workdivyansh";
    const isLeader = false;

    let member = await Team.findOne({ name: "Divyansh Sharma" });

    if (member) {
      console.log("Found Divyansh Sharma. Updating details...");
      member.position = position;
      member.department = department;
      member.bio = bio;
      member.image = image;
      member.linkedin = linkedin;
      member.github = github;
      member.isLeader = isLeader;
      await member.save();
      console.log("Updated Divyansh Sharma.");
    } else {
      console.log("Divyansh Sharma not found. Creating new member entry...");
      await Team.create({
        name,
        position,
        department,
        bio,
        image,
        linkedin,
        github,
        isLeader
      });
      console.log("Created Divyansh Sharma.");
    }
  } catch (error) {
    console.error("Failed to add Divyansh Sharma:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

addDivyansh();
