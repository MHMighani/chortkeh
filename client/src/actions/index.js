import {
  getAssets,
  addAsset as addAssetApi,
  editAsset as editAssetApi,
} from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import { getHistoryRecord } from "../services/historyService";
import { deleteAssetBySubClass as deleteAssetBySubClassApi } from "../services/assetsServices";
import { deleteAsset } from "../services/assetsServices";

export const fetchAssets = () => async (dispatch) => {
  const response = await getAssets();
  dispatch({ type: "FETCH_ASSETS", payload: response.data });
};

export const fetchPrices = () => async (dispatch) => {
  const { data: goldCurrency } = await getPrices("goldcurrency");
  const { data: stock } = await getPrices("stock");

  dispatch({
    type: "FETCH_PRICES",
    payload: { goldCurrency, stock },
  });
};

export const fetchHistoryRecord = () => async (dispatch) => {
  const { data: historyRecord } = await getHistoryRecord();

  dispatch({
    type: "FETCH_HISTORY",
    payload: historyRecord,
  });
};

export const deleteAssetBySubClass = (toDeleteAsset) => async (dispatch) => {
  dispatch({
    type: "DELETE_ASSET_BY_SUBCLASS",
    payload: toDeleteAsset,
  });

  await deleteAssetBySubClassApi(toDeleteAsset.id);
};

export const deleteAssetById = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_ASSET_BY_ID", payload: id });
  await deleteAsset(id);
};

export const addAsset = (asset) => async (dispatch) => {
  dispatch({ type: "ADD_ASSET", payload: asset });
  await addAssetApi(asset);
};

export const editAsset = (assetId, newValue) => async (dispatch) => {
  dispatch({ type: "EDIT_ASSET", payload: { assetId, newValue } });
  await editAssetApi(assetId, newValue);
};

export const updateHistoryRecord = (newHistoryRecord) => async (dispatch) => {
  dispatch({ type: "UPDATE_HISTORY", payload: newHistoryRecord });
};
