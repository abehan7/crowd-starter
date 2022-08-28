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
    if (!url || !quantity || !influencer || !signer || !wallet)
      throw new Error("Missing required fields");
    const owner = "0x45E3Ca56946e0ee4bf36e893CC4fbb96A1523212";

    const nonce = await web3.eth.getTransactionCount(wallet, "latest");
    const ownerSigner =
      "b4ae857b92433f1ab75e63486ecf010c8f42fb032a18063c5a19dbd99b43039e";

    const tx = {
      to: WEB3_CONFIG.address,
      from: owner,
      data: nftContract.methods
        .createToken(url, quantity, influencer, wallet)
        .encodeABI(),
      nonce: nonce,
      gas: 500000,
    };
    // nonce: nonce.toString(16),

    // FIXME: 여기서 일단 에러 생길건 100%
    // 여기서 어떻게 window request처리할지
    const signedTx = await web3.eth.accounts.signTransaction(tx, ownerSigner);
    // send signed transaction to blockchain via Alchemy
    if (!signedTx.rawTransaction)
      throw new Error("rawTransaction is not provided");
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    // const txHash = await window.ethereum.request({
    //   method: "eth_sendTransaction",
    //   params: [signedTx],
    // });

    // const txHash = await web3.eth.sendTransaction(tx);
    console.log(receipt);
    return receipt;
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
