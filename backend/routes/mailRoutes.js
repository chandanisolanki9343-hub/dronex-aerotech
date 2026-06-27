import express from "express";
import { sendTestMail } from "../controllers/mailController.js";

const router = express.Router();

router.get("/test", sendTestMail);

export default router;
