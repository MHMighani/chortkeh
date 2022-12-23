import PortfolioHistory from "../portfolioHistory/portfolioHistory";
import AssetsDataTables from "../../tables/assetsTable/assetsDataTables";
import { getMappedAssets } from "../../../utils";
import { useState, useEffect } from "react";
import { useDeleteMsgModal } from "../../../hooks/";
import Charts from "../../charts/charts";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssetById, deleteAssetBySubClass } from "../../../actions";

import "./portfolioDetails.scss";

const PortfolioDetails = () => {
  const [mappedAssets, setMappedAssets] = useState([]);
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  const dispatch = useDispatch();
  const assets = useSelector((state) => state.assets);
  const prices = useSelector((state) => state.prices);
  const historyRecord = useSelector((state) => state.historyRecord);

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
