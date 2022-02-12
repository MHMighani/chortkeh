import React, { useEffect, useState } from "react";
import DeleteBtn from "./deleteBtn";
import { cashTableColumns as columns } from "../services/columns";
import EditBtn from "./editBtn";
import Table from "./table";

function CashTable(props) {
  const { assetsData, onDeleteAsset, overallValue } = props;
  const [procData, setProcData] = useState(assetsData);

  //   // calculating overall-value for each asset
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
    <Table
      data={procData}
      columns={columns}
      footerData={{ label: "ارزش کل دارایی", data: [overallValue] }}
    />
  );
}

export default CashTable;
