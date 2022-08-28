import dotenv from "dotenv";
dotenv.config();
const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CLUSTER,
  ALCHEMY_RPC_URL,
  CLOUDINARY_URL,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  ENDPOINT_URL,
} = process.env;

if (
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_NAME ||
  !DB_CLUSTER ||
  !ALCHEMY_RPC_URL ||
  !CLOUDINARY_URL ||
  !CLOUDINARY_NAME ||
  !CLOUDINARY_API_KEY ||
  !CLOUDINARY_API_SECRET ||
  !ENDPOINT_URL
) {
  throw new Error("Missing environment variables");
}

interface IConfig {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_CLUSTER: string;
  ALCHEMY_RPC_URL: string;
  CLOUDINARY_URL: string;
  CLOUDINARY_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  ENDPOINT_URL: string;
}

const config: IConfig = {
  DB_USER,
  DB_PASSWORD,
  DB_CLUSTER,
  DB_NAME,
  ALCHEMY_RPC_URL,
  CLOUDINARY_URL,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  ENDPOINT_URL,
};

export default config;
