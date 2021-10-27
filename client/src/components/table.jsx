import React from "react";
import TableBody from "./tableBody";
import TableFoot from "./tableFoot";
import TableHeader from "./tableHeader";

function Table({ data, columns, footerData, onDeleteAsset }) {
  return (
    <table className="table ">
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} onDeleteAsset={onDeleteAsset} />
      <TableFoot label={footerData["label"]} data={footerData.data} />
    </table>
  );
}

export default Table;
