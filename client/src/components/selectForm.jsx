import React from "react";
import Select from "react-select";

const SelectForm = ({ error, label, ...props }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <Select {...props} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectForm;
