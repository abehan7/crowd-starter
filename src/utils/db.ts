import config from "../config";
const { DB_USER, DB_PASSWORD, DB_NAME, ALCHEMY_RPC_URL } = config;

// mongodb+srv://Abe:<password>@cluster0.cpagnqe.mongodb.net/?retryWrites=true&w=majority
export const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ictdjh9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
