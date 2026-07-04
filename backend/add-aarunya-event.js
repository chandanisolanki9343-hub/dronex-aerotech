import "dotenv/config";
import mongoose from "mongoose";
import Event from "./models/Event.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const addAarunyaEvent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const eventData = {
      title: "Aarunya 2026 X Dronex: Official Drone Simulator Zone",
      description: "Dronex AeroTech successfully hosted the Official Drone Simulator Zone at Aarunya 2026, the grand college fest at MITS. The event featured a high-tech drone simulator where participants experienced the thrill of flying, undertook flying challenges, competed for exciting rewards, and received beginner-friendly training from our tech team.",
      date: "Feb 21-23, 2026",
      time: "All Day",
      venue: "College Fest Arena, MITS Gwalior",
      image: "/aarunya_stall.jpg",
      isCompleted: true
    };

    // Check if it already exists to avoid duplicates
    const existing = await Event.findOne({ title: eventData.title });
    if (existing) {
      console.log("Event already exists, updating it...");
      await Event.findByIdAndUpdate(existing._id, eventData);
      console.log("Event updated successfully!");
    } else {
      await Event.create(eventData);
      console.log("Event added successfully!");
    }
  } catch (err) {
    console.error("Failed to add event:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

addAarunyaEvent();
