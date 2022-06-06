import data from "../data.json";
import * as actions from "./actionTypes";
import fakeHistoryBuilder from "../utils/fakeHistoryBuilder";
import getDateId from "../utils/getDateId";
import dateOperation from "../utils/dateOperation";
import { getTotalsByAssetClass } from "../utils";

const assets = [];

export const fetchAssets = () => async (dispatch) => {
  dispatch({ type: actions.FETCH_ASSETS, payload: assets });
};

export const fetchPrices = () => async (dispatch) => {
  const goldCurrency = data.goldcurrency || [];
  const stock = (await data.stock) || [];

  dispatch({
    type: actions.FETCH_PRICES,
    payload: { goldCurrency, stock },
  });
};

export const fetchHistoryRecord = () => async (dispatch, getState) => {
  let totals = getTotalsByAssetClass(getState().assets);

  totals["overall"] = totals["total"];
  delete totals["total"];
  totals = { ...totals, id: dateOperation(getDateId(), 1) };

  const payload = totals.overall === 0 ? [] : fakeHistoryBuilder(60, totals);

  dispatch({
    type: actions.FETCH_HISTORY,
    payload,
  });
};

export const deleteAssetBySubClass = (toDeleteAsset) => async (dispatch) => {
  dispatch({
    type: actions.DELETE_ASSET_BY_SUBCLASS,
    payload: toDeleteAsset,
  });
};

export const deleteAssetById = (id) => async (dispatch) => {
  dispatch({ type: actions.DELETE_ASSET_BY_ID, payload: id });
};

export const addAsset = (asset) => async (dispatch) => {
  dispatch({ type: actions.ADD_ASSET, payload: { ...asset, id: Date.now() } });
};

export const editAsset = (assetId, newValue) => async (dispatch) => {
  dispatch({ type: actions.EDIT_ASSET, payload: { assetId, newValue } });
};

export const updateHistoryRecord = (newHistoryRecord) => async (dispatch) => {
  dispatch({ type: actions.UPDATE_HISTORY, payload: newHistoryRecord });
};

export const fetchAll = () => async (dispatch) => {
  dispatch(fetchAssets());
  dispatch(fetchPrices());
  dispatch(fetchHistoryRecord());
};
