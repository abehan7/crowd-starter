import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { IMetadata } from "../interfaces/metadata";
// import { imageHtml } from "../html/image";
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
// const tmp = {
//   name: "token name changed -v3",
//   description:
//     "HI PLANET NFT is a bridge of web2 and web3 in fahsion business. Our main goal is to generate passive income for holders. HI PLANET NFT is a collection of 3,333 hand drawn NFTs by design studio of HIgh Minded Intelligence. Hi Planet holders will get exclusive benefits through Hi Planet and High Minded Intelligence.\nVisit https://www.hiplanetnft.com/ to learn more.",
//   image: "https://crowd-starter.herokuapp.com/api-v1/1/image.png",
//   dna: "b0aee1d63fa48062a86e3e06a8672a75d7917aa8",
//   edition: 1,
//   date: 1658824380681,
//   attributes: [
//     {
//       trait_type: "influencer",
//       value: "tyl",
//     },
//   ],
// };

export const getMetadata = async (req: Request, res: Response) => {
  const id = req.params?.id;
  try {
    if (!id) throw new Error("id is not provided");
    const metadata = await db.Metadata.query.findMetadata(Number(id));
    if (metadata) {
      return res.status(200).json(metadata.metadata);
    } else {
      // const tmpJson = {};
      // return res.status(200).json(tmp);
      return res.status(404).json({ message: "Metadata not found" });
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

    // send external image
    res.redirect(resource.secure_url);
    // res.status(200).sendFile(`<img src="${imgUrl}" />`);
  } catch (error: any) {
    const message = error.message || "internal error";
    console.log(message);
    res.status(500).send(message);
  }
};

export const uploadMetadata = (req: Request, res: Response) => {
  try {
    const {
      tokenName,
      description,
      image,
      attributes,
      influencerName,
      walletAddress,
      tokenSupply,
    } = req.body;
    if (
      !tokenName ||
      !description ||
      !image ||
      !attributes ||
      !influencerName ||
      !walletAddress
    )
      throw new Error("Missing required fields");
    const metadata: IMetadata = {
      walletAddress,
      tokenSupply,
      creator: influencerName,
      metadata: {
        name: tokenName,
        description,
        image,
        attributes,
      },
    };
    console.log(metadata);
    res.status(200).json(metadata);
  } catch (error: any) {
    const message = error.message || "internal error";
    res.status(500).json({ message });
  }
};
