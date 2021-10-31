import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DeleteBtn = ({ assetId }) => {
  return (
    <Link to={`assets/${assetId}`} className="btn btn-success">
      <FontAwesomeIcon icon={faEdit} />
    </Link>
  );
};

export default DeleteBtn;
