import { Request, Response } from "express";
import { web3Utils } from "../utils/web3-interact";
export const createERC1155 = async (req: Request, res: Response) => {
  try {
    const wallet = req.decodedData;
    if (!wallet) throw new Error("wallet is not provided");
    const { url, quantity, influencer, signer } = req.body;
    if (!url || !quantity || !influencer || !signer)
      throw new Error("Missing required fields");
    const params = { url, quantity, influencer, wallet, signer };
    const tx = await web3Utils.createERC1155(params);
    res.status(200).send({ message: "success", data: tx });
  } catch (error: any) {
    const message = error.message || "internal error";
    console.log(message);
    res.status(500).send({ message, data: error });
  }
};
