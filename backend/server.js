import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import recruitmentRoutes from "./routes/recruitmentRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/recruitment", recruitmentRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Dronex AeroTech Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});