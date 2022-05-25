import data from "../data.json";
import * as actions from "./actionTypes";
import fakeHistoryBuilder from "../utils/fakeHistoryBuilder";
import getDateId from "../utils/getDateId";
import dateOperation from "../utils/dateOperation";

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

export const fetchHistoryRecord = () => async (dispatch) => {
  const lastProvidedHistory = {
    overall: 1000000000,
    id: dateOperation(getDateId(), 1),
    cash: 300000000,
    goldCurrency: 400000000,
    stock: 300000000,
  };
  const fakeHistory = fakeHistoryBuilder(60, lastProvidedHistory);

  dispatch({
    type: actions.FETCH_HISTORY,
    payload: fakeHistory,
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
