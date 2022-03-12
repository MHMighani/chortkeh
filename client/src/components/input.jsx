import React from "react";

const Input = ({ label, name, error, id, type = "number", ...rest }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className="form-control"
        id={id}
        type={type}
        name={name}
        {...rest}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
