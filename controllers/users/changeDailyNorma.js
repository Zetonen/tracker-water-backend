import User from "../../model/User.js";
import WaterTrack from "../../model/WaterTracker.js";

const changeDailyNorma = async (req, res) => {
  const { dailyNorma } = req.body;
  const { _id } = req.user;
  const owner = _id;
  const todayDate = new Date().toISOString().split("T")[0];
  const waterTracks = await WaterTrack.find({ owner });
  const todayWaterTracks = waterTracks.filter(
    item => item.date.split("T")[0] === todayDate
  );
  const todayWaterAmount =
    todayWaterTracks.reduce((acc, item) => item.amountWater + acc, 0) / 1000;
  const percentageWaterConsumed = (
    (todayWaterAmount / dailyNorma) *
    100
  ).toFixed(2);
  const result = await User.findByIdAndUpdate(
    _id,
    { dailyNorma },
    {
      new: true,
      runValidators: true,
    }
  );

  res.json({
    user: {
      dailyNorma: result.dailyNorma,
    },
    today: {
      percentageWaterConsumed: `${percentageWaterConsumed}%`,
    },
  });
};

export default changeDailyNorma;
