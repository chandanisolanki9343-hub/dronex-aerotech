import express from "express";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  scheduleInterview,
} from "../controllers/recruitmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createApplication);

router.get("/", authMiddleware, getApplications);

router.put("/:id", authMiddleware, updateApplicationStatus);
router.put("/:id/schedule", authMiddleware, scheduleInterview);

router.delete("/:id", authMiddleware, deleteApplication);

export default router;
