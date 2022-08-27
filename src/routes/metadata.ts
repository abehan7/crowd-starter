import express from "express";
import { getImage, getMetadata, uploadMetadata } from "../controller/metadata";
import { authWallet } from "../middleware/authWallet";
const router = express.Router();

router.get("/:id/info.json", getMetadata);
router.get("/:id/image.png", getImage);
router.post("/", uploadMetadata);
// router.post("/", authWallet, uploadMetadata);

export default router;
