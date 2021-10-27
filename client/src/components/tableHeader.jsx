import React from "react";

function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th scope="col" key={column.name}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
