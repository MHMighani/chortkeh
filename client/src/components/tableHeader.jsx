import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

function TableHead({ columns, sortCol, setSortCol }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            scope="col"
            key={column.name}
            style={{ cursor: "pointer" }}
            onClick={() =>
              setSortCol({
                dir: sortCol.dir === "asc" ? "desc" : "asc",
                col: column.name,
              })
            }
          >
            {column.label}
            <FontAwesomeIcon
              icon={sortCol.dir === "asc" ? faSortUp : faSortDown}
              style={{
                display: sortCol.col === column.name ? "inline-block" : "none",
              }}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
