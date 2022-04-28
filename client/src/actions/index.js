import { getAssets } from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import { getHistoryRecord } from "../services/historyService";
import { deleteAsset as deleteAssetApi } from "../services/assetsServices";

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

export const deleteAsset = (toDeleteAsset) => async (dispatch) => {
  dispatch({
    type: "DELETE_ASSET_BY_SUBCLASS",
    payload: toDeleteAsset,
  });

  await deleteAssetApi(toDeleteAsset.id);
};

export const addAsset = (asset) => async (dispatch) => {
  dispatch({ type: "ADD_ASSET", payload: asset });
};

export const updateHistoryRecord = (newHistoryRecord) => async (dispatch) => {
  dispatch({ type: "UPDATE_HISTORY", payload: newHistoryRecord });
};
