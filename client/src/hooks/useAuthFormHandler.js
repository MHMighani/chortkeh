import { useState } from "react";
import useFormErrorHandler from "./useFormErrorHandler";

function useAuthFormHandler(initialState) {
  const [formState, setFormState] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errors = useFormErrorHandler(formState.formName, formState);

  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: {
        ...formState[e.target.name],
        value: e.target.value,
        error: errors[e.target.name],
      },
    });
  }

  async function handlePreSubmit(e) {
    e.preventDefault();
    if (isSubmitted === false) {
      setIsSubmitted(true);
    }
    if (errors) return false;
    return true;
  }

  function checkShowError(fieldName) {
    return isSubmitted && errors[fieldName];
  }

  return {
    formState,
    setFormState,
    isSubmitted,
    setIsSubmitted,
    errors,
    handleChange,
    handlePreSubmit,
    checkShowError,
  };
}

export default useAuthFormHandler;
