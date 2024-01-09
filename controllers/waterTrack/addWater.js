import { dateFormat, aggregateWaterData } from "../../helpers/index.js";
import WaterTrack from "../../model/WaterTracker.js";

const addWater = async (req, res) => {
  const { _id: owner, dailyNorma } = req.user;
  const { date, amountWater } = req.body;
  const dateParse = dateFormat(date);

  const addedWaterPortion = await WaterTrack.create({
    date: dateParse,
    owner,
    amountWater,
  });

  const result = await aggregateWaterData(owner, date, dailyNorma);

  res.json({ addedWaterPortion, result });
};

export default addWater;
