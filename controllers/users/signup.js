import bcrypt from "bcryptjs";
import User from "../../model/User.js";
import HttpError from "../../helpers/HttpError.js";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
};

export default signup;
