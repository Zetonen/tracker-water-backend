import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const updatePassword = async (req, res) => {
  const { verificationCode } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ verificationCode });
  if (!user || !user.verify) {
    throw HttpError(401, "User not found");
  }
  const { _id, username, email, gender, dailyNorma, avatarURL } = user;
  const payload = {
    id: _id,
  };
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(_id, {
    token,
    password: hashedPassword,
    verificationCode: "",
  });

  res.json({
    token,
    user: {
      email,
      username,
      gender,
      dailyNorma,
      avatarURL,
    },
  });
};

export default updatePassword;
