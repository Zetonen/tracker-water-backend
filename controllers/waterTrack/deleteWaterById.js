import {
  HttpError,
  aggregateWaterData,
  calculatePercentageWaterConsumed,
} from "../../helpers/index.js";
import WaterTrack from "../../model/WaterTracker.js";

const deleteWaterById = async (req, res) => {
  const { waterId } = req.params;
  const { _id: owner, dailyNorma } = req.user;

  const deletedWaterTrack = await WaterTrack.findByIdAndDelete({
    _id: waterId,
    owner,
  });

  if (!deletedWaterTrack) {
    throw HttpError(404, `Water track with id = ${waterId} is not found`);
  }

  const { date } = deletedWaterTrack;
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const dayOfMonth = dateObject.getDate();

  const result = await aggregateWaterData(owner, year, month, dayOfMonth);

  const totalAmountWater = result[0]?.totalWater?.[0]?.totalAmountWater || 0;

  const percentageWaterConsumed =
    totalAmountWater !== undefined
      ? calculatePercentageWaterConsumed(totalAmountWater, dailyNorma)
      : "N/A";

  const response = {
    message: "Water track deleted",
    percentageWaterConsumed,
  };

  res.json(response);
};

export default deleteWaterById;
