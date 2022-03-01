import axios from "axios";
import { serverUrl } from "../config.json";
import { utils } from "react-modern-calendar-datepicker";

const baseUrl = `${serverUrl}/history`;

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

export function getHistoryRecord(date = "") {
  return axios.get(`${baseUrl}/${date}`);
}

// saves overallValues
export async function saveOverallHistory(data) {
  const todayDate = getDateId();
  try {
    // checking for past histories for today
    await getHistoryRecord(todayDate);
    // updating last overallValue data for today
    await axios.patch(`${baseUrl}/${todayDate}`, data);
  } catch (error) {
    // data for today is not saved yet
    if (error.response.status === 404) {
      await axios.post(`${baseUrl}/`, { ...data, id: todayDate });
    }
  }
}
