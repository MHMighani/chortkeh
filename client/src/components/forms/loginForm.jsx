import Input from "./input";
import { useState } from "react";
import "./authForm.scss";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <div className="authPage">
      <form className="authForm loginForm">
        <div className="authForm__header">
          <h1>ورود کاربر</h1>
        </div>
        <div className="authForm__body">
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
        </div>
        <div className="authForm__foot">
          <Link to="/signup" className="foot-item">
            کاربر جدید هستم
          </Link>
          <Link to="#" className="foot-item">
            رمز عبور خود را فراموش کرده‌ام
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
