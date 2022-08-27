import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers } from "ethers";
import config from "../config/config";
import { WEB3_CONFIG } from "../config/web3Config";

interface CreateERC1155Props {
  url: string;
  quantity: number;
  influencer: string;
  wallet: string;
  signer: string;
}

const web3 = createAlchemyWeb3(config.ALCHEMY_RPC_URL);
const nftContract = new web3.eth.Contract(WEB3_CONFIG.abi, WEB3_CONFIG.address);

const decodeWallet = async (message: string, signiture: string) => {
  const decodedWallet = web3.eth.accounts.recover(message, signiture);
  return decodedWallet;
};

const createERC1155 = async (props: CreateERC1155Props) => {
  try {
    const { url, quantity, influencer, signer, wallet } = props;

    const nonce = await web3.eth.getTransactionCount(wallet, "latest");

    const tx = {
      to: WEB3_CONFIG.address,
      from: wallet,
      data: nftContract.methods
        .createToken(url, quantity, influencer)
        .encodeABI(),
      nonce: nonce,
    };
    // nonce: nonce.toString(16),

    // ethers.
    // FIXME: 여기서 일단 에러 생길건 100%
    // 여기서 어떻게 window request처리할지
    const signedTx = await web3.eth.accounts.signTransaction(tx, signer);
    // const txHash = await web3.eth.sendTransaction(tx);
    console.log(signedTx);
    return signedTx;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

export const web3Utils = {
  web3,
  nftContract,
  decodeWallet,
  createERC1155,
};
