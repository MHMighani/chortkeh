import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getAssets, deleteAssetBySubClass } from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import CustomModal from "./modal";
import AssetsTable from "./assetsTable";
import mapPricesToAssets from "../utils/mapPricesToAssets";
import getCommaSepNum from "../utils/getCommaSepNum";
import CashTable from "./cashTable";

const Assets = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [prices, setPrices] = useState({});
  const [delMessageDisplay, setDelMessageDisplay] = useState(false);
  const [toDeleteAsset, setToDeleteAsset] = useState(null);

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

  const handleDelMsgClose = () => {
    setDelMessageDisplay(false);
    setToDeleteAsset(null);
  };
  const handleDelMsgDisplay = (id) => {
    setDelMessageDisplay(true);
    setToDeleteAsset(id);
  };
  const handleDelMsgConfirm = () => {
    const newAssetsData = assetsData.filter(
      (asset) => asset.assetSubClass !== toDeleteAsset
    );

    setAssetsData(newAssetsData);
    deleteAssetBySubClass(toDeleteAsset);

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
      {getCommaSepNum(_.sumBy(mappedAssets, "overallValue"))}
    </div>
  );
};

export default Assets;
