import bcrypt from "bcryptjs";
import path from "path";
import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";


const signup = async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (user) {
  throw HttpError(409, "Email already exist!");
 }
 const hashedPassword = await bcrypt.hash(password, 10);
 const newUser = await User.create({
  ...req.body,
  password: hashedPassword,
 });
 const { username, gender, dailyNorma, avatarURL } = newUser;

 res.status(201).json({
  user: {
   email,
   username,
   gender,
   dailyNorma,
   avatarURL,
  },
 });
};

export default signup;
