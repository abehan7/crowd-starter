import express from "express";
import { createERC1155 } from "../controller/web3-interact";
import { authWallet } from "../middleware/authWallet";
// import { getImage, getMetadata, uploadMetadata } from "../controller/metadata";
const router = express.Router();

router.post("/erc1155", authWallet, createERC1155);
// router.get("/:id/image.png", getImage);
// router.post("/", uploadMetadata);
// router.post("/", authWallet, uploadMetadata);

export default router;
