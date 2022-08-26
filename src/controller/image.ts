import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import {
  clearCanvas,
  drawElement,
  drawText,
  loadLayerImg,
  saveCanvasPng,
} from "../utils/canvas";
import { cloudinary } from "../utils/cloudinary";
import { readPng, writePng } from "../utils/common";

export const getImage = (req: Request, res: Response) => {};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    const tmpPath = `${BASE_PATH}/images/nft-base.png`;
    const png = readPng(tmpPath);
    if (!png) throw new Error("fail to read png file");

    //
    // await loadLayerImg(png);
    const loadedImage = (await loadLayerImg(png)) as Buffer;
    drawElement(loadedImage);
    drawText("this is address");
    saveCanvasPng(`${BASE_PATH}/images/new-image.png`);
    clearCanvas();

    // const publicId = await cloudinary.uploadImageFile(png);
    // const cdBuffer = await cloudinary.uploadBuffer(png);
    // const publicId = await cloudinary.uploadImagePath(tmpPath);
    // console.log(cdBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "uploadImage || internal error" });
  }
};
