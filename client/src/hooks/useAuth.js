import { useContext } from "react";
import UserContext from "../context/userContext";

function useAuth() {
  return useContext(UserContext);
}

export default useAuth;
