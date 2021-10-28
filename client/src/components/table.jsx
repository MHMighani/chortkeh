import React, { useState, useEffect } from "react";
import _ from "lodash";
import TableBody from "./tableBody";
import TableFoot from "./tableFoot";
import TableHeader from "./tableHeader";

function Table({ data, columns, footerData, onDeleteAsset }) {
  const [sortCol, setSortCol] = useState({ dir: "asc", col: null });

  console.log(data);
  const sortedData = _.orderBy(data, sortCol.col, sortCol.dir);

  useEffect(() => {
    console.log(sortCol.col);
  }, [sortCol]);

  return (
    <table className="table ">
      <TableHeader
        sortCol={sortCol}
        setSortCol={setSortCol}
        columns={columns}
      />
      <TableBody
        columns={columns}
        data={sortedData}
        onDeleteAsset={onDeleteAsset}
      />
      <TableFoot label={footerData["label"]} data={footerData.data} />
    </table>
  );
}

export default Table;
