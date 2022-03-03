import React, { useEffect, useState } from "react";
import { assetsTableColumns as columns } from "../utils/columns";
import DeleteBtn from "./deleteBtn";
import EyeBtn from "./eyeBtn";
import Table from "./table";
import TableContainer from "./tableContainer";

function AssetsTable(props) {
  const { assetsData, onDeleteAsset, prices, overallValue, title } = props;
  const [procData, setProcData] = useState(assetsData);

  // mapping buttons
  useEffect(() => {
    let procData = assetsData.map((item) => {
      item["deleteBtn"] = (
        <DeleteBtn deleteMethod={() => onDeleteAsset(item)} />
      );

      item["detailBtn"] = (
        <EyeBtn
          requiredInfo={{
            assetSubClass: item.assetSubClass,
            assetClass: item.assetClass,
          }}
        />
      );

      return item;
    });
    setProcData(procData);
  }, [prices, assetsData, onDeleteAsset]);

  return (
    <TableContainer valueInfo={overallValue} title={title}>
      <Table data={procData} columns={columns} />
    </TableContainer>
  );
}

export default AssetsTable;
