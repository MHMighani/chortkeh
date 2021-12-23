import React from "react";
import Select from "react-select";

const SelectForm = ({ options, error, label, placeholder, onChange }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <Select options={options} placeholder={placeholder} onChange={onChange} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectForm;
