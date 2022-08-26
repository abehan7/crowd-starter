import fs from "fs";
import { createCanvas, loadImage } from "canvas";
const basePath = process.cwd();
// const buildDir = `${basePath}/test-images`;
const format = {
  width: 512,
  height: 512,
  smoothing: false,
};
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;

export const loadLayerImg = async (imgLink: string | Buffer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(imgLink);
      resolve(image);
    });
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

export const drawElement = (_loadedImage: Buffer) => {
  //_layersLen 이거 결국 안씀
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  // false
  ctx.drawImage(_loadedImage, 0, 0, format.width, format.height);
};

// export const saveImage = (_editionCount: number | string) => {
//   fs.writeFileSync(
//     `${buildDir}/images/${_editionCount}.png`,
//     canvas.toBuffer("image/png") // 지금까지 ctx에 쌓아서 저장한거를 이미지로 만드는 작업
//   );
// };

// const buildSetup = () => {
//   if (fs.existsSync(buildDir)) {
//     fs.rmdirSync(buildDir, { recursive: true });
//   }
//   fs.mkdirSync(buildDir);

//   fs.mkdirSync(`${buildDir}/json`);
//   fs.mkdirSync(`${buildDir}/images`);
// };
