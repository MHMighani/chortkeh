import React from "react";
import useToken from "../hooks/useToken";

const UserContext = React.createContext({ user: {} });

export function UserContextProvider({ children }) {
  const { clearToken, setToken, token } = useToken();

  const loginUser = (token) => setToken(token);
  const logoutUser = () => clearToken();

  const userValue = { loginUser, logoutUser, token };
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}

export default UserContext;
