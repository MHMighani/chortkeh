import _ from "lodash";
import PortfolioHistory from "./portfolioHistory";
import AssetsDataTables from "./assetsDataTables";
import mapPricesToAssets from "../utils/mapPricesToAssets";
import { useState, useEffect } from "react";
import useDeleteMsgModal from "../hooks/useDeleteMessage";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchPrices,
  fetchAssets,
  fetchHistoryRecord,
  deleteAssetBySubClass,
} from "../actions";

import Charts from "./charts";

const PortfolioDetails = (props) => {
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
    dispatch(deleteAssetBySubClass(toDeleteAsset));
  }

  // sets mappedAssets
  useEffect(() => {
    function getMappedAssets() {
      const data = _.groupBy(assets, "assetClass");

      return Object.values(data).map((assets) => {
        const assetClass = assets[0].assetClass;

        const [mappedAssets, overallValue] = mapPricesToAssets(prices, assets);

        return { assetClass, data: mappedAssets, overallValue };
      });
    }

    setMappedAssets(getMappedAssets());
  }, [prices, assets]);

  if (Object.values(prices).length && assets.length && historyRecord.length) {
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
