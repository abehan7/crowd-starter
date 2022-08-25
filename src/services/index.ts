import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MONGO_URL } from "../utils/db";
import mongoose from "mongoose";
import metadataRouter from "../routes/metadata";
import imageRouter from "../routes/image";

dotenv.config();

const app = express();
const PORT: number = (process.env.PORT as unknown as number) || 8080;

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api-v1", metadataRouter);
app.use("/api-v1/json", metadataRouter);
app.use("/api-v1/image", imageRouter);
// app.use("/user", userRouter);

mongoose
  .connect(MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`[rest-api]: Bot rest-api is running at PORT ${PORT}`)
    )
  )
  .catch((error: any) => console.log(`${error} did not connect`));
