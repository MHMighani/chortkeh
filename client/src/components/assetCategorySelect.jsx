import React from "react";
import { Link } from "react-router-dom";

// TODO: refactor mapping
const AssetCategorySelect = () => {
  return (
    <div className="container">
      <ul className="list-group">
        <Link to="/add/goldcurrency" className="list-group-item">
          ارز و طلا
        </Link>
        <Link to="/add/stock" className="list-group-item">
          سهام
        </Link>
        <Link to="#" className="list-group-item">
          نقدی
        </Link>
      </ul>
    </div>
  );
};

export default AssetCategorySelect;
