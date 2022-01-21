import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { deleteAsset, getAssets } from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import CustomModal from "./modal";
import AssetsTable from "./assetsTable";
import mapPricesToAssets from "../utils/mapPricesToAssets";
import CashTable from "./cashTable";

const Assets = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [prices, setPrices] = useState({});
  const [delMessageDisplay, setDelMessageDisplay] = useState(false);
  const [toDeleteAsset, setToDeleteAsset] = useState(null);
  const [overallValue, setOverallValue] = useState(0);

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

  // calculating totalValue
  useEffect(() => {
    let total = 0;
    assetsData.forEach(
      (asset) => (total += Number(asset.price || 1) * Number(asset.amount))
    );
    setOverallValue(total);
  }, [prices, assetsData]);

  // get total value for each asset class
  function getTotalValue(assets) {
    const total = assets.reduce((total, asset) => {
      const price = Number(asset.price) || 1;

      return total + Number(asset.amount) * Number(price);
    }, 0);
    return total;
  }

  // render assets based on their asset class
  function renderAssetTables() {
    const data = _.groupBy(assetsData, "assetClass");

    return Object.values(data).map((assets) => {
      const assetClass = assets[0].assetClass;
      const table = tables[assetClass];

      let props;

      if (assetClass === "cash") {
        props = {
          assetsData: assets,
          onDeleteAsset: handleDelMsgDisplay,
        };
      } else {
        props = {
          assetsData: mapPricesToAssets(prices, assets) || [],
          onDeleteAsset: handleDelMsgDisplay,
        };
      }

      return React.createElement(table, props);
    });
  }

  const handleDelMsgClose = () => {
    setDelMessageDisplay(false);
    setToDeleteAsset(null);
  };
  const handleDelMsgDisplay = (id) => {
    setDelMessageDisplay(true);
    setToDeleteAsset(id);
  };
  const handleDelMsgConfirm = async () => {
    const newAssetsData = assetsData.filter(
      (asset) => asset.id !== toDeleteAsset
    );

    setAssetsData(newAssetsData);
    deleteAsset(toDeleteAsset);
    handleDelMsgClose();
  };

  return (
    <div className="assets">
      <CustomModal
        title="آیا از حذف این دارایی اطمینان دارید؟"
        handleClose={handleDelMsgClose}
        show={delMessageDisplay}
        handleConfirm={handleDelMsgConfirm}
      />
      <Link to="add" className="btn btn-primary">
        افزودن
      </Link>

      {renderAssetTables()}
      {overallValue}
    </div>
  );
};

export default Assets;
