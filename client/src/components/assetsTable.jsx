import React from "react";
import allColumns from "../utils/columns";
import { DeleteBtn } from "./buttons";
import { EyeBtn } from "./buttons";
import { EditBtn } from "./buttons";
import Table from "./table";
import TableContainer from "./tableContainer";

function AssetsTable(props) {
  const { assets, onDeleteAsset, overallValue } = props;

  const { assetClass, data } = assets;

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
    item["deleteBtn"] = <DeleteBtn deleteMethod={() => onDeleteAsset(item)} />;

    if (assetClass === "cash") {
      item["editBtn"] = (
        <EditBtn assetData={{ id: item.id, assetClass: item.assetClass }} />
      );
    } else {
      item["detailBtn"] = (
        <EyeBtn
          requiredInfo={{
            assetSubClass: item.assetSubClass,
            assetClass: item.assetClass,
          }}
        />
      );
    }

    return item;
  });

  return (
    <TableContainer
      addLink={`/add/${assetClass}`}
      valueInfo={overallValue}
      title={title}
    >
      <Table data={mappedData} columns={columns} />
    </TableContainer>
  );
}

export default AssetsTable;
