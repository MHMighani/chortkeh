import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";

function PrivateRoute({ children, ...rest }) {
  const { token } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) => (token ? children : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
