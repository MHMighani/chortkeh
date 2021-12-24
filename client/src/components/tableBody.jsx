import React from "react";
import getCommaSepNum from "../utils/getCommaSepNum";

function TableBody(props) {
  const { columns, data } = props;

  return (
    <tbody>
      {data.map((row, rowIndex) => {
        return (
          <tr key={row.id}>
            {columns.map((column) => {
              const cellContent =
                column.name === "rowNum" ? rowIndex + 1 : row[column.name];
              return (
                <td key={column.name}>{getCommaSepNum(cellContent) || ""}</td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
