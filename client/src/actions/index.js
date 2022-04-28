import { getAssets } from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import { getHistoryRecord } from "../services/historyService";

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
