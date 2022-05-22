import React from "react";

function TableFoot({ label, data }) {
  return (
    <tfoot>
      <tr>
        <th scope="row">{label}</th>
        {data.map((cell, index) => (
          <td key={index}>{cell.toLocaleString() || ""}</td>
        ))}
      </tr>
    </tfoot>
  );
}

export default TableFoot;
