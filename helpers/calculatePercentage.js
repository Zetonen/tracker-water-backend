const calculatePercentageWaterConsumed = (totalAmountWater, dailyNorma) => {
  const percentage = Math.round(totalAmountWater / (dailyNorma * 10));
  return `${percentage}%`;
};

export default calculatePercentageWaterConsumed;
