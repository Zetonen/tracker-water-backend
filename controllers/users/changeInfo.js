import User from "../../model/User.js";
import bcrypt from "bcryptjs";
import { HttpError } from "../../helpers/index.js";

const changeInfo = async (req, res) => {
  const { _id } = req.user;
  const { oldPassword, password } = req.body;
  const comparedPassword = await bcrypt.compare(oldPassword, req.user.password);
  if (!comparedPassword) {
    throw HttpError(401, "Password invalid!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedOldPassword = await bcrypt.hash(oldPassword, 10);
  const result = await User.findByIdAndUpdate(
    _id,
    { ...req.body, password: hashedPassword, oldPassword: hashedOldPassword },
    {
      new: true,
      runValidators: true,
    }
  );
  const responseObj = {
    username: result.username,
    email: result.email,
    password: result.password,
    gender: result.gender,
    dailyNorma: result.dailyNorma,
  };
  res.json(responseObj);
};

export default changeInfo;
