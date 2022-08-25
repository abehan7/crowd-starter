import express from "express";
import { getImage, uploadImage } from "../controller/metadata";
const router = express.Router();

// router.get("/:id", getImage);
router.post("/:id", uploadImage);

export default router;
