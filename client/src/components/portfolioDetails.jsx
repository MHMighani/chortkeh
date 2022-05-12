import PortfolioHistory from "./portfolioHistory";
import AssetsDataTables from "./assetsDataTables";
import getMappedAssets from "../utils/getMappedAssets";
import { useState, useEffect } from "react";
import useDeleteMsgModal from "../hooks/useDeleteMessage";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchPrices,
  fetchAssets,
  fetchHistoryRecord,
  deleteAssetById,
  deleteAssetBySubClass,
} from "../actions";

import Charts from "./charts";

const PortfolioDetails = () => {
  const [mappedAssets, setMappedAssets] = useState([]);
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets);
  const prices = useSelector((state) => state.prices);
  const historyRecord = useSelector((state) => state.historyRecord);

  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchPrices());
    dispatch(fetchHistoryRecord());
  }, [dispatch]);

  function handleConfirm(toDeleteAsset) {
    if (toDeleteAsset.assetClass === "cash") {
      dispatch(deleteAssetById(toDeleteAsset.id));
    } else {
      dispatch(deleteAssetBySubClass(toDeleteAsset));
    }
  }

  // sets mappedAssets
  useEffect(() => {
    const mappedAssets = getMappedAssets(assets, prices);

    if (Object.values(prices).length) {
      setMappedAssets(mappedAssets);
    }
  }, [prices, assets]);

  if (Object.values(prices).length) {
    return (
      <div className="portfolio-details">
        {modalBody}
        <AssetsDataTables
          mappedAssets={mappedAssets}
          handleDelMsgDisplay={handleDelMsgDisplay}
          historyRecord={historyRecord}
          prices={prices}
        />
        <PortfolioHistory mappedAssets={mappedAssets} />
        <Charts historyRecord={historyRecord} assetsData={mappedAssets} />
      </div>
    );
  } else {
    return null;
  }
};

export default PortfolioDetails;
