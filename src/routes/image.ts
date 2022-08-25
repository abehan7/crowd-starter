import express from "express";
import { uploadImage } from "../controller/image";
const router = express.Router();

// router.get("/:id", getImage);
router.post("/", uploadImage);

export default router;
