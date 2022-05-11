import React, { useState } from "react";
import _ from "lodash";
import TableBody from "./tableBody";
import TableFoot from "./tableFoot";
import TableHeader from "./tableHeader";
import getPaginatedData from "../utils/getPaginatedData";
import Pagination from "./pagination";

function Table({
  data,
  columns,
  footerData,
  onDeleteAsset,
  pageSize,
  styleFunction,
  extraSortField,
}) {
  const [currentPage, setCurrenctPage] = useState(1);
  const [sortCol, setSortCol] = useState({ dir: "asc", col: "null" });

  // extraSort field for accessing deep nested objects if value is nested
  const sortedData = _.orderBy(
    data,
    [sortCol.col, extraSortField].filter(Boolean).join("."),
    sortCol.dir
  );
  const styledData = styleFunction
    ? styleFunction(sortedData).reverse()
    : sortedData;

  // if no pageSize is provided then pagination will be off
  const paginatedData = pageSize
    ? getPaginatedData(styledData, currentPage, pageSize)
    : styledData;

  return (
    <div className="table-wrapper">
      <table className="table ">
        <TableHeader
          sortCol={sortCol}
          setSortCol={setSortCol}
          columns={columns}
        />
        <TableBody
          columns={columns}
          data={paginatedData}
          onDeleteAsset={onDeleteAsset}
        />
        {footerData && (
          <TableFoot label={footerData["label"]} data={footerData.data} />
        )}
      </table>
      <Pagination
        num={Math.ceil(data.length / pageSize)}
        onPageChange={setCurrenctPage}
        active={currentPage}
      />
    </div>
  );
}

export default Table;
