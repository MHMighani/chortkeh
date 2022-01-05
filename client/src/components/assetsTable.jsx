import React, { useEffect, useState } from "react";
import DeleteBtn from "./deleteBtn";
import EditBtn from "./editBtn";
import Table from "./table";

function AssetsTable(props) {
  const { assetsData, onDeleteAsset, prices } = props;
  const [procData, setProcData] = useState(assetsData);
  const [assetsTotalValue, setAssetTotalValue] = useState(0);

  const columns = [
    { name: "rowNum", label: "ردیف" },
    { name: "label", label: "نام دارایی" },
    { name: "amount", label: "مقدار" },
    { name: "purchasePrice", label: "قیمت خرید" },
    { name: "price", label: "ارزش روز" },
    { name: "changePercent", label: "درصد سود یا زیان" },
    { name: "overallValue", label: "ارزش کل" },
    { name: "editBtn" },
    { name: "deleteBtn" },
  ];

  // calculating overall-value for each asset
  useEffect(() => {
    let total = 0;

    let procData = assetsData.map((item) => {
      item["deleteBtn"] = (
        <DeleteBtn deleteMethod={() => onDeleteAsset(item.id)} />
      );

      item["editBtn"] = (
        <EditBtn assetData={{ id: item.id, assetClass: item.assetClass }} />
      );
      total += item["overallValue"];
      return item;
    });
    setProcData(procData);
    setAssetTotalValue(total);
  }, [prices, assetsData, onDeleteAsset]);

  return (
    <Table
      data={procData}
      columns={columns}
      footerData={{ label: "ارزش کل دارایی", data: [assetsTotalValue] }}
    />
  );
}

export default AssetsTable;
