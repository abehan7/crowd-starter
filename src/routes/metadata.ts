import express from "express";
import { getImage, getMetadata, uploadMetadata } from "../controller/metadata";
const router = express.Router();

router.get("/:id/info.json", getMetadata);
router.get("/:id/image.png", getImage);
router.post("/", uploadMetadata);

export default router;
