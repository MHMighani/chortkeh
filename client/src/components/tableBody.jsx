import React from "react";
import getCommaSepNum from "../utils/getCommaSepNum";

function getCellContent(column, row, rowIndex) {
  let cellContent = row[column.name];
  if (column.name === "rowNum") {
    cellContent = rowIndex + 1;
  } else if (typeof +cellContent === "number" && !isNaN(+cellContent)) {
    cellContent = getCommaSepNum(row[column.name]);
  }

  return cellContent;
}

function TableBody(props) {
  const { columns, data } = props;

  return (
    <tbody>
      {data.map((row, rowIndex) => {
        return (
          <tr key={row.id}>
            {columns.map((column) => {
              return (
                <td
                  key={column.name}
                  data-th={column.label}
                  className={
                    column.name === "rowNum" ? "row-number" : column.name
                  }
                >
                  {getCellContent(column, row, rowIndex)}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
