import React, { useEffect, useState } from "react";
import { assetsTableColumns as columns } from "../utils/columns";
import DeleteBtn from "./deleteBtn";
import EyeBtn from "./eyeBtn";
import Table from "./table";

function AssetsTable(props) {
  const { assetsData, onDeleteAsset, prices, overallValue } = props;
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
    <Table
      data={procData}
      columns={columns}
      footerData={{ label: "ارزش کل دارایی", data: [overallValue] }}
    />
  );
}

export default AssetsTable;
