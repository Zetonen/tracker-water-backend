import bcrypt from "bcryptjs";
import User from "../../model/User.js";
import HttpError from "../../helpers/HttpError.js";

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!user || !comparedPassword) {
    throw HttpError(401, "Email or password invalid!");
  }
  res.json({ message: "Success!" });
};

export default signin;
