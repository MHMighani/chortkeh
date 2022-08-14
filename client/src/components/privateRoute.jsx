import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks";

function PrivateRoute({ children, ...rest }) {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={() => (token ? children : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
