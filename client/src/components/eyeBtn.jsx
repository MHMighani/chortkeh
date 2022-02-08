import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const EyeBtn = ({ requiredInfo }) => {
  const { assetSubClass, assetClass } = requiredInfo;
  return (
    <Link
      to={{
        pathname: `assets/details/`,
        state: { assetSubClass, assetClass },
      }}
      className="btn btn-success"
    >
      <FontAwesomeIcon icon={faEye} />
    </Link>
  );
};

export default EyeBtn;
