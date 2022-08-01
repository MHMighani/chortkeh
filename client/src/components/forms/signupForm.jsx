import Input from "./input";
import AuthForm from "./authForm";
import { getFormFields } from "../../utils";
import { Link } from "react-router-dom";
import useAuthFormHandler from "../../hooks/useAuthFormHandler";
import { signupUser } from "../../services/userService";

function SignupForm() {
  const initialFormState = {
    formName: "signup",
    username: { name: "username", label: "نام کاربری", value: "", error: "" },
    password: { name: "password", label: "رمزعبور", value: "", error: "" },
    passwordConfirm: {
      name: "passwordConfirm",
      label: "تایید رمز عبور",
      value: "",
      error: "",
    },
    email: { name: "email", label: "ایمیل", value: "", error: "" },
  };

  const { formState, handleChange, handlePreSubmit, checkShowError } =
    useAuthFormHandler(initialFormState);

  async function handleSubmit(e, setHeadError) {
    if (!handlePreSubmit(e)) return;

    const toSubmitFormState = { ...formState };
    delete toSubmitFormState.passwordConfirm;

    const response = await signupUser(getFormFields(formState));

    // check signup response
    if (response && response.status === 200) {
      // redirect
    } else {
      setHeadError("در حین ثبت‌نام مشکلی به وجود آمد.");
    }
  }

  const body = (
    <>
      <Input
        {...formState["username"]}
        onChange={handleChange}
        type="text"
        required={true}
      />
      <Input
        {...formState["password"]}
        onChange={handleChange}
        type="password"
        required={true}
      />
      <Input
        {...formState["passwordConfirm"]}
        onChange={handleChange}
        type="password"
        required={true}
      />
      <Input
        {...formState["email"]}
        onChange={handleChange}
        type="email"
        required={true}
      />
      <button className="btn btn-primary" type="submit">
        ثبت نام
      </button>
    </>
  );

  const footer = (
    <>
      <Link to="/login" className="foot-item">
        قبلا ثبت نام کرده‌ام
      </Link>
    </>
  );

  return (
    <div className="authPage">
      <AuthForm
        headerText="ثبت‌نام"
        body={body}
        footer={footer}
        authPageName="signupForm"
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default SignupForm;
