import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAsset, getAssets } from "../services/assetsServices";
import { getPrices } from "../services/pricesServices";
import CustomModal from "./modal";
import AssetsTable from "./assetsTable";

const Assets = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [prices, setPrices] = useState({});
  const [delMessageDisplay, setDelMessageDisplay] = useState(false);
  const [toDeleteAsset, setToDeleteAsset] = useState(null);

  useEffect(() => {
    async function fetchApi() {
      let assetsResponse = await getAssets();
      let pricesResponse = await getPrices();
      setAssetsData(assetsResponse.data);
      setPrices(pricesResponse.data);
    }

    fetchApi();
  }, []);

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
      <Link to="assets/new" className="btn btn-primary">
        افزودن
      </Link>
      <AssetsTable
        assetsData={assetsData}
        prices={prices}
        onDeleteAsset={handleDelMsgDisplay}
      />
    </div>
  );
};

export default Assets;
