import User from "../../model/User.js";

const changeDailyNorma = async (req, res) => {
  const { dailyNorma } = req.body;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { dailyNorma },
    {
      new: true,
      runValidators: true,
    }
  );

  res.json({
    dailyNorma: result.dailyNorma,
  });
};

export default changeDailyNorma;
