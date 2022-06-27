import React from "react";
import Select, { createFilter } from "react-select";

const SelectForm = ({ error, label, id, ...props }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <Select
        id={id}
        filterOption={createFilter({ ignoreAccents: false })}
        {...props}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectForm;
