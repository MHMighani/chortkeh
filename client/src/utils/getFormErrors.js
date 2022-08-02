import formValidationCheck from "../utils/formValidationCheck";
import validationSchemas from "../utils/formValidationSchema";

function getFormErrors(formState) {
  const schema = validationSchemas[formState.formName];
  const { errors } = formValidationCheck(schema, formState);

  return errors;
}

export default getFormErrors;
