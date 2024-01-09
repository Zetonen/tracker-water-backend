import { HttpError, aggregateWaterData } from "../../helpers/index.js";
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

  const result = await aggregateWaterData(owner, date, dailyNorma);

  const response = {
    message: "Water track deleted",
    today: result,
  };

  res.json(response);
};

export default deleteWaterById;
