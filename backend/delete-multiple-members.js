import "dotenv/config";
import mongoose from "mongoose";
import Team from "./models/Team.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const namesToDelete = [
  "Varun Dhawan",
  "Pooja Hegde",
  "Natasha Gill",
  "Ritvik Sood",
  "Maya Ali",
  "Aryan Khan",
  "Sneha Kapoor",
  "Armaan Malik",
  "Ananya Panday",
  "Neil D'Souza"
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for migration");

    const result = await Team.deleteMany({ name: { $in: namesToDelete } });
    console.log(`Successfully deleted ${result.deletedCount} profiles from the database.`);
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

run();
