import { HttpError } from "../../helpers/index.js";
import WaterTrack from "../../model/WaterTracker.js";

const deleteWaterById = async (req, res) => {
  const { waterId } = req.params;
  const { _id: owner } = req.user;

  const result = await WaterTrack.findByIdAndDelete({ _id: waterId, owner });
  if (!result) {
    throw HttpError(404, `Water track with id = ${waterId} is found`);
  }
  res.json({ message: "Water track deleted" });
};

export default deleteWaterById;
