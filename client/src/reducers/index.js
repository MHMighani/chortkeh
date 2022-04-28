import { combineReducers } from "redux";

const assets = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ASSETS":
      return action.payload;
    case "DELETE_ASSET_BY_SUBCLASS":
      return state.filter(
        (asset) => asset.assetSubClass !== action.payload.assetSubClass
      );
    case "ADD_ASSET":
      return [...state, action.payload];
    default:
      return state;
  }
};

const prices = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_PRICES":
      return action.payload;
    default:
      return state;
  }
};

const historyRecord = (state = [], action) => {
  switch (action.type) {
    case "FETCH_HISTORY":
      return action.payload;
    case "UPDATE_HISTORY":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ assets, prices, historyRecord });
