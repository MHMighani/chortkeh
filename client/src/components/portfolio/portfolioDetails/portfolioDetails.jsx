import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PortfolioHistory from "components/portfolio/portfolioHistory/portfolioHistory";
import AssetsDataTables from "components/tables/assetsTable/assetsDataTables";
import { getMappedAssets } from "utils";
import { useDeleteMsgModal } from "hooks/";
import Charts from "components/charts/charts";
import { deleteAssetById, deleteAssetBySubClass } from "../../../redux/actions";

import "./portfolioDetails.scss";

const PortfolioDetails = () => {
  const [mappedAssets, setMappedAssets] = useState([]);
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  const dispatch = useDispatch();
  const [assets, prices] = useSelector((state) => [state.assets, state.prices]);
  const historyRecord = useSelector((state) => state.historyRecord);

  function handleConfirm(toDeleteAsset) {
    if (toDeleteAsset.assetClass === "cash") {
      return dispatch(deleteAssetById(toDeleteAsset.id));
    }
    return dispatch(deleteAssetBySubClass(toDeleteAsset));
  }

  // sets mappedAssets
  useEffect(() => {
    const mappedAssets = getMappedAssets(assets, prices);

    if (Object.values(prices).length) {
      setMappedAssets(mappedAssets);
    }
  }, [prices, assets]);

  if (Object.values(prices).length > 0) {
    return (
      <div className="portfolio-details">
        {modalBody}
        <AssetsDataTables
          {...{ mappedAssets, handleDelMsgDisplay, historyRecord, prices }}
        />
        <PortfolioHistory mappedAssets={mappedAssets} />
        <Charts {...{ historyRecord }} assetsData={mappedAssets} />
      </div>
    );
  }

  return null;
};

export default PortfolioDetails;
