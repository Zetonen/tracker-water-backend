import {
  dateFormat,
  aggregateWaterData,
  calculatePercentageWaterConsumed,
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

  const originalDate = new Date();
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth();
  const dayOfMonth = originalDate.getDate();

  const result = await aggregateWaterData(owner, year, month, dayOfMonth);
  const totalAmountWater = result[0]?.totalWater?.[0]?.totalAmountWater || 0;
  const percentageWaterConsumed =
    totalAmountWater !== undefined
      ? calculatePercentageWaterConsumed(totalAmountWater, dailyNorma)
      : "N/A";
  const dayPercent = {
    percentageWaterConsumed,
  };

  res.json({ updateWater, dayPercent });
};
export default updateWaterById;
