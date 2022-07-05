import Input from "./input";
import { useState } from "react";
import AuthForm from "./authForm";
import { Link } from "react-router-dom";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { signupUser } from "../../services/userService";

function SignupForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  const errors = useFormErrorHandler("signup", formState);

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e, setHeadError) {
    e.preventDefault();

    if (errors) return;

    const toSubmitFormState = { ...formState };
    delete toSubmitFormState.passwordConfirm;

    const response = await signupUser(toSubmitFormState);

    // check signup response
    if (response && response.status === 200) {
      // redirect
    } else {
      setHeadError("در حین ثبت‌نام مشکلی به وجود آمد.");
    }
    console.log(response);
  }

  const body = (
    <>
      <Input
        label="نام کاربری"
        name="username"
        onChange={handleChange}
        type="text"
        required={true}
        error={errors["username"]}
      />
      <Input
        label="رمز عبور"
        name="password"
        onChange={handleChange}
        type="password"
        required={true}
        error={errors["password"]}
      />
      <Input
        label="تکرار رمزعبور"
        name="passwordConfirm"
        onChange={handleChange}
        type="password"
        required={true}
        error={errors["passwordConfirm"]}
      />
      <Input
        label="آدرس ایمیل"
        name="email"
        onChange={handleChange}
        type="email"
        required={true}
        error={errors["email"]}
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
