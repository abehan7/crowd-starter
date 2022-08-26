import express, { Request, Response } from "express";
import { BASE_PATH } from "../constants/common";
import { db } from "../model";
import { cloudinary } from "../utils/cloudinary";
import { readPng } from "../utils/common";

export const getMetadata = async (req: Request, res: Response) => {
  const id = req.params?.id;
  try {
    if (!id) throw new Error("id is not provided");
    const metadata = await db.Metadata.query.findMetadata(Number(id));
    if (metadata) {
      return res.status(200).json(metadata.metadata);
    } else {
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

    if (!public_id) throw new Error("id is not provided");

    // console.log(public_id);
    const resource = (await cloudinary.getAssetInfo(public_id)) as any;
    if (!resource) throw new Error("resource is not found in cloudinary");
    // console.log(resource);
    // const img = cloudinary.createImageTag(public_id, resource);
    // console.log(img);
    const img = cloudinary.cd.image(public_id, { width: 400, crop: "pad" });
    // const img = `<img src="${resource.secure_url}" />`;

    // console.log(img);
    res.send(img);
  } catch (error: any) {
    const message = error.message || "internal error";
    console.log(message);
    res.status(500).send(message);
  }
};

export const uploadJson = (req: Request, res: Response) => {};
