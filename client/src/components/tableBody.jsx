import React from "react";

function TableBody(props) {
  const { data } = props;
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <th scope="row">{rowIndex + 1}</th>
          {Object.values(row).map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
