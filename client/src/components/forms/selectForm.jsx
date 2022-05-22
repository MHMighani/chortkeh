import React from "react";
import Select from "react-select";

const SelectForm = ({ error, label, id, ...props }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <Select id={id} {...props} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectForm;
