import mongoose from "mongoose";
import WaterTrack from "../model/WaterTracker.js";

const aggregateWaterData = async (owner, year, month, dayOfMonth) => {
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

  return result;
};

export default aggregateWaterData;
