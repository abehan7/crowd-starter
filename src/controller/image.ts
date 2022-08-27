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
    const { wallet, metadataId } = req.body;
    if (!wallet) throw new Error("Missing required fields");

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
      metadata_id: metadataId,
      secure_url: cdResponse.secure_url,
    };
    const nftImgDocRes = await db.NftImage.mutation.createImage(newDoc);
    if (!nftImgDocRes._id) throw new Error("fail to save image to db");

    const metadataRes = await db.Metadata.mutation.updateMetadataImage(
      metadataId,
      nftImgDocRes._id
    );
    console.log(cdResponse);
    res.status(200).json({ message: "success to upload image" });
    clearCanvas();

    // 이제 smart contract에 업로드하기

    // 그냥 아싸리 url을 넣어버려도 될듯한데
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
