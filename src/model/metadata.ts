import mongoose from "mongoose";
import { IMetadata } from "../interfaces/metadata";

const metadataSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  creator: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  tokenPrice: { type: Number, required: true },
  tokenSupply: { type: Number, required: true },

  metadata: {
    description: { type: String, required: true },
    external_url: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    attributes: {
      type: [{ trait_type: String, value: String }],
      required: true,
    },
  },
});

const Metadata = mongoose.model<mongoose.Document>("metadatas", metadataSchema);

export const query = {
  findMetadata: async (id: number): Promise<IMetadata | null> => {
    try {
      const metadata = (await Metadata.findOne({ id })) as IMetadata | null;
      return metadata;
    } catch (error) {
      throw new Error("findMetadata || error occured while fetching metadata");
    }
  },
};

export const mutation = {};

export default { model: Metadata, query, mutation };
