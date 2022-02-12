import { useEffect, useState } from "react";
import { getAssetsBySubClass } from "../services/assetsServices";
import { getPriceBySubClass } from "../services/pricesServices";
import getPercentChange from "../utils/getPercentChange";
import { Card } from "react-bootstrap";
import Table from "./table";
import EditBtn from "./editBtn";
import DeleteBtn from "./deleteBtn";
import { detailsTableColumns as columns } from "../services/columns";
import { deleteAsset } from "../services/assetsServices";
import useDeleteMsgModal from "../hooks/useDeleteMessage";

const AssetDetails = (props) => {
  const { assetClass, assetSubClass } = props.location.state;
  const [assetData, setAssetData] = useState([]);
  const [marketPrice, setMarketPrice] = useState(0);
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  function handleConfirm(item) {
    deleteAsset(item.id);
    setAssetData(assetData.filter((asset) => asset.id !== item.id));
  }

  // getting assets
  useEffect(() => {
    async function fetchData() {
      const { data } = await getAssetsBySubClass(assetSubClass);
      setAssetData(data);
    }
    fetchData();
  }, [assetSubClass]);

  // getting market price
  useEffect(() => {
    async function fetchData() {
      const { data } = await getPriceBySubClass(assetClass, assetSubClass);
      const priceKey = assetClass === "stock" ? "lastTradePrice" : "price";
      setMarketPrice(data[priceKey]);
    }

    fetchData();
  }, [assetSubClass, assetClass]);

  function getStringDate(date) {
    return date.reverse().join("/");
  }

  function getProcessedData(data) {
    return data.map((item) => {
      const date = { ...item.purchaseDate };

      const overallValue = item.amount * marketPrice;
      const changePercent = getPercentChange(item.purchasePrice, marketPrice);
      const purchaseDate = getStringDate(Object.values(date));
      const deleteBtn = (
        <DeleteBtn deleteMethod={() => handleDelMsgDisplay(item)} />
      );
      const editBtn = (
        <EditBtn assetData={{ id: item.id, assetClass: item.assetClass }} />
      );

      return {
        ...item,
        overallValue,
        changePercent,
        purchaseDate,
        deleteBtn,
        editBtn,
      };
    });
  }

  return (
    <div>
      {modalBody}
      <Card>
        <Card.Header>
          <span>{assetData.length && assetData[0].label}</span>
          <span>{marketPrice}</span>
        </Card.Header>
        <Card.Body>
          <Table data={getProcessedData(assetData)} columns={columns} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AssetDetails;
