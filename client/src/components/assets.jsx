import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import {
  getAssets,
  deleteAssetBySubClass,
  deleteAsset,
} from "../services/assetsServices";
import {
  saveOverallHistory,
  getHistoryRecord,
} from "../services/historyService";
import { getPrices } from "../services/pricesServices";
import useDeleteMsgModal from "../hooks/useDeleteMessage";
import AssetsTable from "./assetsTable";
import mapPricesToAssets from "../utils/mapPricesToAssets";
import CashTable from "./cashTable";
import getDataWithChange from "../utils/getDataWithChange";
import History from "./history";

const Assets = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [prices, setPrices] = useState({});
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);
  const [historyRecord, setHistoryRecord] = useState([]);

  const [mappedAssets, setMappedAssets] = useState([]);

  // TODO: fix 'goldcurrency', 'goldCurrency'. one of them is enough
  const tables = {
    goldcurrency: AssetsTable,
    goldCurrency: AssetsTable,
    stock: AssetsTable,
    cash: CashTable,
  };

  const titles = {
    goldCurrency: "طلا و ارز",
    goldcurrency: "طلا و ارز",
    stock: "بورس",
    cash: "نقدی",
  };

  // gets all history
  useEffect(() => {
    async function fetchHistoryApi() {
      const { data } = await getHistoryRecord();

      setHistoryRecord(data);
    }

    fetchHistoryApi();
  }, []);

  // gets updated market prices
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

  // gets assets information
  useEffect(() => {
    async function fetchApi() {
      let { data } = await getAssets();

      setAssetsData(data);
    }

    fetchApi();
  }, []);

  // checks if data is ready to save in history record
  function checkMappedValidation(mappedAssets) {
    const isDataFetchComplete =
      mappedAssets.length && !mappedAssets.some((item) => !item.data.length);

    if (isDataFetchComplete) return true;
  }

  // saves overallValues in history
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

  // sets mappedAssets
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
    const lastRecordChange = getDataWithChange(historyRecord, ["id"]).pop();

    return mappedAssets.map((assets) => {
      const table = tables[assets.assetClass];
      const title = titles[assets.assetClass];

      const props = {
        assetsData: assets.data,
        overallValue: lastRecordChange[assets.assetClass],
        onDeleteAsset: handleDelMsgDisplay,
        key: assets.assetClass,

        title,
      };

      return React.createElement(table, props);
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
      <History data={historyRecord} />
    </div>
  );
};

export default Assets;
