import { Request, Response, NextFunction } from "express";
import ethers from "ethers";
import { web3Utils } from "../utils/web3-interact";

export const authWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, signature } = req.body;

    if (!message || !signature)
      throw new Error("Missing required fields(wallet auth)");
    const decodedWallet = await web3Utils.decodeWallet(message, signature);
    console.log(decodedWallet);
    if (!decodedWallet) throw new Error("Invalid wallet");
    req.decodedData = decodedWallet;
    next();
  } catch (error: any) {
    const message = error.message || "internal error";
    res.status(500).json({ message });
  }
};

export const verifyWallet = async (req: Request, res: Response) => {
  const { account, signature, message } = req.body;
  if (!account || !signature || !message)
    res
      .status(400)
      .send({ status: false, message: "❌ Missing parameters", data: null });
  const decodedWallet = await web3Utils.decodeWallet(message, signature);
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
