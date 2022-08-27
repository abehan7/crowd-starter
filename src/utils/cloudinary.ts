import _cloudinary from "cloudinary";
import config from "../config/config";
// const { Readable } = require("stream");
import { Readable } from "stream";
import { ICdImage } from "../interfaces/cloudinary";

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = config;

const cd = _cloudinary.v2;

cd.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadImagePath = async (file: string): Promise<ICdImage | null> => {
  try {
    const result = await cd.uploader.upload(file);
    // const result = await cd.uploader.upload(file.path);
    console.log(result);
    return result as unknown as ICdImage;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const uploadBuffer = async (buffer: Buffer): Promise<ICdImage | undefined> => {
  return new Promise((resolve, reject) => {
    const writeStream = cd.uploader.upload_stream((err, result: ICdImage) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
    const readStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    readStream.pipe(writeStream);
  });
};

const getAssetInfo = async (
  publicId: string
): Promise<ICdImage | undefined> => {
  // Return colors in the response
  const options = { colors: true };

  try {
    // Get details about the asset
    const result = (await cd.api.resource(publicId, options)) as ICdImage;
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// uploadImageFile,
export const cloudinary = {
  uploadImagePath,
  uploadBuffer,
  getAssetInfo,
  cd,
};
// createImageTag,

export default cd;
