import mongoose from "mongoose";
import WaterTrack from "../model/WaterTracker.js";

const aggregateWaterData = async (owner, date, dailyNorma) => {
  const calculatePercentageWaterConsumed = (totalAmountWater, dailyNorma) => {
    const percentage = Math.round(totalAmountWater / (dailyNorma * 10));
    return `${percentage}%`;
  };

  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth();
  const dayOfMonth = originalDate.getDate();

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
    percentageWaterConsumed,
  };

  return response;
};

export default aggregateWaterData;
