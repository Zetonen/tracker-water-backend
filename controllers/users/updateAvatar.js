import fs from "fs/promises";
import { HttpError, paramsAvatar, cloudinary } from "../../helpers/index.js";
import User from "../../model/User.js";

const updateAvatar = async (req, res, next) => {
  const { _id: id } = req.user;
  if (req.file === undefined) {
    throw HttpError(404, "Image not found");
  }
  const { path: oldPath } = req.file;
  await paramsAvatar(oldPath);
  const { url: avatarURL } = await cloudinary.uploader.upload(req.file.path, {
    folder: "waterTracker-avatars",
  });
  await fs.unlink(req.file.path);
  await User.findByIdAndUpdate(id, { avatarURL });
  res.json({
    avatarURL,
  });
};

export default updateAvatar;
