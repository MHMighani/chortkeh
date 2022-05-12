import React from "react";
import allColumns from "../utils/columns";
import { DeleteBtn, EyeBtn, EditBtn } from "./buttons";
import Table from "./table";
import TableContainer from "./tableContainer";

function AssetsTable({ assets, marketPrices, onDeleteAsset, overallValue }) {
  const { assetClass, data } = assets;

  const priceKey = assetClass === "stock" ? "lastTradePrice" : "price";

  const titles = {
    goldCurrency: "طلا و ارز",
    goldcurrency: "طلا و ارز",
    stock: "بورس",
    cash: "نقدی",
  };

  const title = titles[assetClass];

  const columns = allColumns[assetClass];

  // mapping buttons
  const mappedData = data.map(({ ...item }) => {
    let deleteBtn = (
      <DeleteBtn
        key={`${item.assetSubClass}-deleteBtn`}
        deleteMethod={() => onDeleteAsset(item)}
      />
    );
    let buttons = [deleteBtn];

    if (assetClass === "cash") {
      buttons.push(
        <EditBtn
          key={`${item.assetSubClass}-editBtn`}
          assetData={{ id: item.id, assetClass: item.assetClass }}
        />
      );
    } else {
      const price = marketPrices.find((p) => p.id === item.assetSubClass);

      buttons.push(
        <EyeBtn
          key={`${item.assetSubClass}-eyeBtn`}
          requiredInfo={{
            assetSubClass: item.assetSubClass,
            assetClass: item.assetClass,
            marketPrice: price[priceKey],
          }}
        />
      );
    }

    item["operations"] = buttons;

    return item;
  });

  return (
    <TableContainer
      addLink={`/add/${assetClass}`}
      valueInfo={overallValue[assetClass]}
      title={title}
      empty={!mappedData.length ? true : false}
    >
      {mappedData.length && <Table data={mappedData} columns={columns} />}
    </TableContainer>
  );
}

export default AssetsTable;
