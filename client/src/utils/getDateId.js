import { utils } from "react-modern-calendar-datepicker";

// returns date id by persian format
function getDateId(date = utils("fa").getToday()) {
  //adding zero to the beggining for consistency in dates
  const lengthOfNumbers = { year: 4, month: 2, day: 2 };
  for (let key in date) {
    date[key] = String(date[key]).padStart(lengthOfNumbers[key], "0");
  }

  return `${date["year"]}-${date["month"]}-${date["day"]}`;
}

export default getDateId;
