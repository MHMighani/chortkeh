import React from "react";

const SelectForm = ({ options, name, error, label, onChange }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        onChange={onChange}
        className="custom-class form-control"
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectForm;
