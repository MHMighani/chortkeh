import { createContext, useReducer, useEffect } from "react";
import { useAsync } from "react-async-hook";
// import { deleteAssetBySubClass } from "../services/assetsServices";
// import { getAllPrices } from "../services/pricesServices";
import { getAssets } from "../services/assetsServices";
// import getMappedAssets from "../utils/getMappedAssets";

export const AssetsContext = createContext();

export default function AssetsContextProvider({ children }) {
  const fetchAssets = useAsync(getAssets, []);

  const { result: fetchAssetResult } = fetchAssets;

  const { data: assetsData } = fetchAssetResult || {};

  useEffect(() => {
    dispatch({ type: "update_fetched_data", payload: assetsData });
  }, [assetsData]);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "delete_by_subclass":
        return state.filter((asset) => asset.assetSubClass !== action.payload);

      case "update_fetched_data":
        return action.payload;
      default:
        return state;
    }
  }, assetsData);

  return (
    <AssetsContext.Provider value={[state, dispatch]}>
      {children}
    </AssetsContext.Provider>
  );
}
