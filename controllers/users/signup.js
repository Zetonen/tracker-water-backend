import bcrypt from "bcryptjs";
import path from "path";
import gravatar from "gravatar";
import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";

const defaultAvatarPath = path.resolve("public", "avatar");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist!");
  }
  const avatarURL = `${defaultAvatarPath}/default_avatar.jpg`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
};

export default signup;
