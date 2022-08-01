// extract form fields from form-state
export default function getFormFields(formState) {
  return Object.values(formState).reduce(
    (prev, current) => ({ ...prev, [current.name]: current.value }),
    {}
  );
}
