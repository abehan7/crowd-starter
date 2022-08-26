import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import {
  clearCanvas,
  drawElement,
  drawText,
  getCanvasPng,
  loadLayerImg,
  saveCanvasPng,
} from "../utils/canvas";
import { cloudinary } from "../utils/cloudinary";
import { readPng, writePng } from "../utils/common";

export const getImage = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.params;
    console.log(public_id);
    const resource = await cloudinary.getAssetInfo(public_id);
    console.log(resource);
    const path = `${BASE_PATH}/images/__test__.png`;
    res.sendFile(path);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    const tmpPath = `${BASE_PATH}/images/nft-base.png`;
    const png = readPng(tmpPath);
    if (!png) throw new Error("fail to read png file");

    // await loadLayerImg(png);
    const loadedImage = (await loadLayerImg(png)) as Buffer;
    drawElement(loadedImage);
    drawText("this is address");

    // const publicId = await cloudinary.uploadImageFile(png);
    const cdBuffer = await cloudinary.uploadBuffer(getCanvasPng());
    // const publicId = await cloudinary.uploadImagePath(tmpPath);
    console.log(cdBuffer);
    res.status(200).json(cdBuffer);
    clearCanvas();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
