import mongoose from 'mongoose';
import WaterTrack from '../../model/WaterTracker.js';
import { waterBalance } from '../../helpers/index.js';
import { getMonth, getYear, format } from 'date-fns';

const getWaterInfoForMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;
  const year = getYear(new Date(date));
  const month = getMonth(new Date(date));
  const monthString = format(new Date(date), 'MMMM');
  const dailyNorma = await waterBalance(owner);
  const dailyNormaString = `${dailyNorma}L`;

  const result = await WaterTrack.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(owner),
        $expr: {
          $and: [
            { $eq: [{ $year: { $toDate: '$date' } }, year] },
            { $eq: [{ $month: { $toDate: '$date' } }, month + 1] },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          day: { $dayOfMonth: { $toDate: '$date' } },
        },
        totalAmountWater: { $sum: '$amountWater' },
        quantityWaterTrack: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalAmountWater: 1,
        dailyNorma: dailyNormaString,
        quantityWaterTrack: 1,
        percentageWaterConsumed: {
          $concat: [
            {
              $toString: {
                $concat: [
                  {
                    $toString: {
                      $round: {
                        $divide: [
                          { $divide: ['$totalAmountWater', 10] },
                          dailyNorma,
                        ],
                      },
                    },
                  },
                  '%',
                ],
              },
            },
          ],
        },
        date: {
          $concat: [
            { $toString: '$_id.day' },
            ', ',
            { $toString: monthString },
          ],
        },
      },
    },
  ]);

  res.status(200).json(result);
};

export default getWaterInfoForMonth;
