import { sendEmail } from "../../helpers/index.js";
import { nanoid } from "nanoid";
import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";
import "dotenv/config";

const { BASE_URL } = process.env;

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const verificationCode = nanoid();
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verificationCode,
  });
  const emailForgotPassword = {
    to: email,
    subject: "Forgot password!",
    html: `<a target="_blank" href="http://localhost:5173/water-tracker/update-password/${verificationCode}">Change password!</a>`,
  };

  await sendEmail(emailForgotPassword);

  res.json({ message: `A letter has been sent to your email: ${email}` });
};

export default forgotPassword;
