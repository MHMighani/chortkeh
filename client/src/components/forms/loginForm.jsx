import Input from "./input";
import { useState } from "react";
import AuthForm from "./authForm";
import { Link } from "react-router-dom";
import useFormErrorHandler from "../../hooks/useFormErrorHandler";
import { loginUser } from "../../services/userService";

function LoginForm() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const errors = useFormErrorHandler("login", formState);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, setHeaderError) => {
    e.preventDefault();
    if (errors) return;
    const response = await loginUser(formState);

    //check login response
    if (response && response.status === 200) {
      console.log("Successfull login");
      // redirect to homepage
    } else {
      setHeaderError("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  const handleFocusOut = (e) => {
    console.log(e.target.name);
  };

  const body = (
    <>
      <Input
        label="آدرس ایمیل"
        name="email"
        onChange={handleChange}
        type="email"
        error={errors["email"]}
        onBlur={handleFocusOut}
      />
      <Input
        label="گذرواژه"
        name="password"
        onChange={handleChange}
        type="password"
        required={true}
        onBlur={handleFocusOut}
        error={errors["password"]}
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
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginForm;
