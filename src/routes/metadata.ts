import express from "express";
import { getImage, getMetadata } from "../controller/metadata";
const router = express.Router();

router.get("/:id/info.json", getMetadata);
router.get("/:id/image.png", getImage);

export default router;
