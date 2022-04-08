import _ from "lodash";
import PortfolioHistory from "./portfolioHistory";
import AssetsDataTables from "./assetsDataTables";
import { getPrices } from "../services/pricesServices";
import {
  getAssets,
  deleteAsset,
  deleteAssetBySubClass,
} from "../services/assetsServices";
import { getHistoryRecord } from "../services/historyService";
import mapPricesToAssets from "../utils/mapPricesToAssets";
import { useState, useEffect } from "react";
import useDeleteMsgModal from "../hooks/useDeleteMessage";
import Charts from "./charts";

const PortfolioDetails = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [prices, setPrices] = useState({});
  const [historyRecord, setHistoryRecord] = useState([]);
  const [mappedAssets, setMappedAssets] = useState([]);
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

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

  return (
    <div className="portfolio-details">
      {modalBody}
      <AssetsDataTables
        mappedAssets={mappedAssets}
        handleDelMsgDisplay={handleDelMsgDisplay}
        historyRecord={historyRecord}
        prices={prices}
      />
      <PortfolioHistory data={historyRecord} mappedAssets={mappedAssets} />
      <Charts historyRecord={historyRecord} assetsData={mappedAssets} />
    </div>
  );
};

export default PortfolioDetails;
