import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import {
  getAssets,
  deleteAssetBySubClass,
  deleteAsset,
} from "../services/assetsServices";
import { saveOverallHistory } from "../services/historyService";
import { getPrices } from "../services/pricesServices";
import useDeleteMsgModal from "../hooks/useDeleteMessage";
import AssetsTable from "./assetsTable";
import mapPricesToAssets from "../utils/mapPricesToAssets";
import getCommaSepNum from "../utils/getCommaSepNum";
import CashTable from "./cashTable";

const Assets = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [prices, setPrices] = useState({});
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  const [mappedAssets, setMappedAssets] = useState([]);
  const tables = {
    goldcurrency: AssetsTable,
    goldCurrency: AssetsTable,
    stock: AssetsTable,
    cash: CashTable,
  };

  // getting updated market prices
  useEffect(() => {
    async function fetchApi() {
      let goldCurrencyPricesResponse = await getPrices("goldcurrency");
      let stockPricesResponse = await getPrices("stock");

      setPrices({
        goldCurrency: [...goldCurrencyPricesResponse.data],
        stock: [...stockPricesResponse.data],
      });
    }
    fetchApi();
  }, []);

  // getting assets information
  useEffect(() => {
    async function fetchApi() {
      let { data } = await getAssets();

      setAssetsData(data);
    }

    fetchApi();
  }, []);

  // checking if data is ready for saving in history
  function checkMappedValidation(mappedAssets) {
    const isDataFetchComplete =
      mappedAssets.length && !mappedAssets.some((item) => !item.data.length);

    if (isDataFetchComplete) return true;
  }

  // saving overallValues in history
  useEffect(() => {
    if (checkMappedValidation(mappedAssets)) {
      const normalizedOverall = mappedAssets.reduce(
        (prev, current) => {
          prev[current.assetClass] = current.overallValue;
          prev.overall += current.overallValue;
          return prev;
        },
        { overall: 0 }
      );

      saveOverallHistory(normalizedOverall);
    }
  }, [mappedAssets]);

  // setting mappedAssets
  useEffect(() => {
    function getMappedAssets() {
      const data = _.groupBy(assetsData, "assetClass");

      return Object.values(data).map((assets) => {
        const assetClass = assets[0].assetClass;

        const [mappedAssets, overallValue] = mapPricesToAssets(prices, assets);

        return { assetClass, data: mappedAssets, overallValue };
      });
    }
    setMappedAssets(getMappedAssets());
  }, [prices, assetsData]);

  // render asset's table based on their asset class
  function renderAssetTables() {
    return mappedAssets.map((assets) => {
      const assetClass = assets.assetClass;
      const table = tables[assetClass];

      return React.createElement(table, {
        assetsData: assets.data,
        overallValue: assets.overallValue,
        onDeleteAsset: handleDelMsgDisplay,
        key: assetClass,
      });
    });
  }

  function handleConfirm(toDeleteAsset) {
    const newAssetsData = assetsData.filter(
      (asset) => asset.id !== toDeleteAsset.id
    );
    setAssetsData(newAssetsData);
    if (toDeleteAsset.assetClass === "cash") {
      deleteAsset(toDeleteAsset.id);
    } else {
      deleteAssetBySubClass(toDeleteAsset.assetSubClass);
    }
  }

  return (
    <div className="assets">
      {modalBody}
      <Link to="add" className="btn btn-primary">
        افزودن
      </Link>

      {renderAssetTables()}
      {getCommaSepNum(_.sumBy(mappedAssets, "overallValue"))}
    </div>
  );
};

export default Assets;
