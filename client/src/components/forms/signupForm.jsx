import Input from "./input";
import { useState } from "react";
import "./authForm.scss";
import { Link } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <div className="authPage">
      <form className="authForm signupForm">
        <div className="authForm__header">
          <h1>ثبت نام</h1>
        </div>
        <div className="authForm__body">
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
        </div>
        <div className="authForm__foot">
          <Link to="/login" className="foot-item">
            قبلا ثبت نام کرده‌ام
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
