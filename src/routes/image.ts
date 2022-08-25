import express from "express";
import multer from "multer";
const multerSingle = multer();

import { uploadImage } from "../controller/image";
const router = express.Router();

// router.get("/:id", getImage);
router.post("/", multerSingle.single("image"), uploadImage);

export default router;
