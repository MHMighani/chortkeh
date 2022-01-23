import React from "react";
import { Link } from "react-router-dom";

const AssetCategorySelect = () => {
  const listOfLinks = [
    { label: "ارز و طلا", path: "goldcurrency" },
    { label: "سهام", path: "stock" },
    { label: "نقدی", path: "cash" },
  ];
  return (
    <div className="container">
      <ul className="list-group">
        {listOfLinks.map((link) => (
          <Link
            key={link.path}
            to={`/add/${link.path}`}
            className="list-group-item"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AssetCategorySelect;
