import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { INftImage } from "../interfaces/nftImage";
import { db } from "../model";
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
    res.send(path);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    // const { wallet } = req.body;
    const wallet = req.decodedData;
    // const metadataLastId = await db.Metadata.query.getMetadataLastId();
    if (!wallet) throw new Error("Missing wallet");

    const tmpPath = `${BASE_PATH}/images/nft-base.png`;
    const png = readPng(tmpPath);
    if (!png) throw new Error("fail to read png file");

    // await loadLayerImg(png);
    const loadedImage = (await loadLayerImg(png)) as Buffer;
    drawElement(loadedImage);
    drawText(wallet);

    // const publicId = await cloudinary.uploadImageFile(png);
    const cdResponse = await cloudinary.uploadBuffer(getCanvasPng());
    if (!cdResponse) throw new Error("fail to upload buffer to cloudinary");
    // const publicId = await cloudinary.uploadImagePath(tmpPath);
    const newDoc: INftImage = {
      asset_id: cdResponse.asset_id,
      public_id: cdResponse.public_id,
      secure_url: cdResponse.secure_url,
    };
    // metadata_id: metadataId,
    const nftImgDocRes = await db.NftImage.mutation.createImage(newDoc);
    if (!nftImgDocRes._id) throw new Error("fail to save image to db");
    console.log(nftImgDocRes);

    clearCanvas();

    res
      .status(200)
      .json({ message: "success to upload image", data: nftImgDocRes });

    // ?????? smart contract??? ???????????????

    // ?????? ????????? url??? ??????????????? ????????????
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
