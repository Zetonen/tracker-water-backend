import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../model/User.js";
import { HttpError, transformCreateAt } from "../../helpers/index.js";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid!");
  }
  const { username, gender, dailyNorma, avatarURL, createdAt } = user;
  const validCreateAt = transformCreateAt(createdAt)

  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw HttpError(401, "Email or password invalid!");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      username,
      gender,
      dailyNorma,
      avatarURL,
      createdAt: validCreateAt,
    },
  });
};

export default signin;
