import User from "../../model/User.js";
import WaterTrack from "../../model/WaterTracker.js";

const changeDailyNorma = async (req, res) => {
  const { dailyNorma } = req.body;
  const { _id } = req.user;
  const owner = _id;
  const todayDate = new Date().toISOString().split("T")[0];
  const month =
    new Date().getFullYear().toString() +
    "-" +
    (new Date().getMonth() + 1).toString().padStart(2, "0");
  const waterTracks = await WaterTrack.find({ owner });
  const todayWaterTracks = waterTracks.filter(
    item => item.date.split("T")[0] === todayDate
  );
  const monthWaterTracks = waterTracks.filter(
    item => item.date.split("T")[0].slice(0, 7) === month
  );
  const monthWaterTracksFormatted = monthWaterTracks.map(item => {
    return {
      date: formatDate(item.date),
      amountWater: item.amountWater,
      dailyNorma,
    };
  });
  const monthWaterTracksPerDays = monthWaterTracksFormatted
    .reduce((acc, record) => {
      const existingRecord = acc.find(
        item => item.date === formatDate(record.date)
      );

      if (existingRecord) {
        existingRecord.quantityWaterTrack += 1;
        existingRecord.totalAmountWater += record.amountWater;
      } else {
        acc.push({
          date: formatDate(record.date),
          dailyNorma,
          quantityWaterTrack: 1,
          totalAmountWater: record.amountWater,
        });
      }
      return acc;
    }, [])
    .map(record => {
      const percentageWaterConsumed =
        ((record.totalAmountWater / 1000 / record.dailyNorma) * 100).toFixed(
          2
        ) + "%";

      return {
        date: record.date,
        dailyNorma: record.dailyNorma,
        percentageWaterConsumed: percentageWaterConsumed,
        quantityWaterTrack: record.quantityWaterTrack,
      };
    });
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
    month: monthWaterTracksPerDays,
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [day, month] = formattedDate.split(" ");
    return `${day}, ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  }
};

export default changeDailyNorma;
