import React from "react";
import TableBody from "./tableBody";
import TableFoot from "./tableFoot";
import TableHeader from "./tableHeader";

function Table({ data, headerArr, footerData }) {
  return (
    <table className="table ">
      <TableHeader headerArr={headerArr} />
      <TableBody data={data} />
      <TableFoot label={footerData["label"]} data={footerData.data} />
    </table>
  );
}

export default Table;
