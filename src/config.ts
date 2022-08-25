import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_NAME, ALCHEMY_RPC_URL, CLOUDINARY_URL } =
  process.env;

if (
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_NAME ||
  !ALCHEMY_RPC_URL ||
  !CLOUDINARY_URL
) {
  throw new Error("Missing environment variables");
}

interface IConfig {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  ALCHEMY_RPC_URL: string;
  CLOUDINARY_URL: string;
}

const config: IConfig = {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  ALCHEMY_RPC_URL,
  CLOUDINARY_URL,
};

export default config;
