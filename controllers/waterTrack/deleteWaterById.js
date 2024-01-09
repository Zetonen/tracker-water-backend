import { HttpError } from "../../helpers/index.js";
import WaterTrack from "../../model/WaterTracker.js";
import mongoose from "mongoose";

const calculatePercentageWaterConsumed = (totalAmountWater, dailyNorma) => {
  const percentage = Math.round(totalAmountWater / (dailyNorma * 10));
  return `${percentage}%`;
};

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

  const result = await WaterTrack.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(owner),
        $expr: {
          $and: [
            { $eq: [{ $year: { $toDate: "$date" } }, year] },
            { $eq: [{ $month: { $toDate: "$date" } }, month + 1] },
            { $eq: [{ $dayOfMonth: { $toDate: "$date" } }, dayOfMonth] },
          ],
        },
      },
    },
    {
      $facet: {
        totalWater: [
          {
            $group: {
              _id: {
                day: { $dayOfMonth: { $toDate: "$date" } },
              },
              totalAmountWater: { $sum: "$amountWater" },
              quantityWaterTrack: { $sum: 1 },
            },
          },
        ],
        waterTracks: [
          {
            $project: {
              _id: 0,
              id: "$_id",
              amountWater: 1,
              date: "$date",
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

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
