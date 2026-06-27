import "dotenv/config";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";
import dns from "dns";

// Prevent connection issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    const newPassword = "admin123";
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await Admin.findOneAndUpdate(
      { email: "admin@dronex.com" },
      { password: hashedPassword },
      { new: true }
    );

    if (admin) {
      console.log(`Password reset successful for ${admin.email}!`);
      console.log(`Email: admin@dronex.com`);
      console.log(`Password: admin123`);
    } else {
      console.log("Admin account not found. Creating a new one instead...");
      await Admin.create({
        name: "Admin",
        email: "admin@dronex.com",
        password: hashedPassword,
        role: "admin"
      });
      console.log(`Admin account created!`);
      console.log(`Email: admin@dronex.com`);
      console.log(`Password: admin123`);
    }
  } catch (error) {
    console.error("Password reset failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

resetPassword();
