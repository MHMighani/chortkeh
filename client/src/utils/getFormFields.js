// extract form fields from form-state
export default function getFormFields(formState) {
  return Object.values(formState).reduce((prev, current) => {
    if (current.name === "formName") return null;
    return { ...prev, [current.name]: current.value };
  }, {});
}
