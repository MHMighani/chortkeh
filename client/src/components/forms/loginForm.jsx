import Input from "./input";
import { useState } from "react";
import AuthForm from "./authForm";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
  }

  const body = (
    <>
      <Input
        label="آدرس ایمیل"
        name="loginEmailInput"
        onChange={handleChange}
        type="email"
        required={true}
      />
      <Input
        label="گذرواژه"
        name="loginPasswordInput"
        onChange={handleChange}
        type="password"
        required={true}
      />
      <button className="btn btn-primary" type="submit">
        ورود
      </button>
    </>
  );

  const footer = (
    <>
      <Link to="/signup" className="foot-item">
        کاربر جدید هستم
      </Link>
      <Link to="#" className="foot-item">
        رمز عبور خود را فراموش کرده‌ام
      </Link>
    </>
  );

  return (
    <div className="authPage">
      <AuthForm
        headerText="ورود کاربر"
        body={body}
        footer={footer}
        authPageName="loginForm"
      />
    </div>
  );
}

export default LoginForm;
