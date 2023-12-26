import User from '../model/User.js';

const waterBalance = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }
  return user.dailyNorma;
};

export default waterBalance;
