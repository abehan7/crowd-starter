import mongoose from "mongoose";
import { INftImage } from "../interfaces/nftImage";

// url 넣기
const ImageSchema = new mongoose.Schema({
  metadataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Metadatas",
    required: false,
  },
  asset_id: { type: String, required: true },
  public_id: { type: String, required: true },
  secure_url: { type: String, required: true },
});

const NftImage = mongoose.model<mongoose.Document>("NftImages", ImageSchema);

const query = {
  findImage: async (id: number): Promise<INftImage | null> => {
    try {
      const image = (await NftImage.findOne({ id })) as INftImage | null;
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
};

// autoIncrement.initialize(connection);

export default { model: NftImage, mutation, query };
