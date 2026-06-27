import "dotenv/config";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";
import dns from "dns";

// Prevent connection issues on some networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const checkOrSeedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    const admins = await Admin.find({});
    
    if (admins.length > 0) {
      console.log("Existing admins found:");
      admins.forEach(admin => {
        console.log(`- Name: ${admin.name}, Email: ${admin.email}`);
      });
    } else {
      console.log("No admins found in the database. Creating a default admin account...");
      
      const defaultEmail = "admin@dronex.com";
      const defaultPassword = "admin123";
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      
      const newAdmin = await Admin.create({
        name: "Dronex Admin",
        email: defaultEmail,
        password: hashedPassword,
        role: "admin"
      });
      
      console.log(`Default admin created successfully!`);
      console.log(`Email: ${defaultEmail}`);
      console.log(`Password: ${defaultPassword}`);
    }
  } catch (error) {
    console.error("Error checking or seeding admin:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

checkOrSeedAdmins();
