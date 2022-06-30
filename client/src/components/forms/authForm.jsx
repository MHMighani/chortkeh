import "./authForm.scss";

function AuthForm({ headerText, footer, body, authPageName }) {
  return (
    <div className="authPage">
      <form className={`authForm ${authPageName}`}>
        <div className="authForm__header">
          <h1>{headerText}</h1>
        </div>
        <div className="authForm__body">{body}</div>
        <div className="authForm__foot">{footer}</div>
      </form>
    </div>
  );
}

export default AuthForm;
