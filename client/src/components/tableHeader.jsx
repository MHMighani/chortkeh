import React from "react";

function TableHead({ headerArr }) {
  return (
    <thead>
      <tr>
        {headerArr.map((header, index) => (
          <th scope="col" key={index}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
