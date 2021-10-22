import axios from "axios";
import { serverUrl } from "../config.json";

export function deleteAsset(id) {
  return axios.delete(id);
}

export function getAssets() {
  return axios.get(`${serverUrl}/assets`);
}
