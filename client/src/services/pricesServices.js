import axios from "axios";
import { serverUrl } from "../config.json";

export function getPrices(assetClass) {
  return axios.get(`${serverUrl}/${assetClass}`);
}
