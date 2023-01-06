import { useState } from "react";
import getFormErrors from "../utils/getFormErrors";
import getFormFields from "../utils/getFormFields";

function useAuthFormHandler(initialState) {
  const [formState, setFormState] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const formNameValues = getFormFields(formState);

    const errors = getFormErrors(
      { ...formNameValues, [name]: value },
      formState.formName
    );
    // set error and value when field changes
    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        value,
        error: errors[name],
      },
    });
  }

  async function handlePreSubmit(e) {
    e.preventDefault();
    if (isSubmitted === false) {
      setIsSubmitted(true);
    }

    // check for errors
    return Object.values(formState).every((field) => field.error === "");
  }

  return {
    formState,
    setFormState,
    isSubmitted,
    setIsSubmitted,
    handleChange,
    handlePreSubmit,
  };
}

export default useAuthFormHandler;
