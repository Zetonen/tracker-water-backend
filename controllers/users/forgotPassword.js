import { sendEmail } from "../../helpers/index.js";
import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const emailForgotPassword = {
    to: email,
    subject: "Forgot password!",
    html: `<a target="_blank" href="">Change password!</a>`,
  };
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "User not found");
  }

  await sendEmail(emailForgotPassword);

  res.json({ message: `A letter has been sent to your email: ${email}` });
};

export default forgotPassword;
