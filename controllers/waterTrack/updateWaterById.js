import dateFormat from "../../helpers/dateFormat.js";
import WaterTrack from "../../model/WaterTracker.js";

const updateWaterById = async (req, res) => {
  const { waterId } = req.params;
  const { _id: owner } = req.user;
  const waterTrack = { ...req.body };
  if (waterTrack.date) {
    waterTrack.date = dateFormat(waterTrack.date);
  }
  const result = await WaterTrack.findOneAndUpdate(
    { _id: waterId, owner },
    waterTrack
  );
  if (!result) {
    throw HttpError(404, `Water track with id = ${waterId} is found`);
  }
  res.json(result);
};
export default updateWaterById;
