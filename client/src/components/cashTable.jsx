import React, { useEffect, useState } from "react";
import DeleteBtn from "./deleteBtn";
import { cashTableColumns as columns } from "../utils/columns";
import EditBtn from "./editBtn";
import Table from "./table";

import TableContainer from "./tableContainer";

function CashTable({ assetsData, onDeleteAsset, overallValue, addLink }) {
  const [procData, setProcData] = useState(assetsData);

  // calculating overall-value for each asset
  useEffect(() => {
    let procData = assetsData.map((item) => {
      item["deleteBtn"] = (
        <DeleteBtn deleteMethod={() => onDeleteAsset(item)} />
      );

      item["editBtn"] = (
        <EditBtn assetData={{ id: item.id, assetClass: item.assetClass }} />
      );
      return item;
    });
    setProcData(procData);
  }, [assetsData, onDeleteAsset]);

  return (
    <TableContainer title="نقدی" valueInfo={overallValue} addLink={addLink}>
      <Table data={procData} columns={columns} />
    </TableContainer>
  );
}

export default CashTable;
