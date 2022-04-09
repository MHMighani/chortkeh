import { utils } from "react-modern-calendar-datepicker";

// returns date id by persian format
function getDateId() {
  //adding zero to the beggining for consistency in dates
  const lengthOfNumbers = { year: 4, month: 2, day: 2 };
  const today = utils("fa").getToday();
  for (let key in today) {
    today[key] = String(today[key]).padStart(lengthOfNumbers[key], "0");
  }

  return Object.values(today).join("-");
}

export default getDateId;
