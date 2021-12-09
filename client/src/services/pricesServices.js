import axios from "axios";
import { serverUrl } from "../config.json";

export function getPrices() {
  return axios.get(`${serverUrl}/prices`);
}
