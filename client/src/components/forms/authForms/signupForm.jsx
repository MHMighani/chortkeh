import { Link } from "react-router-dom";
import Input from "../input";
import AuthForm from "./authForm";
import { getFormFields } from "../../../utils";
import { useAuthFormHandler, useAuth } from "../../../hooks";
import { signupUser } from "../../../services/userService";

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

  const { loginUser } = useAuth();

  const { formState, handleChange, handlePreSubmit } =
    useAuthFormHandler(initialFormState);

  async function handleSubmit(e, setHeadError) {
    if (!handlePreSubmit(e)) return;

    const formFields = getFormFields(formState);
    const toSubmitFormState = { ...formFields };
    delete toSubmitFormState.passwordConfirm;

    const response = await signupUser(getFormFields(formState));

    // check signup response

    // successfull register
    if (response && response.status === 201) {
      //redirect after successfull login
      loginUser({ token: response.data.accessToken });
      //error
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
