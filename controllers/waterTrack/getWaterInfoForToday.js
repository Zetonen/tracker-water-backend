import mongoose from "mongoose";
import WaterTrack from "../../model/WaterTracker.js";
import { getDate, getMonth, getYear, format } from "date-fns";

const getWaterInfoForToday = async (req, res) => {
  const { _id: owner, dailyNorma } = req.user;
  const { date } = req.body;
  const originalDate = new Date(date);
  const dayOfMonth = getDate(originalDate);
  const year = getYear(new Date(date));
  const month = getMonth(new Date(date));
  const monthString = format(new Date(date), 'MMMM');
  const dailyNormaString = `${dailyNorma}L`;

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
        amountWater: 1,
        date: 1,
        dailyNormaString,
        percentageWaterConsumptionFromDailyNorms: {
          $concat: [
            {
              $toString: {
                $concat: [
                  {
                    $toString: {
                      $round: {
                        $divide: [
                          { $divide: ["$amountWater", 10] },
                          dailyNorma,
                        ],
                      },
                    },
                  },
                  "%",
                ],
              },
            },
          ],
        },
        dateA: {
          $concat: [
            { $toString: dayOfMonth },
            ", ",
            { $toString: monthString },
          ],
        },
       },
      },
      "%",
     ],
    },
    waterTracks: "$waterTracks",
   },
  },
  {
   $project: {
    _id: 0,
   },
  },
 ]);
 res.json(result[0]);
};

export default getWaterInfoForToday;
