import { useContext } from "react";
import getPercentChange from "../utils/getPercentChange";
import { Card } from "react-bootstrap";
import Table from "./table";
import { EditBtn, DeleteBtn } from "./buttons";
import { detailsTableColumns as columns } from "../utils/columns";
import { deleteAsset } from "../services/assetsServices";
import useDeleteMsgModal from "../hooks/useDeleteMessage";
import getCommaSepNum from "../utils/getCommaSepNum";

import { AssetsContext } from "../context/assetsContext";

const AssetDetails = (props) => {
  const { assetSubClass, marketPrice } = props.location.state;
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  const [assetsData, dispatchAssetsData] = useContext(AssetsContext);

  const assetData = assetsData.filter(
    (asset) => asset.assetSubClass === assetSubClass
  );

  function handleConfirm(item) {
    deleteAsset(item.id);
    dispatchAssetsData({ type: "delete_by_subclass", payload: item.id });
  }

  function getStringDate(date) {
    return date.join("-");
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
    <div className="asset-detail">
      {modalBody}
      <Card>
        <Card.Header className="asset-detail__header">
          <span className="label">
            {assetData.length && assetData[0].label}
          </span>
          <span className="value">{getCommaSepNum(marketPrice)}</span>
        </Card.Header>
        <Card.Body>
          <Table data={getProcessedData(assetData)} columns={columns} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AssetDetails;
