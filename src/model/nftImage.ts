import mongoose from "mongoose";
import { INftImage } from "../interfaces/nftImage";

// url 넣기
const ImageSchema = new mongoose.Schema({
  metadata_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Metadatas",
    required: false,
  },
  metadata_token_id: { type: Number, required: false },
  asset_id: { type: String, required: true },
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
});

const NftImage = mongoose.model<mongoose.Document>("NftImages", ImageSchema);

const query = {
  findImageByTokenId: async (
    metadata_token_id: number
  ): Promise<INftImage | null> => {
    try {
      const image = (await NftImage.findOne({
        metadata_token_id,
      })) as INftImage | null;
      return image;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

const mutation = {
  createImage: async (image: INftImage): Promise<INftImage> => {
    try {
      const doc = new NftImage(image);
      const newImage = await doc.save();
      return newImage.toObject() as INftImage;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  updateMetadataId: async (
    imageId: string,
    metadata_id: string,
    metadata_token_id: number
  ) => {
    const query = { _id: imageId };
    // update 2 fields
    const update = { metadata_id, metadata_token_id };
    const options = { new: true };

    try {
      const doc = await NftImage.findOneAndUpdate(query, update, options);
      return doc;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

// autoIncrement.initialize(connection);

export default { model: NftImage, mutation, query };
