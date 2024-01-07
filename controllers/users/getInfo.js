import { transformCreateAt } from "../../helpers/index.js";

const getInfo = async (req, res) => {
  const { username, email, gender, dailyNorma, avatarURL } = req.user;
  const validCreateAt = transformCreateAt(createdAt);

  res.json({
    username,
    email,
    gender,
    dailyNorma,
    avatarURL,
    createdAt: validCreateAt,
  });
};

export default getInfo;
