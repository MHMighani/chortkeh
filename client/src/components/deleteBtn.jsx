import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DeleteBtn = ({ deleteMethod }) => {
  return (
    <button onClick={deleteMethod} className="btn btn-danger">
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

export default DeleteBtn;
