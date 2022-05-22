import React from "react";

import NumberFormat from "react-number-format";

const Input = ({
  label,
  name,
  error,
  id,
  type = "number",
  onChange = () => {},
  ...rest
}) => {
  const mutualProps = { id, className: "form-control", name, ...rest };

  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      {type === "number" ? (
        <NumberFormat
          thousandSeparator={true}
          isNumericString={true}
          autoComplete="off"
          onValueChange={(values) =>
            onChange({ target: { name, value: values.floatValue } })
          }
          {...mutualProps}
        />
      ) : (
        <input
          type={type}
          autoComplete="off"
          onChange={onChange}
          {...mutualProps}
        />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
