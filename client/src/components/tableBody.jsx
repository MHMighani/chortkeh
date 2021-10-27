import React from "react";

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
              return <td key={column.name}>{cellContent || ""}</td>;
            })}

            <td>
              <button
                onClick={() => onDeleteAsset(row.id)}
                className="btn btn-danger"
              >
                حذف
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
