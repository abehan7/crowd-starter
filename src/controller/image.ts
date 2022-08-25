import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { cloudinary } from "../utils/cloudinary";
import { readPng } from "../utils/common";

export const getImage = (req: Request, res: Response) => {};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    const tmpPath = `${BASE_PATH}/images/nft-base.png`;
    const png = readPng(tmpPath);
    if (!png) throw new Error("fail to read png file");
    const publicId = await cloudinary.uploadImageFile(png);
    // const publicId = await cloudinary.uploadImagePath(tmpPath);
    console.log(publicId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "uploadImage || internal error" });
  }
};
