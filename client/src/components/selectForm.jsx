import React from "react";

const SelectForm = ({ options, name, label, onChange }) => {
  return (
    <React.Fragment>
      <label htmlFor="id">{label}</label>
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
    </React.Fragment>
  );
};

export default SelectForm;
