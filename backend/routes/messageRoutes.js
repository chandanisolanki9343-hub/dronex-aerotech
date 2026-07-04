import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
  replyToMessage,
} from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createMessage);

router.get("/", authMiddleware, getMessages);

router.delete("/:id", authMiddleware, deleteMessage);

router.post("/:id/reply", authMiddleware, replyToMessage);

export default router;
