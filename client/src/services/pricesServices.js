import axios from "axios";
import { serverUrl } from "../config.json";

export function getPrices(assetClass) {
  return axios.get(`${serverUrl}/${assetClass}`);
}

export function getPriceBySubClass(assetClass, assetSubClass) {
  const url = `${serverUrl}/${assetClass}/${assetSubClass}`;
  return axios.get(url);
}

export function getStockPrice(stockId) {
  const url = `${serverUrl}/stock`;
  const data = axios.get(`${url}/${stockId}`);

  return data;
}
