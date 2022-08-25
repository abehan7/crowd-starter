import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
  description: { type: String, required: true },
  external_url: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  attributes: { type: [{ trait_type: String, value: String }], required: true },
});

const Metadata = mongoose.model<mongoose.Document>("metadatas", metadataSchema);

export default Metadata;
