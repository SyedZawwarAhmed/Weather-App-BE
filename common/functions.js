const getHourDivisibleByThree = (date) => {
  const hours = date.getHours();
  const remainder = hours % 3;
  const currentHour =
    remainder === 0 ? hours : remainder === 1 ? hours - 1 : hours + 1;
  return currentHour;
};

module.exports = getHourDivisibleByThree;
