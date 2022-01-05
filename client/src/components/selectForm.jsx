import React from "react";
import Select from "react-select";

const SelectForm = ({
  options,
  error,
  label,
  placeholder,
  onChange,
  value,
  isDisabled,
}) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <Select
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        isDisabled={isDisabled}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectForm;
