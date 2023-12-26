import { HttpError } from "../../helpers/index.js";
import User from "../../model/User.js";

const updateWaterRate = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findOneAndUpdate(_id, req.body);
  if (!result) {
    throw HttpError(404, `User with id=${id} not found`);
  }
  res.json(result);
};

export default updateWaterRate;
