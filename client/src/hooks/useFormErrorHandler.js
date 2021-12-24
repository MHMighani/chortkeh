import formValidationCheck from "../utils/formValidationCheck";
import validationSchemas from "../utils/formValidationSchema";
import { useState, useEffect } from "react";

const useFormErrorHandler = (assetClass, formState) => {
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const schema = validationSchemas[assetClass];
    const { errors } = formValidationCheck(schema, formState);
    setErrors(errors);
  }, [formState, assetClass]);

  return errors;
};

export default useFormErrorHandler;
