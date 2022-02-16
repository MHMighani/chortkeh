import axios from "axios";
import { serverUrl } from "../config.json";
import { utils } from "react-modern-calendar-datepicker";

const baseUrl = `${serverUrl}/history`;

// returns date id by persian format
function getDateId() {
  return Object.values(utils("fa").getToday()).join("-");
}

export function getHistory(date) {
  return axios.get(`${baseUrl}/${date}`);
}

// saves overallValues
export async function saveOverallHistory(data) {
  const todayDate = getDateId();
  try {
    // checking for past histories for today
    await getHistory(todayDate);
    // updating last overallValue data for today
    await axios.patch(`${baseUrl}/${todayDate}`, data);
  } catch (error) {
    // data for today is not saved yet
    if (error.response.status === 404) {
      await axios.post(`${baseUrl}/`, { ...data, id: todayDate });
    }
  }
}
