import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import config from "../config/config";
import { WEB3_CONFIG } from "../config/web3Config";

const web3 = createAlchemyWeb3(config.ALCHEMY_RPC_URL);
const nftContract = new web3.eth.Contract(WEB3_CONFIG.abi, WEB3_CONFIG.address);

const decodeWallet = async (message: string, signiture: string) => {
  const decodedWallet = web3.eth.accounts.recover(message, signiture);
  return decodedWallet;
};

export const web3Utils = {
  web3,
  nftContract,
  decodeWallet,
};
