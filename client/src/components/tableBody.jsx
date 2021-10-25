import React from "react";

function TableBody(props) {
  const { data, onDeleteAsset } = props;
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={row.id}>
          <td>{rowIndex + 1}</td>
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
