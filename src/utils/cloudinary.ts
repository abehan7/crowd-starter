import _cloudinary from "cloudinary";
import config from "../config";

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

const uploadImageFile = async (file: Buffer) => {
  try {
    const data = cd.uploader
      .upload_stream({ format: "png" }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Upload succeed: ${res}`);
          // filteredBody.photo = result.url;
        }
      })
      .end(file);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const cloudinary = {
  uploadImagePath,
  uploadImageFile,
};

export default cd;
