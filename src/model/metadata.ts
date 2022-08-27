import mongoose from "mongoose";

import { IMetadata } from "../interfaces/metadata";
import { MONGO_URL } from "../utils/db";

// url 넣기
const metadataSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  creator: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  tokenSupply: { type: Number, required: true },
  walletAddress: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: "NftImages" },

  metadata: {
    description: { type: String, required: true },
    external_url: { type: String, required: true },
    image: { type: String, required: true, default: "not uploaded" },
    name: { type: String, required: true },
    attributes: {
      type: [{ trait_type: String, value: String }],
      required: true,
    },
  },
});

const Metadata = mongoose.model<mongoose.Document>("Metadatas", metadataSchema);

const query = {
  findMetadata: async function (id: number): Promise<IMetadata | null> {
    try {
      const metadata = (await Metadata.findOne({ id })) as IMetadata | null;
      return metadata;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  findLastMetadata: async function (): Promise<IMetadata | null> {
    try {
      const metadata = (await Metadata.findOne().sort({
        id: -1,
      })) as IMetadata | null;
      return metadata;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

const mutation = {
  createMetadata: async (metadata: IMetadata): Promise<IMetadata> => {
    try {
      const doc = new Metadata(metadata);
      const newMetadata = await doc.save();
      return newMetadata.toObject() as IMetadata;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  updateMetadataImage: async (
    id: number | string,
    publicId: string
  ): Promise<IMetadata | null> => {
    try {
      const metadata = (await Metadata.findOneAndUpdate(
        { id },
        { $set: { "metadata.image": publicId } },
        { new: true }
      )) as IMetadata | null;
      return metadata;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default { model: Metadata, query, mutation };
