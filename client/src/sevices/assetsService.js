import axios from "axios";
import { serverUrl } from "../config.json";

export function getAssets() {
  return axios.get(`${serverUrl}/assets`);
}

export function addAsset(assetData) {
  return axios.post(`${serverUrl}/assets`, assetData);
}

export function deleteAsset(id) {
  return axios.delete(id);
}
