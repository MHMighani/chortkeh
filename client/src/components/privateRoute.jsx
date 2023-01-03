import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAll } from "actions";
import { useAuth } from "hooks";

function PrivateRoute({ children, ...rest }) {
  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchAll());
    }
  }, [token]);

  return (
    <Route
      {...rest}
      render={() => (token ? children : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
