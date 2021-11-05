import React from "react";

const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input className="form-control" name={name} {...rest} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
