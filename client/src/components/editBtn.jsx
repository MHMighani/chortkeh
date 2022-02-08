import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DeleteBtn = ({ assetData }) => {
  const { id, assetClass } = assetData;
  return (
    <Link
      replace={true}
      to={{ pathname: `/add/${assetClass}`, state: { id } }}
      className="btn btn-success"
    >
      <FontAwesomeIcon icon={faEdit} />
    </Link>
  );
};

export default DeleteBtn;
