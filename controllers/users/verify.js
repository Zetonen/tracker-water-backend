import User from "../../model/User.js";
import { HttpError } from "../../helpers/index.js";

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(401, "Email not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
  });

  res.json({
    message: "Email verify success",
  });
};

export default verify;
