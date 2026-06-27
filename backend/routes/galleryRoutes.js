import express from "express";

import {
  getGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);

router.post("/", addGalleryItem);

router.put("/:id", updateGalleryItem);

router.delete("/:id", deleteGalleryItem);

export default router;
