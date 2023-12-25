const getInfo = async (req, res) => {
  const { username, email, gender, dailyNorma, avatarURL } = req.user;
  res.json({ username, email, gender, dailyNorma, avatarURL });
};

export default getInfo;
