import express from "express";

import {
  getTeam,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getTeam);

router.post("/", addMember);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

export default router;
