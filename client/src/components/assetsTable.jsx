import React, { useEffect, useState } from "react";
import Table from "./table";

function AssetsTable(props) {
  const headerArr = ["ردیف", "نام دارایی", "تعداد", "ارزش روز", "ارزش کل"];
  const { assetsData, onDeleteAsset } = props;
  const [procData, setProcData] = useState(assetsData);
  const [assetsTotalValue, setAssetTotalValue] = useState(0);

  // calculating overall-value for each asset
  useEffect(() => {
    let total = 0;
    const procData = assetsData.map((item) => {
      item["overallValue"] = item["amount"] * item["spotPrice"];
      total += item["overallValue"];
      return item;
    });
    setProcData(procData);
    setAssetTotalValue(total);
  }, [assetsData]);

  return (
    <Table
      data={procData}
      headerArr={headerArr}
      footerData={{ label: "ارزش کل دارایی", data: [assetsTotalValue] }}
      onDeleteAsset={onDeleteAsset}
    />
  );
}

export default AssetsTable;
