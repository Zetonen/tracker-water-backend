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
    html: `<p>Hello,</p>
    <p>We received a request to change your password. Click the link below to set a new password:</p>
    <p><a target="_blank" href="https://ohwellnevermind.github.io/water-tracker/update-password/${verificationCode}">Change password!</a></p>
    <p>If you did not make this request, you can ignore this email.</p>
    <p>Best regards,<br>IdeaSoft</p>
    <img src="https://res.cloudinary.com/dkftturzq/image/upload/v1704909023/Frame_81_p1q4ny.png" alt="Security Image" width="50" style="display:block; margin: 10px 0;">`,
  };

  await sendEmail(emailForgotPassword);

  res.json({ message: `A letter has been sent to your email: ${email}` });
};

export default forgotPassword;
