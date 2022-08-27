import { Request, Response, NextFunction } from "express";
import ethers from "ethers";
import { web3Utils } from "../utils/web3Interact";

export const authWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, signature } = req.body;
    if (!message || !signature) throw new Error("Missing required fields");
    const decodedWallet = await web3Utils.decodeWallet(message, signature);
    if (!decodedWallet) throw new Error("Invalid wallet");
    req.body.walletAddress = decodedWallet;
    next();
  } catch (error: any) {
    const message = error.message || "internal error";
    res.status(500).json({ message });
  }
};

export const verifyWallet = async (req: Request, res: Response) => {
  const { account, signiture, message } = req.body;
  if (!account || !signiture || !message)
    res
      .status(400)
      .send({ status: false, message: "❌ Missing parameters", data: null });
  const decodedWallet = await web3Utils.decodeWallet(message, signiture);
  if (decodedWallet !== account)
    res
      .status(400)
      .send({ status: false, message: "❌ different accounts", data: null });
  const isAddress = ethers.utils.isAddress(decodedWallet);
  if (!isAddress)
    throw res
      .status(500)
      .send({ status: false, message: "❌ Invalid wallet", data: null });

  res.status(200).send({
    status: true,
    message: "wallet verified ✅",
    data: {
      wallet: decodedWallet,
    },
  });

  console.log(decodedWallet);
};
