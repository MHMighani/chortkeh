import axios from "axios";
import { serverUrl } from "../config.json";

const baseUrl = `${serverUrl}/assets`;

export function getAssets() {
  return axios.get(`${baseUrl}`);
}

export function getAsset(id) {
  return axios.get(`${baseUrl}/${id}`);
}

export function editAsset(id, editedField) {
  return axios.patch(`${baseUrl}/${id}`, editedField);
}

export function addAsset(assetData) {
  return axios.post(`${baseUrl}`, assetData);
}

export function deleteAsset(id) {
  return axios.delete(`${baseUrl}/${id}`);
}
