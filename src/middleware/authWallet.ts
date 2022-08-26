import { Request, Response, NextFunction } from "express";

export const authWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// export const verifyWallet = async (req: Request, res: Response) => {
//     const { account, signiture, message } = req.body;
//     if (!account || !signiture || !message)
//       res
//         .status(400)
//         .send({ status: false, message: "❌ Missing parameters", data: null });
//     const decodedWallet = await web3.eth.accounts.recover(message, signiture);
//     if (decodedWallet !== account)
//       res
//         .status(400)
//         .send({ status: false, message: "❌ different accounts", data: null });
//     const isAddress = await ethers.utils.isAddress(decodedWallet);
//     if (!isAddress)
//       throw res
//         .status(500)
//         .send({ status: false, message: "❌ Invalid wallet", data: null });

//     res.status(200).send({
//       status: true,
//       message: "wallet verified ✅",
//       data: {
//         wallet: decodedWallet,
//       },
//     });

//     console.log(decodedWallet);
//   };
