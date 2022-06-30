import Input from "./input";
import { useState } from "react";
import AuthForm from "./authForm";
import { Link } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
  }

  const body = (
    <>
      <Input
        label="نام کاربری"
        name="signupUsernameInput"
        onChange={handleChange}
        type="text"
        required={true}
      />
      <Input
        label="رمز عبور"
        name="signupFormPasswordInput"
        onChange={handleChange}
        type="password"
        required={true}
      />
      <Input
        label="تکرار رمزعبور"
        name="signupFormPasswordConfirmInput"
        onChange={handleChange}
        type="password"
        required={true}
      />
      <Input
        label="آدرس ایمیل"
        name="signupEmailInput"
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
      />
    </div>
  );
}

export default SignupForm;
