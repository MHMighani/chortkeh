import { useState } from "react";

export default function useToken() {
  const [token, setToken] = useState(getToken());

  function clearToken() {
    localStorage.clear("token");
    setToken("");
  }

  function getToken() {
    try {
      const tokenString = localStorage.getItem("token");
      const userToken = JSON.parse(tokenString);

      return userToken?.token;
    } catch (error) {
      return clearToken();
    }
  }

  function saveToken(userToken) {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  }

  return {
    setToken: saveToken,
    token,
    clearToken,
  };
}
