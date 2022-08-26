import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { imageHtml } from "../html/image";
import { db } from "../model";
import {
  drawElement,
  getCanvasPng,
  loadLayerImg,
  saveCanvasPng,
} from "../utils/canvas";
import { cloudinary } from "../utils/cloudinary";
import { readPng } from "../utils/common";
// https://crowd-starter.herokuapp.com/api-v1/1
const tmp = {
  name: "token name",
  description:
    "HI PLANET NFT is a bridge of web2 and web3 in fahsion business. Our main goal is to generate passive income for holders. HI PLANET NFT is a collection of 3,333 hand drawn NFTs by design studio of HIgh Minded Intelligence. Hi Planet holders will get exclusive benefits through Hi Planet and High Minded Intelligence.\nVisit https://www.hiplanetnft.com/ to learn more.",
  image: "https://crowd-starter.herokuapp.com/api-v1/1/image.png",
  dna: "b0aee1d63fa48062a86e3e06a8672a75d7917aa8",
  edition: 1,
  date: 1658824380681,
  attributes: [
    {
      trait_type: "Unknown",
      value: "Unknown",
    },
  ],
};

export const getMetadata = async (req: Request, res: Response) => {
  const id = req.params?.id;
  try {
    if (!id) throw new Error("id is not provided");
    const metadata = await db.Metadata.query.findMetadata(Number(id));
    if (metadata) {
      return res.status(200).json(metadata.metadata);
    } else {
      // const tmpJson = {};
      return res.status(404).json(tmp);
      // return res.status(404).json({ message: "Metadata not found" });
    }
  } catch (error: any) {
    const message = error.message || "internal error";
    res.status(500).json({ message });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const public_id = "s3jeaktszkwy4fpcemcu";
    const tmp_public_id = req.params?.id;
    // https://crowd-starter.herokuapp.com/api-v1/1/info.json
    if (!public_id) throw new Error("id is not provided");

    // console.log(public_id);
    const resource = (await cloudinary.getAssetInfo(public_id)) as any;
    if (!resource) throw new Error("resource is not found in cloudinary");
    // console.log(resource);
    // const img = cloudinary.createImageTag(public_id, resource);
    // console.log(img);
    // const img = cloudinary.cd.image(public_id, { width: 400, crop: "pad" });
    // redirect to cloudinary
    const loadedImage = (await loadLayerImg(resource.secure_url)) as Buffer;
    drawElement(loadedImage);
    // const img = getCanvasPng();
    const tmpImg = readPng(`${BASE_PATH}/images/nft-base.png`);
    // saveCanvasPng(`${BASE_PATH}/images/__test__.png`);
    // res.redirect(resource.secure_url);
    // console.log(resource.secure_url);
    const img = `<img src="${resource.secure_url}" />`;

    // const data = {
    //   image: resource.secure_url,
    // };

    // console.log(img);
    // res.send();
    const contentType = "image/png";
    // res.writeHead(200, {
    //   "Content-Type": contentType,
    // });
    const path = `${BASE_PATH}/images/__test__.png`;
    res.sendFile(path);
    // res.status(200).send(imageHtml(resource.secure_url));

    // res.send(img);
  } catch (error: any) {
    const message = error.message || "internal error";
    console.log(message);
    res.status(500).send(message);
  }
};

export const uploadJson = (req: Request, res: Response) => {};
