import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const updateTeam = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    // 1. Update Deepti Kushwah position to 'Promotion Head'
    const deepti = await Team.findOne({ name: /Deepti/i });
    if (deepti) {
      deepti.position = "Promotion Head";
      deepti.department = "Promotion & Social Media";
      await deepti.save();
      console.log("Updated Deepti Kushwah:", deepti);
    } else {
      console.log("Deepti Kushwah not found in DB.");
    }

    // 2. Add or Update Nishant Kaushal
    let nishant = await Team.findOne({ name: /Nishant Kaushal/i });
    if (nishant) {
      nishant.position = "Social Media Lead";
      nishant.department = "PR & Social Media";
      nishant.bio = "Leads social media operations, digital presence, public relations, and promotional strategy.";
      nishant.image = "/nishant_kaushal.jpg";
      nishant.linkedin = "";
      nishant.github = "";
      nishant.isLeader = true;
      await nishant.save();
      console.log("Updated existing Nishant Kaushal record:", nishant);
    } else {
      nishant = await Team.create({
        name: "Nishant Kaushal",
        position: "Social Media Lead",
        department: "PR & Social Media",
        bio: "Leads social media operations, digital presence, public relations, and promotional strategy.",
        image: "/nishant_kaushal.jpg",
        linkedin: "",
        github: "",
        isLeader: true
      });
      console.log("Created new Nishant Kaushal record:", nishant);
    }

    console.log("Team updates complete!");
  } catch (error) {
    console.error("Update failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

updateTeam();
