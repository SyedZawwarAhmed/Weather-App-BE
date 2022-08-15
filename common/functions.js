/**
* The purpose of this function is to determine which hour is nearest to the hour in which the funciton is called.
*/
const getHourDivisibleByThree = (date) => {
  const hours = date.getHours();
  const remainder = hours % 3;
  let currentHour = hours;

  const CurrentHourIsNotDivisibleByThree = remainder !== 0;

  if (CurrentHourIsNotDivisibleByThree) {
    const isCurrentHourNearestToNextHour = remainder > 1;
    if (isCurrentHourNearestToNextHour) currentHour += 1;
    else currentHour -= 1;
  }
  return currentHour;
};

module.exports = getHourDivisibleByThree;
