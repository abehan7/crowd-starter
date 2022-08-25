import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { db } from "../model";
import { cloudinary } from "../utils/cloudinary";
import { readPng } from "../utils/common";

export const getMetadata = async (req: Request, res: Response) => {
  const id = req.params?.id;
  try {
    if (!id) throw new Error("getMetadata || id is not provided");
    const metadata = await db.Metadata.query.findMetadata(Number(id));
    if (metadata) {
      res.status(200).json(metadata.metadata);
    } else {
      res.status(404).json({ message: "Metadata not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "getMetadata || internal error" });
  }
};

export const getImage = (req: Request, res: Response) => {};
