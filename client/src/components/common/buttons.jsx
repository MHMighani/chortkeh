import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const SubmitBtn = ({ editState }) => {
  const addText = "افزودن";
  const editText = "ویرایش";
  return (
    <button
      type="submit"
      className={`btn submit btn-${editState ? "success" : "primary"}`}
    >
      {editState ? editText : addText}
    </button>
  );
};

export const EyeBtn = ({ requiredInfo }) => {
  const { assetSubClass, assetClass, marketPrice } = requiredInfo;
  return (
    <Link
      to={{
        pathname: `assets/details/`,
        state: { assetSubClass, assetClass, marketPrice },
      }}
      className="btn btn-success"
    >
      <FontAwesomeIcon icon={faEye} />
    </Link>
  );
};

export const EditBtn = ({ assetData }) => {
  const { id, assetClass } = assetData;
  return (
    <Link
      to={{ pathname: `/add/${assetClass}/${id}` }}
      className="btn btn-success"
    >
      <FontAwesomeIcon icon={faEdit} />
    </Link>
  );
};

export const DeleteBtn = ({ deleteMethod }) => {
  return (
    <button onClick={deleteMethod} className="btn btn-danger">
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};
