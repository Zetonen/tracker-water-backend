import {
  dateFormat,
  aggregateWaterData,
  HttpError,
} from "../../helpers/index.js";
import WaterTrack from "../../model/WaterTracker.js";

const updateWaterById = async (req, res) => {
  const { waterId } = req.params;
  const { _id: owner, dailyNorma } = req.user;
  const waterTrack = { ...req.body };

  if (waterTrack.date) {
    waterTrack.date = dateFormat(waterTrack.date);
  }
  const updateWater = await WaterTrack.findOneAndUpdate(
    { _id: waterId, owner },
    waterTrack,
    { new: true }
  );
  if (!updateWater) {
    throw HttpError(404, `Water track with id = ${waterId} is not found`);
  }

  const { date } = updateWater;
  const result = await aggregateWaterData(owner, date, dailyNorma);

  res.json({ updateWater, result });
};

export default updateWaterById;
