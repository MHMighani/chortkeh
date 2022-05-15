import {
  getAssets,
  addAsset as addAssetApi,
  editAsset as editAssetApi,
} from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import { getHistoryRecord } from "../services/historyService";
import { deleteAssetBySubClass as deleteAssetBySubClassApi } from "../services/assetsServices";
import { deleteAsset } from "../services/assetsServices";

import * as actions from "./actionTypes";

const assets = [];

export const fetchAssets = () => async (dispatch) => {
  // const response = await getAssets();
  dispatch({ type: actions.FETCH_ASSETS, payload: assets });
};

export const fetchPrices = () => async (dispatch) => {
  // const { data: goldCurrency } = await getPrices("goldcurrency");
  // const { data: stock } = await getPrices("stock");

  dispatch({
    type: actions.FETCH_PRICES,
    payload: { goldCurrency: [], stock: [] },
  });
};

export const fetchHistoryRecord = () => async (dispatch) => {
  // const { data: historyRecord } = await getHistoryRecord();

  dispatch({
    type: actions.FETCH_HISTORY,
    payload: [],
  });
};

export const deleteAssetBySubClass = (toDeleteAsset) => async (dispatch) => {
  dispatch({
    type: actions.DELETE_ASSET_BY_SUBCLASS,
    payload: toDeleteAsset,
  });

  await deleteAssetBySubClassApi(toDeleteAsset.assetSubClass);
};

export const deleteAssetById = (id) => async (dispatch) => {
  dispatch({ type: actions.DELETE_ASSET_BY_ID, payload: id });
  await deleteAsset(id);
};

export const addAsset = (asset) => async (dispatch) => {
  dispatch({ type: actions.ADD_ASSET, payload: asset });
  await addAssetApi(asset);
};

export const editAsset = (assetId, newValue) => async (dispatch) => {
  dispatch({ type: actions.EDIT_ASSET, payload: { assetId, newValue } });
  await editAssetApi(assetId, newValue);
};

export const updateHistoryRecord = (newHistoryRecord) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_HISTORY, payload: newHistoryRecord });
};
