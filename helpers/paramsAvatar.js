import Jimp from "jimp";

const paramsAvatar = async (path) => {
  if (path === undefined) return;
  const image = await Jimp.read(path);
  return await image.resize(80, 80).writeAsync(path);
};

export default paramsAvatar;
