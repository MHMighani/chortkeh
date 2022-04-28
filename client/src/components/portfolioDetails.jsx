import _ from "lodash";
import PortfolioHistory from "./portfolioHistory";
import AssetsDataTables from "./assetsDataTables";
import mapPricesToAssets from "../utils/mapPricesToAssets";
import { useState, useEffect } from "react";
import useDeleteMsgModal from "../hooks/useDeleteMessage";

import { connect } from "react-redux";
import {
  fetchPrices,
  fetchAssets,
  fetchHistoryRecord,
  deleteAsset,
} from "../actions";

import Charts from "./charts";

const PortfolioDetails = (props) => {
  const [mappedAssets, setMappedAssets] = useState([]);
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  useEffect(() => {
    props.fetchAssets();
    props.fetchPrices();
    props.fetchHistoryRecord();
  }, []);

  function handleConfirm(toDeleteAsset) {
    props.deleteAsset(toDeleteAsset);
  }

  // sets mappedAssets
  useEffect(() => {
    function getMappedAssets() {
      const data = _.groupBy(props.assets, "assetClass");

      return Object.values(data).map((assets) => {
        const assetClass = assets[0].assetClass;

        const [mappedAssets, overallValue] = mapPricesToAssets(
          props.prices,
          assets
        );

        return { assetClass, data: mappedAssets, overallValue };
      });
    }

    setMappedAssets(getMappedAssets());
  }, [props.prices, props.assets]);

  if (
    Object.values(props.prices).length &&
    props.assets.length &&
    props.historyRecord.length
  ) {
    return (
      <div className="portfolio-details">
        {modalBody}
        <AssetsDataTables
          mappedAssets={mappedAssets}
          handleDelMsgDisplay={handleDelMsgDisplay}
          historyRecord={props.historyRecord}
          prices={props.prices}
        />
        <PortfolioHistory mappedAssets={mappedAssets} />
        <Charts historyRecord={props.historyRecord} assetsData={mappedAssets} />
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    assets: state.assets,
    prices: state.prices,
    historyRecord: state.historyRecord,
  };
};

export default connect(mapStateToProps, {
  fetchPrices,
  fetchAssets,
  fetchHistoryRecord,
  deleteAsset,
})(PortfolioDetails);
