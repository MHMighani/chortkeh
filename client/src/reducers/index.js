import { combineReducers } from "redux";
import * as actions from "../actions/actionTypes";

const assets = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_ASSETS:
      return action.payload;
    case actions.DELETE_ASSET_BY_SUBCLASS:
      return state.filter(
        (asset) => asset.assetSubClass !== action.payload.assetSubClass
      );
    case actions.DELETE_ASSET_BY_ID:
      return state.filter((asset) => asset.id !== action.payload);
    case actions.EDIT_ASSET:
      //TODO: better solution?
      return state.map((asset) => {
        if (asset.id === action.payload.assetId) {
          return action.payload.newValue;
        }
        return state;
      });

    case actions.ADD_ASSET:
      return [...state, action.payload];
    default:
      return state;
  }
};

const prices = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_PRICES:
      return action.payload;
    default:
      return state;
  }
};

const historyRecord = (state = [], action) => {
  switch (action.type) {
    case actions.FETCH_HISTORY:
      return action.payload;
    case actions.UPDATE_HISTORY:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ assets, prices, historyRecord });
