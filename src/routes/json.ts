import express from "express";
import { uploadJson } from "../controller/metadata";
const router = express.Router();

router.post("/:id", uploadJson);

export default router;
