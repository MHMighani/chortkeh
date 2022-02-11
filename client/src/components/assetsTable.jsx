import React, { useEffect, useState } from "react";
import DeleteBtn from "./deleteBtn";
import EyeBtn from "./eyeBtn";
import Table from "./table";

function AssetsTable(props) {
  const { assetsData, onDeleteAsset, prices, overallValue } = props;
  const [procData, setProcData] = useState(assetsData);

  const columns = [
    { name: "rowNum", label: "ردیف" },
    { name: "label", label: "نام دارایی" },
    { name: "amount", label: "مقدار" },
    { name: "purchasePrice", label: "میانگین قیمت خرید" },
    { name: "price", label: "ارزش روز" },
    { name: "changePercent", label: "درصد سود یا زیان" },
    { name: "overallValue", label: "ارزش کل" },
    { name: "detailBtn" },
    { name: "deleteBtn" },
  ];

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
