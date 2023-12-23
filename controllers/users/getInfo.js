const getInfo = async (req, res) => {
  const { username, email, gender, dailyNorma } = req.user;
  res.json({ username, email, gender, dailyNorma });
};

export default getInfo;
