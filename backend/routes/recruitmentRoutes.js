import express from "express";
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/recruitmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createApplication);

router.get("/", getApplications);

router.put("/:id", authMiddleware, updateApplicationStatus);

router.delete("/:id", authMiddleware, deleteApplication);

export default router;
