import Table from "../table/table";
import { EditBtn, DeleteBtn } from "../../common/buttons";
import { useDeleteMsgModal } from "../../../hooks/";
import { getCommaSepNum, columns, getPercentChange } from "../../../utils";
import { deleteAssetById } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { getDateId } from "../../../utils/";

import TableContainer from "./tableContainer";

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

  //TODO: merge mapping in both assetsTable and detail table
  function getProcessedData(data) {
    return data.map((item) => {
      const date = { ...item.purchaseDate };

      const overallValue = item.amount * marketPrice;
      const changePercent = getPercentChange(item.purchasePrice, marketPrice);
      const purchaseDate = getDateId(date);
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
      <TableContainer
        dropdown={false}
        dynamic={false}
        valueInfo={{ value: getCommaSepNum(marketPrice) }}
        title={assetData.length && assetData[0].label}
      >
        <Table data={getProcessedData(assetData)} columns={columns.details} />
      </TableContainer>
    </div>
  );
};

export default AssetDetails;
