import { Request, Response } from "express";
import { fetchWallet } from "../api/common";
import { IMetadata } from "../interfaces/metadata";
import { db } from "../model";
import { cloudinary } from "../utils/cloudinary";
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
    // const public_id = "s3jeaktszkwy4fpcemcu";
    const metadataTokenId = Number(req.params?.id);

    // https://crowd-starter.herokuapp.com/api-v1/1/info.json
    if (!metadataTokenId) throw new Error("id is not provided");
    const imgDoc = await db.NftImage.query.findImageByTokenId(metadataTokenId);
    if (!imgDoc) throw new Error("imgDoc is not provided");

    // send external image
    res.redirect(imgDoc.secure_url);
    // res.status(200).sendFile(`<img src="${imgUrl}" />`);
  } catch (error: any) {
    const message = error.message || "internal error";
    console.log(message);
    res.status(500).send(message);
  }
};

export const uploadMetadata = async (req: Request, res: Response) => {
  try {
    const {
      tokenName,
      description,
      attributes,
      influencerName,
      walletAddress,
      tokenSupply,
      imageId,
    } = req.body;
    if (
      !tokenName ||
      !description ||
      !attributes ||
      !influencerName ||
      !walletAddress ||
      !imageId
    )
      throw new Error("Missing required fields");

    const lastMetadata = await db.Metadata.query.findLastMetadata();
    let metadata_id = 0;

    lastMetadata ? (metadata_id = lastMetadata.id + 1) : (metadata_id = 1);
    // 엔드포인트만조금 있다가 바꿔주기
    const image = `http://localhost:8080/api-v1/${metadata_id}/image.png`;
    const metadata: IMetadata = {
      id: metadata_id,
      walletAddress,
      tokenSupply,
      imageId,
      creator: influencerName,
      metadata: {
        name: tokenName,
        description,
        image,
        attributes,
      },
    };

    // save to db
    const doc = await db.Metadata.mutation.createMetadata(metadata);
    // console.log(doc);
    // 여기서 이미지 메타데이터 아이디 업데이트 해줘야함
    if (!doc || !doc._id) throw new Error("Failed to save metadata to db");
    // update metadata object id and token id
    await db.NftImage.mutation.updateMetadataId(imageId, doc._id, metadata_id);
    // console.log(imageDoc);

    res.status(200).send({ message: "success to upload metadata", data: doc });
    // console.log(metadata);

    // await fetchWallet(walletAddress);
  } catch (error: any) {
    const message = error.message || "internal error";
    res.status(500).send({ message });
  }
};
