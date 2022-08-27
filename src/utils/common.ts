import fs from "fs";

export const readJson = (path: string) => {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (error) {
    console.log("fail to read json file");
    console.log(error);

    return {};
  }
};

export const writeJson = (path: string, modifiedJson: object) => {
  try {
    const json = JSON.stringify(modifiedJson);
    fs.writeFile(path, json, "utf8", (e) => e);
    return true;
  } catch (error) {
    console.log("fail to write json file");
    console.log(error);
    return false;
  }
};

export const writePng = (path: string, img: string) => {
  try {
    // .toBuffer("image/png")
    fs.writeFileSync(path, img);
    return true;
  } catch (error) {
    console.log("fail to write png file");
    console.log(error);
    return false;
  }
};

export const readPng = (path: string): Buffer | null => {
  try {
    return fs.readFileSync(path);
  } catch (error) {
    console.log("fail to read png file");
    console.log(error);
    return null;
  }
};

export const cutWallet = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
