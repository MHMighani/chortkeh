import { combineReducers } from "redux";

const assets = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ASSETS":
      return action.payload;
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
    default:
      return state;
  }
};

export default combineReducers({ assets, prices, historyRecord });
