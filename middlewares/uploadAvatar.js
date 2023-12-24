import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const uploadAvatar = multer({
  storage,
  limits,
});
export default uploadAvatar;
