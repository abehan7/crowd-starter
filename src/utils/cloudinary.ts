import _cloudinary from "cloudinary";
import config from "../config";
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

const uploadImagePath = async (file: string) => {
  try {
    const result = await cd.uploader.upload(file);
    // const result = await cd.uploader.upload(file.path);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const uploadBuffer = async (
  buffer: Buffer
): Promise<_cloudinary.UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    const writeStream = cd.uploader.upload_stream((err, result) => {
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
): Promise<_cloudinary.ResponseCallback | undefined> => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await cd.api.resource(publicId, options);
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const createImageTag = (publicId: string, colors: any[]) => {
  // Set the effect color and background color
  // console.log(colors);
  // const [[effectColor, backgroundColor]] = colors;
  // console.log(effectColor, backgroundColor);

  // Create an image tag with transformations applied to the src URL
  let imageTag = cd.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: "#ADD8E6" },
      { background: "99.1" },
    ],
  });

  return imageTag;
};

// uploadImageFile,
export const cloudinary = {
  uploadImagePath,
  uploadBuffer,
  getAssetInfo,
  createImageTag,
  cd,
};

export default cd;
