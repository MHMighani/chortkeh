function formValidationCheck(schema, state) {
  const result = schema.validate(state, { allowUnknown: true });

  let { error, value } = result;

  if (error) {
    const name = error.details[0].context.key;
    const errorMessage = error.details[0].message;
    return { errors: { [name]: errorMessage }, value: false };
  }

  return { value, errors: false };
}

export default formValidationCheck;
