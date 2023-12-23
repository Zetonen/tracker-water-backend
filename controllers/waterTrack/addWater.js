import { dateFormat } from "../../helpers/index.js";
import WaterTrack from "../../model/WaterTracker.js";

const addWater = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, amountWater } = req.body;
  const dateParse = dateFormat(date);
  const result = await WaterTrack.create({
    date: dateParse,
    owner,
    amountWater,
  });
  res.status(201).json(result);
};
export default addWater;
