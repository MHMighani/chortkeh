import formValidationCheck from "../utils/formValidationCheck";
import validationSchemas from "../utils/formValidationSchema";

function getFormErrors(formState, formName) {
  const schema = validationSchemas[formName];
  const { errors } = formValidationCheck(schema, formState);

  return errors;
}

export default getFormErrors;
