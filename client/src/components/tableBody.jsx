import React from "react";

// TODO: fix row index
function TableBody(props) {
  const { data, onDeleteAsset } = props;
  console.log(data);
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={row.id}>
          {Object.values(row).map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
          <td>
            <button
              onClick={() => onDeleteAsset(row.id)}
              className="btn btn-danger"
            >
              حذف
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
