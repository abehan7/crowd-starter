import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MONGO_URL } from "../utils/db";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT: number = (process.env.PORT as unknown as number) || 5000;

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api-v1/:id/info.json", async (req, res) => {
  try {
    const id = req.params.id;
    // send jsonfile
    // const jsonFile = await fs.readFileSync(
    //   ROOT + `/metadata/metadata-item${id}.json`,
    //   "utf8"
    // );
    // const jsonData = await JSON.parse(jsonFile);
    // res.json(jsonData);
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`[rest-api]: Bot rest-api is running at PORT ${PORT}`)
    )
  )
  .catch((error: any) => console.log(`${error} did not connect`));
