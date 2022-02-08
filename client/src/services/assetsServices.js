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

export function addAssets(assetsArray) {
  const promises = assetsArray.map((asset) => addAsset(asset));

  return Promise.all(promises);
}

export function deleteAsset(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

export function getAssetsBySubClass(subClass) {
  const url = `${baseUrl}?assetSubClass=${subClass}`;
  return axios.get(url);
}

// deletes all assets of specific subClass
export async function deleteAssetBySubClass(subClass) {
  const { data: assets } = await getAssetsBySubClass(subClass);

  let promises = assets.map((asset) => deleteAsset(asset.id));

  return Promise.all(promises);
}

export async function deleteAllAssets() {
  const { data: allAssets } = await getAssets();
  let promises = allAssets.map((asset) => deleteAsset(asset.id));

  return Promise.all(promises);
}
