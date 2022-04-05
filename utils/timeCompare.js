export default (firstTime, secondTime) => {
  // * если 2 параметр функции => 1 возвращает true
  // * формат времени "**:**"

  if (firstTime && secondTime) {
    const firstTimeSplit = firstTime.split(":");
    const secondTimeSplit = secondTime.split(":");

    if (firstTimeSplit[1] >= 60 || secondTimeSplit[1] >= 60) return false;

    if (firstTime === secondTime) return true;

    if (firstTimeSplit[0] < secondTimeSplit[0]) return true;

    if (
      firstTimeSplit[0] === secondTimeSplit[0] &&
      firstTimeSplit[1] < secondTimeSplit[1]
    )
      return true;
  }

  return false;
};
