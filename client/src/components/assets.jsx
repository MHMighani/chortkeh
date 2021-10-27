import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAsset, getAssets } from "../sevices/assetsService";
import { getPrices } from "../sevices/pricesService";
import AssetsTable from "./assetsTable";

const Assets = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    async function fetchApi() {
      let assetsResponse = await getAssets();
      let pricesResponse = await getPrices();
      setAssetsData(assetsResponse.data);
      setPrices(pricesResponse.data);
    }

    fetchApi();
  }, []);

  return (
    <div className="assets">
      <Link to="/add" className="btn btn-primary">
        اضافه کردن
      </Link>
      <AssetsTable
        assetsData={assetsData}
        prices={prices}
        onDeleteAsset={async (id) => {
          const newAssetsData = assetsData.filter((asset) => asset.id !== id);

          setAssetsData(newAssetsData);
          deleteAsset(id);
        }}
      />
    </div>
  );
};

export default Assets;
