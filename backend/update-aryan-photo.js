import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const updateAryanPhoto = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    const result = await Team.updateOne(
      { name: /Aryan Bhadoriya/i },
      { $set: { image: "/aryan_bhadoriya.png" } }
    );

    console.log("Update result for Aryan Bhadoriya photo:", result);
  } catch (err) {
    console.error("Failed to update Aryan Bhadoriya photo:", err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

updateAryanPhoto();
