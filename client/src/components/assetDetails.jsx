import getPercentChange from "../utils/getPercentChange";
import Table from "./table";
import { EditBtn, DeleteBtn } from "./buttons";
import { detailsTableColumns as columns } from "../utils/columns";
import useDeleteMsgModal from "../hooks/useDeleteMessage";
import getCommaSepNum from "../utils/getCommaSepNum";
import { deleteAssetById } from "../actions";
import { useSelector, useDispatch } from "react-redux";

const AssetDetails = (props) => {
  const { assetSubClass, marketPrice } = props.location.state;
  const [modalBody, handleDelMsgDisplay] = useDeleteMsgModal(handleConfirm);

  const dispatch = useDispatch();

  const assetData = useSelector((state) =>
    state.assets.filter((asset) => asset.assetSubClass === assetSubClass)
  );

  function handleConfirm(item) {
    dispatch(deleteAssetById(item.id));
  }

  function getStringDate(date) {
    return date.join("-");
  }

  //TODO: merge mapping in both assetsTable and detail table
  function getProcessedData(data) {
    return data.map((item) => {
      const date = { ...item.purchaseDate };

      const overallValue = item.amount * marketPrice;
      const changePercent = getPercentChange(item.purchasePrice, marketPrice);
      const purchaseDate = getStringDate(Object.values(date));
      const deleteBtn = (
        <DeleteBtn
          key={`${item.id}-deleteKey`}
          deleteMethod={() => handleDelMsgDisplay(item)}
        />
      );
      const editBtn = (
        <EditBtn
          key={`${item.id}-editKey`}
          assetData={{ id: item.id, assetClass: item.assetClass }}
        />
      );

      return {
        ...item,
        overallValue,
        changePercent,
        purchaseDate,
        operations: [deleteBtn, editBtn],
      };
    });
  }

  return (
    <div>
      {modalBody}
      <div className="asset-detail">
        <div className="asset-detail__header">
          <span className="label">
            {assetData.length && assetData[0].label}
          </span>
          <span className="value">{getCommaSepNum(marketPrice)}</span>
        </div>
        <div className="asset-detail__body">
          <Table data={getProcessedData(assetData)} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
