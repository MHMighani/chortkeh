import axios from "axios";
import { serverUrl } from "../config.json";
import getDateId from "../utils/getDateId";
import "./interceptors";

const baseUrl = `${serverUrl}/history`;

export function getHistoryRecord(date = "") {
  return axios.get(`${baseUrl}/${date}`);
}

// saves overallValues
export async function saveOverallHistory(data, isNewRecord) {
  const todayDate = getDateId();

  if (isNewRecord) {
    await axios.post(`${baseUrl}/`, { ...data, id: todayDate });
  } else {
    await axios.patch(`${baseUrl}/${todayDate}`, data);
  }
}
