import "./authForm.scss";
import { useState } from "react";

function AuthForm({ headerText, footer, body, authPageName, onSubmit }) {
  const [headError, setHeadError] = useState("");

  return (
    <div className="authPage">
      <form
        onSubmit={(e) => onSubmit(e, setHeadError)}
        className={`authForm ${authPageName}`}
      >
        <div className="authForm__header">
          <h1>{headerText}</h1>
        </div>

        <div className="authForm__body">
          {headError && <div className="alert alert-danger">{headError}</div>}
          {body}
        </div>
        <div className="authForm__foot">{footer}</div>
      </form>
    </div>
  );
}

export default AuthForm;
