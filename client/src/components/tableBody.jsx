import React from "react";
import DeleteBtn from "./deleteBtn";

function TableBody(props) {
  const { columns, data, onDeleteAsset } = props;

  return (
    <tbody>
      {data.map((row, rowIndex) => {
        return (
          <tr key={row.id}>
            {columns.map((column) => {
              const cellContent =
                column.name === "rowNum" ? rowIndex + 1 : row[column.name];
              return (
                <td key={column.name}>{cellContent.toLocaleString() || ""}</td>
              );
            })}

            <td>
              <DeleteBtn deleteMethod={() => onDeleteAsset(row.id)} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
