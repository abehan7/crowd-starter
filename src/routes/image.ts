import express from "express";
import multer from "multer";
const multerSingle = multer();

import { uploadImage } from "../controller/image";
import { authWallet } from "../middleware/authWallet";
const router = express.Router();

// router.get("/:id", getImage);
router.post("/", authWallet, multerSingle.single("image"), uploadImage);

export default router;
