import mongoose from "mongoose";
import { dateFormat } from "../../helpers/index.js";
import WaterTrack from "../../model/WaterTracker.js";

const calculatePercentageWaterConsumed = (totalAmountWater, dailyNorma) => {
  const percentage = Math.round(totalAmountWater / (dailyNorma * 10));
  return `${percentage}%`;
};

const addWater = async (req, res) => {
  const { _id: owner, dailyNorma } = req.user;
  const { date, amountWater } = req.body;
  const dateParse = dateFormat(date);

  const addedWaterPortion = await WaterTrack.create({
    date: dateParse,
    owner,
    amountWater,
  });

  const originalDate = new Date();
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth();
  const dayOfMonth = originalDate.getDate();

  const waterTracks = await WaterTrack.aggregate([
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

  const totalAmountWater =
    waterTracks[0]?.totalWater?.[0]?.totalAmountWater || 0;

  const percentageWaterConsumed =
    totalAmountWater !== undefined
      ? calculatePercentageWaterConsumed(totalAmountWater, dailyNorma)
      : "N/A";

  const dayPercent = {
    percentageWaterConsumed,
  };

  res.json({ addedWaterPortion, dayPercent });
};

export default addWater;
