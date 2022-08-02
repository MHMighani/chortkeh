import Input from "./input";
import AuthForm from "./authForm";
import { getFormFields } from "../../utils";
import { Link } from "react-router-dom";
import { loginUser as loginUserApi } from "../../services/userService";
import useAuth from "../../hooks/useAuth";
import useAuthFormHandler from "../../hooks/useAuthFormHandler";

function LoginForm() {
  const initialFormState = {
    formName: "login",
    email: { name: "email", label: "ایمیل", value: "", error: "" },
    password: { name: "password", label: "رمزعبور", value: "", error: "" },
  };

  const { formState, handleChange, handlePreSubmit } =
    useAuthFormHandler(initialFormState);

  const { loginUser } = useAuth();

  const handleSubmit = async (e, setHeaderError) => {
    if (!handlePreSubmit(e)) return;

    const response = await loginUserApi(getFormFields(formState));

    //check login response
    if (response && response.status === 200) {
      console.log("Successfull login");
      // redirect to homepage
      loginUser({ token: response.data.accessToken });
    } else {
      setHeaderError("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  const body = (
    <>
      <Input
        {...formState["email"]}
        onChange={handleChange}
        type="email"
        required={true}
      />
      <Input
        {...formState["password"]}
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
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginForm;
