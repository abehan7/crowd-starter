import axios from "axios";

const api = axios.create({ baseURL: process.env.API_BASE_URL });

export const fetchWallet = async (wallet: string) => {
  axios.post(`/api-v1/image`, { wallet });
};
