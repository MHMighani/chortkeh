import React, { useEffect, useState } from "react";
import Table from "./table";

function AssetsTable(props) {
  const { assetsData, onDeleteAsset, prices } = props;
  const [procData, setProcData] = useState(assetsData);
  const [assetsTotalValue, setAssetTotalValue] = useState(0);

  const columns = [
    { name: "rowNum", label: "ردیف" },
    { name: "id", label: "نام دارایی" },
    { name: "amount", label: "مقدار" },
    { name: "price", label: "ارزش واحد" },
    { name: "overallValue", label: "ارزش کل" },
  ];

  // calculating overall-value for each asset
  useEffect(() => {
    let total = 0;
    const procData = assetsData.map((item) => {
      item["overallValue"] = Number(item["amount"]) * Number(prices[item.id]);
      item["price"] = prices[item.id];
      total += item["overallValue"];
      return item;
    });
    setProcData(procData);
    setAssetTotalValue(total);
  }, [prices, assetsData]);

  return (
    <Table
      data={procData}
      columns={columns}
      footerData={{ label: "ارزش کل دارایی", data: [assetsTotalValue] }}
      onDeleteAsset={onDeleteAsset}
    />
  );
}

export default AssetsTable;
